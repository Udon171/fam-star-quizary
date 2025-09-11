// quiz.js

const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const scoreDisplay = document.getElementById('score-display');
const currentRoundElement = document.getElementById('current-round');
const totalRoundsElement = document.getElementById('total-rounds');
const playerScoreElement = document.querySelector('.player-score');
const playerNameElement = document.querySelector('.player-name');
const endGameButton = document.getElementById('end-game');

let currentQuestion = {};
let score = 0;
let isGameOver = false;
let previousQuestions = [];
let timer;
let timerValue = 30;
let questionCount = 0;
let totalQuestions = 10;
let questions = [];
let isAnswerSelected = false;
let preQuestionTimer = null;
let preQuestionSeconds = 3;
let bonusTimeTotal = 0; // Track total bonus time

// Fetch categories from the Open Trivia Database API
async function fetchCategories() {
    const response = await fetch('https://opentdb.com/api_category.php');
    const data = await response.json();
    return data.trivia_categories;
}

// No category select on quiz page; skip category population

// Fetch questions from the Open Trivia Database API
async function fetchQuestions() {
    let categoryId = localStorage.getItem('quiz_category');
    let difficulty = localStorage.getItem('quiz_difficulty');
    let rounds = parseInt(localStorage.getItem('quiz_rounds'), 10);
    if (!categoryId) categoryId = '';
    if (!difficulty) difficulty = 'medium';
    if (isNaN(rounds) || rounds < 1) rounds = 5;
    totalQuestions = rounds;

    // For sick mode, use only Math, Science, Tech categories, but with 'hard' difficulty
    if (difficulty.toLowerCase() === 'sick') {
        const sickCategories = [17, 18, 19];
        apiUrl = `https://opentdb.com/api.php?amount=${totalQuestions}&type=multiple&difficulty=hard&category=${sickCategories[Math.floor(Math.random()*sickCategories.length)]}`;
    } else if (difficulty.toLowerCase() === 'hard') {
        const hardCategories = [17, 18, 19];
        apiUrl = `https://opentdb.com/api.php?amount=${totalQuestions}&type=multiple&difficulty=hard&category=${hardCategories[Math.floor(Math.random()*hardCategories.length)]}`;
    } else {
        apiUrl = `https://opentdb.com/api.php?amount=${totalQuestions}&type=multiple${categoryId ? `&category=${categoryId}` : ''}${difficulty ? `&difficulty=${difficulty}` : ''}`;
    }
    console.log('Quiz API URL:', apiUrl);
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log('Quiz API Response:', data);
    if (!data.results || data.results.length === 0) {
        questionElement.textContent = 'No questions found for your selection. Please try a different category or difficulty.';
        answersElement.innerHTML = '';
        return [];
    }
    return data.results;
}

// Display the question and answers
function displayQuestion(question) {
    console.log('displayQuestion called with:', question);
    if (!question || !question.question) {
        questionElement.textContent = 'No questions available. Please try a different category or difficulty, or wait and try again.';
        answersElement.innerHTML = '';
        return;
    }
    currentQuestion = question;
    currentRoundElement.textContent = questionCount + 1;
    totalRoundsElement.textContent = totalQuestions;
    questionElement.textContent = decodeHtml(question.question);
    answersElement.innerHTML = '';
    const answers = [...question.incorrect_answers];
    answers.push(question.correct_answer);
    answers.sort(() => Math.random() - 0.5);
    answers.forEach(answer => {
        const answerElement = document.createElement('div');
        answerElement.textContent = decodeHtml(answer);
        answerElement.classList.add('answer');
        answerElement.addEventListener('click', selectAnswer);
        answersElement.appendChild(answerElement);
    });
    isAnswerSelected = false;
}

// Decode HTML entities
function decodeHtml(html) {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
}

// Handle answer selection
function selectAnswer(event) {
    if (isGameOver || isAnswerSelected) return;
    const selectedAnswer = event.target.textContent;
    const isCorrect = selectedAnswer === decodeHtml(currentQuestion.correct_answer);
    if (isCorrect) {
        score += 10;
        // Add remaining time to bonus if correct
        bonusTimeTotal += timerValue;
        event.target.classList.add('correct');
    } else {
        event.target.classList.add('incorrect');
    }
    playerScoreElement.textContent = score;
    previousQuestions.push(currentQuestion);
    questionCount++;
    clearTimer();
    isAnswerSelected = true;
    // Disable answer selection after an answer is selected
    const answerElements = answersElement.getElementsByClassName('answer');
    Array.from(answerElements).forEach(answerElement => {
        answerElement.removeEventListener('click', selectAnswer);
        answerElement.classList.add('disabled');
    });
    setTimeout(nextQuestionWithCountdown, 1200);
}

