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

// Fetch categories from the Open Trivia Database API
async function fetchCategories() {
    const response = await fetch('https://opentdb.com/api_category.php');
    const data = await response.json();
    return data.trivia_categories;
}

// No category select on quiz page; skip category population

// Fetch questions from the Open Trivia Database API
async function fetchQuestions() {
    // Read from localStorage if available
    let categoryId = localStorage.getItem('quiz_category');
    let difficulty = localStorage.getItem('quiz_difficulty');
    let rounds = parseInt(localStorage.getItem('quiz_rounds'), 10);
    // Fallback defaults if not set
    if (!categoryId) categoryId = '';
    if (!difficulty) difficulty = 'medium';
    if (isNaN(rounds) || rounds < 1) rounds = 5;
    totalQuestions = rounds;
    const apiUrl = `https://opentdb.com/api.php?amount=${totalQuestions}&type=multiple${categoryId ? `&category=${categoryId}` : ''}${difficulty ? `&difficulty=${difficulty}` : ''}`;
    console.log('Quiz API URL:', apiUrl);
    console.log('LocalStorage:', {
        quiz_category: categoryId,
        quiz_difficulty: difficulty,
        quiz_rounds: rounds
    });
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
        score++;
        event.target.classList.add('correct');
    } else {
        event.target.classList.add('incorrect');
    }
    scoreDisplay.textContent = score;
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
    setTimeout(fetchAndDisplayQuestion, 1200);
}

// Fetch and display a new question
async function fetchAndDisplayQuestion() {
    if (questionCount === totalQuestions) {
    endGame();
    return;
    }

    let question;
    do {
    if (questions.length === 0) {
        questions = await fetchQuestions();
    }
    question = questions.shift();
    } while (previousQuestions.includes(question));

    displayQuestion(question);
    startTimer();
}

// Start the timer (auto-advance after timeout)
function startTimer() {
    timerValue = 30;
    timer = setInterval(() => {
        timerValue--;
        if (timerValue === 0) {
            clearTimer();
            // Show correct answer
            const answerElements = answersElement.getElementsByClassName('answer');
            Array.from(answerElements).forEach(answerElement => {
                answerElement.removeEventListener('click', selectAnswer);
                if (answerElement.textContent === decodeHtml(currentQuestion.correct_answer)) {
                    answerElement.classList.add('correct');
                }
                answerElement.classList.add('disabled');
            });
            questionCount++;
            previousQuestions.push(currentQuestion);
            setTimeout(fetchAndDisplayQuestion, 1200);
        }
    }, 1000);
}

// Clear the timer
function clearTimer() {
    clearInterval(timer);
}

// No progress bar in new layout

// End the game
function endGame() {
    isGameOver = true;
    // Save score, difficulty, and player info to localStorage
    localStorage.setItem('final_score', score);
    localStorage.setItem('final_difficulty', localStorage.getItem('quiz_difficulty') || 'medium');
    localStorage.setItem('final_player', 'Player');
    window.location.href = 'game-over.html';
}

// Start the quiz on page load
window.addEventListener('DOMContentLoaded', () => {
    questionCount = 0;
    score = 0;
    previousQuestions = [];
    isGameOver = false;
    playerNameElement.textContent = 'Player';
    playerScoreElement.textContent = score;
    fetchAndDisplayQuestion();
});

// No next question or play again button in new layout


