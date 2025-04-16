const buttonColors = ["green", "red", "yellow", "blue"];
const keyBindings = {
  w: "green",
  e: "red",
  s: "yellow",
  d: "blue"
};

let gamePattern = [];
let userPattern = [];
let started = false;
let level = 0;

document.addEventListener("keydown", (event) => {
  if (!started) {
    startGame();
  } else {
    const key = event.key.toLowerCase();
    if (keyBindings[key]) {
      handleUserInput(keyBindings[key]);
    }
  }
});

document.querySelectorAll(".btn").forEach(button => {
  button.addEventListener("click", () => {
    const color = button.dataset.color;
    handleUserInput(color);
  });
});

function startGame() {
  level = 0;
  gamePattern = [];
  started = true;
  nextSequence();
}

function nextSequence() {
  userPattern = [];
  level++;
  updateTitle(`Level ${level}`);

  const randomColor = buttonColors[Math.floor(Math.random() * 4)];
  gamePattern.push(randomColor);
  animatePress(randomColor);
}

function handleUserInput(color) {
  userPattern.push(color);
  animatePress(color);

  const currentStep = userPattern.length - 1;
  if (userPattern[currentStep] !== gamePattern[currentStep]) {
    gameOver();
    return;
  }

  if (userPattern.length === gamePattern.length) {
    setTimeout(nextSequence, 1000);
  }
}

function animatePress(color) {
  const btn = document.getElementById(color);
  if (!btn) return;

  btn.classList.add("pressed");
  setTimeout(() => btn.classList.remove("pressed"), 100);
}

function gameOver() {
  playWrongSound();
  document.body.classList.add("game-over");
  updateTitle("Game Over, Press Any Key to Restart");

  setTimeout(() => {
    document.body.classList.remove("game-over");
    started = false;
  }, 200);
}

function playWrongSound() {
  const audio = new Audio("./wrong.mp3");
  audio.play();
}

function updateTitle(text) {
  document.getElementById("level-title").textContent = text;
}
