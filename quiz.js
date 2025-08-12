// quiz.js
const quizContainer = document.getElementById('quiz-container');
const questionNumberElement = document.getElementById('question-number');
const questionElement = document.getElementById('question');
const answersElement = document.getElementById('answers');
const scoreElement = document.getElementById('score');
const endGameButton = document.getElementById('end-game');
const timerElement = document.getElementById('timer-value');
const timerBar = document.getElementById('timer-progress');
const progressBar = document.getElementById('progress-value');
const categorySelect = document.getElementById('category');
const difficultySelect = document.getElementById('difficulty');
const questionContainer = document.getElementById('question-container');
const controls = document.getElementById('controls');
const answerFeedback = document.getElementById('answer-feedback');
const nextQuestionButton = document.getElementById('next-question');
const gameOverContainer = document.getElementById('game-over');
const finalScoreElement = document.getElementById('final-score');
const playAgainButton = document.getElementById('play-again');
const quitButton = document.getElementById('quit');

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

// Populate the category select options
async function populateCategoryOptions() {
    const categories = await fetchCategories();
    categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category.id;
    option.textContent = category.name;
    categorySelect.appendChild(option);
    });
}

// Fetch questions from the Open Trivia Database API
async function fetchQuestions() {
    const categoryId = categorySelect.value;
    const difficulty = difficultySelect.value;
    const response = await fetch(`https://opentdb.com/api.php?amount=${totalQuestions}&type=multiple${categoryId ? `&category=${categoryId}` : ''}${difficulty ? `&difficulty=${difficulty}` : ''}`);
    const data = await response.json();
    return data.results;
}

// Display the question and answers
function displayQuestion(question) {
    currentQuestion = question;
    questionNumberElement.textContent = `Question ${questionCount + 1}`;
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
    nextQuestionButton.style.display = 'none';
    answerFeedback.style.display = 'none';
    isAnswerSelected = false;
}
