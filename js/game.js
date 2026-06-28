let canvas;
let world;
let keyboard = new Keyboard();
let gameRunning = false;
let backgroundMusic = new Audio('audio/game/gameStart.mp3');

/** Prepares the canvas, mute icon and keyboard once the page loaded. */
function init() {
    canvas = document.getElementById('canvas');
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.15;
    updateMuteIcon();
    bindKeyboard();
}

/** Starts a fresh game: builds the level, world and hides the menu. */
function startGame() {
    initLevel();
    world = new World(canvas, keyboard);
    gameRunning = true;
    backgroundMusic.play();
    document.getElementById('startScreen').classList.add('d-none');
    document.getElementById('endScreen').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
}

/** Restarts the game without reloading the page. */
function restartGame() {
    clearAllIntervals();
    startGame();
}

/** Stops the running game and returns to the start screen. */
function backToHome() {
    clearAllIntervals();
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    gameRunning = false;
    document.getElementById('endScreen').classList.add('d-none');
    showStartScreen();
}

/** Clears every active interval so no old loop keeps running. */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/** Shows the start screen and hides the canvas. */
function showStartScreen() {
    document.getElementById('startScreen').classList.remove('d-none');
    document.getElementById('canvas').classList.add('d-none');
}

/**
 * Shows the end screen with a win or lose image.
 * @param {boolean} won - True if the player has won.
 */
function showEndScreen(won) {
    backgroundMusic.pause();
    let screen = document.getElementById('endScreen');
    let image = document.getElementById('endImage');
    image.src = won ? 'img/You won, you lost/You Won A.png'
        : 'img/9_intro_outro_screens/game_over/game over.png';
    screen.classList.remove('d-none');
    document.getElementById('canvas').classList.add('d-none');
}

/** Toggles the browser fullscreen mode for the game container. */
function toggleFullscreen() {
    let element = document.getElementById('gameContainer');
    if (!document.fullscreenElement) element.requestFullscreen();
    else document.exitFullscreen();
}
