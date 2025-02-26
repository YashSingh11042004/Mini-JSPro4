const colors = ["red", "blue", "green", "yellow"];
let gameSequence = [];
let userSequence = [];
let level = 0;
let started = false;

document.addEventListener("keypress", startGame);

function startGame() {
    if (!started) {
        level = 0;
        gameSequence = [];
        started = true;
        nextSequence();
    }
}

function nextSequence() {
    userSequence = [];
    level++;
    document.getElementById("level-title").innerText = `Level ${level}`;

    let randomColor = colors[Math.floor(Math.random() * 4)];
    gameSequence.push(randomColor);

    setTimeout(() => flashButton(randomColor), 500);
}

function flashButton(color) {
    let button = document.getElementById(color);
    button.classList.add("flash");
    setTimeout(() => button.classList.remove("flash"), 300);
    playSound(color);
}

function playSound(color) {
    let sound = new Audio(`sounds/${color}.mp3`);
    sound.play();
}

document.querySelectorAll(".btn").forEach(btn => {
    btn.addEventListener("click", function () {
        if (!started) return;

        let clickedColor = this.id;
        userSequence.push(clickedColor);
        flashButton(clickedColor);

        checkAnswer(userSequence.length - 1);
    });
});

function checkAnswer(index) {
    if (userSequence[index] !== gameSequence[index]) {
        gameOver();
        return;
    }

    if (userSequence.length === gameSequence.length) {
        setTimeout(nextSequence, 1000);
    }
}

function gameOver() {
    document.body.classList.add("game-over");
    setTimeout(() => document.body.classList.remove("game-over"), 500);
    document.getElementById("level-title").innerText = "Game Over! Press Any Key to Restart";

    started = false;
}

