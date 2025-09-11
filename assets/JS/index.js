// index.js - handles modal and start button logic for index.html

document.addEventListener('DOMContentLoaded', function() {
    console.log('index.js loaded');
    // Modal logic
    const howToPlayBtn = document.getElementById('howToPlayBtn');
    const howToPlayModal = document.getElementById('howToPlayModal');
    const closeHowToPlay = document.getElementById('closeHowToPlay');
    const startGameBtn = document.getElementById('startGameBtn');
    const nameModal = document.getElementById('nameModal');
    const playerNameInput = document.getElementById('playerNameInput');
    const startWithNameBtn = document.getElementById('startWithNameBtn');

    howToPlayBtn.onclick = function() {
        howToPlayModal.classList.add('show');
    }
    closeHowToPlay.onclick = function() {
        howToPlayModal.classList.remove('show');
    }
    window.onclick = function(event) {
        if (event.target === howToPlayModal) {
            howToPlayModal.classList.remove('show');
        }
        if (event.target === nameModal) {
            nameModal.classList.remove('show');
        }
    }

    startGameBtn.onclick = function(e) {
        console.log('Start New Game button clicked');
        e.preventDefault();
        nameModal.classList.add('show');
        console.log('Name modal should now be visible');
        playerNameInput.value = '';
        playerNameInput.focus();
    }

    startWithNameBtn.onclick = function() {
        const name = playerNameInput.value.trim() || 'Player';
        localStorage.setItem('quiz_player_name', name);
        nameModal.classList.remove('show');
        window.location.href = 'game-settings.html';
    }

    playerNameInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            startWithNameBtn.click();
        }
    });

    // Check if there's a redirect path stored from 404
    const redirectedPath = sessionStorage.redirect;
    if (redirectedPath) {
        sessionStorage.removeItem('redirect');
        window.history.replaceState(null, '', redirectedPath);
    }
});