// Fetch and display a new question
async function fetchAndDisplayQuestion() {
    console.log('fetchAndDisplayQuestion called, questionCount:', questionCount, 'totalQuestions:', totalQuestions);
    if (questionCount === totalQuestions) {
        endGame();
        return;
    }

    let question;
    do {
        if (questions.length === 0) {
            questions = await fetchQuestions();
            console.log('Questions fetched:', questions);
        }
        question = questions.shift();
        console.log('Next question:', question);
    } while (previousQuestions.includes(question));

    displayQuestion(question);
    startTimer();
}

function showPreQuestionCountdown(callback) {
    // Create overlay
    let overlay = document.getElementById('pre-question-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'pre-question-overlay';
        overlay.style.position = 'fixed';
        overlay.style.top = '0';
        overlay.style.left = '0';
        overlay.style.width = '100vw';
        overlay.style.height = '100vh';
        overlay.style.background = 'rgba(0,0,0,0.6)';
        overlay.style.display = 'flex';
        overlay.style.alignItems = 'center';
        overlay.style.justifyContent = 'center';
        overlay.style.zIndex = '2000';
        document.body.appendChild(overlay);
    }
    let seconds = preQuestionSeconds;
    function updateCountdown() {
        if (seconds > 0) {
            overlay.innerHTML = `<div style="font-size:6rem; color:#fff; font-weight:900; text-align:center; text-shadow:0 0 32px #00bfff;">${seconds}</div>`;
            seconds--;
            preQuestionTimer = setTimeout(updateCountdown, 1000);
        } else {
            overlay.remove();
            if (callback) callback();
        }
    }
    updateCountdown();
}

// Show countdown before first question only
function startGameWithCountdown() {
    showPreQuestionCountdown(() => {
        fetchAndDisplayQuestion();
    });
}

// Next question after timer/answer, use:
function nextQuestionWithCountdown() {
    showPreQuestionCountdown(() => {
        fetchAndDisplayQuestion();
    });
}

// Get timer duration from difficulty
function getTimerDuration() {
    let difficulty = localStorage.getItem('quiz_difficulty') || 'medium';
    switch (difficulty.toLowerCase()) {
        case 'easy': return 60;
        case 'medium': return 45;
        case 'hard': return 30;
        case 'sick': return 15;
        default: return 30;
    }
}

// Start the timer (auto-advance after timeout)
function startTimer() {
    timerValue = getTimerDuration();
    updateTimerBar();
    isAnswerSelected = false; // Reset answer selection for new question
    timer = setInterval(() => {
        timerValue--;
        updateTimerBar();
        if (timerValue === 0) {
            clearTimer();
            const answerElements = answersElement.getElementsByClassName('answer');
            Array.from(answerElements).forEach(answerElement => {
                answerElement.removeEventListener('click', selectAnswer);
                answerElement.classList.add('disabled');
            });
            // Only show correct answer if not in sick mode
            let difficulty = localStorage.getItem('quiz_difficulty') || 'medium';
            if (difficulty.toLowerCase() !== 'sick') {
                Array.from(answerElements).forEach(answerElement => {
                    if (answerElement.textContent === decodeHtml(currentQuestion.correct_answer)) {
                        answerElement.classList.add('correct');
                    }
                });
            }
            isAnswerSelected = true; // Prevent answering after timer ends
            questionCount++;
            previousQuestions.push(currentQuestion);
            setTimeout(nextQuestionWithCountdown, 1200);
        }
    }, 1000);
}

function updateTimerBar() {
    const timerBar = document.getElementById('timer-progress');
    if (timerBar) {
        const duration = getTimerDuration();
        timerBar.style.width = ((timerValue / duration) * 100) + '%';
    }
}

// Clear the timer
function clearTimer() {
    clearInterval(timer);
}

// No progress bar in new layout

// End the game
function endGame() {
    // If player has points, redirect to winner page
    if (score > 0) {
        const totalScore = score + bonusTimeTotal;
        console.log('Score:', score, 'Bonus:', bonusTimeTotal, 'Total:', totalScore);
        localStorage.setItem('final_score', score);
        localStorage.setItem('final_player', playerNameElement.textContent || 'Player');
        localStorage.setItem('bonus_time_total', bonusTimeTotal); // Save bonus time
        localStorage.setItem('final_total_score', totalScore);
        window.location.href = 'winner.html';
    } else {
        // Show Game Over modal
        const finishModal = document.getElementById('finishModal');
        if (finishModal) {
            finishModal.classList.add('show');
        }
    }
}

// Start the quiz on page load
window.addEventListener('DOMContentLoaded', () => {
    questionCount = 0;
    score = 0;
    previousQuestions = [];
    isGameOver = false;
    playerNameElement.textContent = localStorage.getItem('quiz_player_name') || 'Player';
    playerScoreElement.textContent = score;
    startGameWithCountdown();
    updateTimerBar();
});




