// game-settings.js
// Handles category/difficulty/rounds selection and passes to quiz.html

// Populate categories on load
async function fetchCategories() {
    const response = await fetch('https://opentdb.com/api_category.php');
    const data = await response.json();
    return data.trivia_categories;
}

async function populateCategoryOptions() {
    const categorySelect = document.getElementById('category');
    const categories = await fetchCategories();
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        categorySelect.appendChild(option);
    });
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', populateCategoryOptions);
} else {
    populateCategoryOptions();
}

// Only category/difficulty/rounds logic

function startGame() {
    const category = document.getElementById('category') ? document.getElementById('category').value : '';
    const difficultyRadio = document.querySelector('.difficulty-card input[type="radio"]:checked');
    const difficulty = difficultyRadio ? difficultyRadio.value : '';
    const rounds = document.getElementById('rounds-slider').value;
    localStorage.setItem('quiz_category', category);
    localStorage.setItem('quiz_difficulty', difficulty);
    localStorage.setItem('quiz_rounds', rounds);
    window.location.href = 'quiz.html';
}

const startBtn = document.querySelector('.sga-btn');
if (startBtn) startBtn.addEventListener('click', function(e) {
    e.preventDefault();
    startGame();
});
