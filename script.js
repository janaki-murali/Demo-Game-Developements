const gameContainer = document.getElementById("gameContainer");
const bird = document.getElementById("bird");
const scoreElement = document.getElementById("score");

let birdTop = 200;
let gravity = 1;
let jumpHeight = 30;
let score = 0;
let isGameOver = false;
let pipeInterval;
let gravityInterval;

function applyGravity() {
  if (isGameOver) return;
  birdTop += gravity;
  bird.style.top = `${birdTop}px`;
  if (birdTop >= gameContainer.offsetHeight - bird.offsetHeight || birdTop <= 0) {
    endGame();
  }
}

function jump() {
  if (isGameOver) return;
  birdTop -= jumpHeight;
  if (birdTop < 0) birdTop = 0;
  bird.style.top = `${birdTop}px`;
}

function createPipe() {
  const pipeHeight = Math.random() * 200 + 100;
  const gap = 170;
  const pipeWidth = 60;

  const topPipe = document.createElement("div");
  topPipe.classList.add("pipe", "pipe-top");
  topPipe.style.height = `${pipeHeight}px`;
  topPipe.style.right = "0";
  topPipe.style.width = `${pipeWidth}px`;

  const bottomPipe = document.createElement("div");
  bottomPipe.classList.add("pipe", "pipe-bottom");
  bottomPipe.style.height = `${gameContainer.offsetHeight - pipeHeight - gap}px`;
  bottomPipe.style.right = "0";
  bottomPipe.style.width = `${pipeWidth}px`;

  gameContainer.appendChild(topPipe);
  gameContainer.appendChild(bottomPipe);

  const pipeInterval = setInterval(() => {
    const topPipeRight = parseInt(window.getComputedStyle(topPipe).getPropertyValue("right"));
    const bottomPipeRight = parseInt(window.getComputedStyle(bottomPipe).getPropertyValue("right"));

    if (topPipeRight > gameContainer.offsetWidth + pipeWidth) {
      topPipe.remove();
      bottomPipe.remove();
      clearInterval(pipeInterval);
      updateScore();
    } else {
      topPipe.style.right = `${topPipeRight + 5}px`;
      bottomPipe.style.right = `${bottomPipeRight + 5}px`;
    }

    const birdRect = bird.getBoundingClientRect();
    const topPipeRect = topPipe.getBoundingClientRect();
    const bottomPipeRect = bottomPipe.getBoundingClientRect();

    if (
      (birdRect.left < topPipeRect.right &&
        birdRect.right > topPipeRect.left &&
        birdRect.top < topPipeRect.bottom) ||
      (birdRect.left < bottomPipeRect.right &&
        birdRect.right > bottomPipeRect.left &&
        birdRect.bottom > bottomPipeRect.top)
    ) {
      endGame();
    }
  }, 20);
}

function updateScore() {
  score++;
  scoreElement.textContent = `Score: ${score}`;
}

function startPipes() {
  setInterval(createPipe, 1500);
}

function endGame() {
  isGameOver = true;
  clearInterval(pipeInterval);
  clearInterval(gravityInterval);
  alert(`Game Over! Your Score: ${score}`);
  resetGame();
}

function resetGame() {
  birdTop = 200;
  bird.style.top = `${birdTop}px`;

  score = 0;
  scoreElement.textContent = `Score: 0`;

  const pipes = document.querySelectorAll('.pipe');
  pipes.forEach(pipe => pipe.remove());

  isGameOver = false;

  startGame();
}

function startGame() {
  gravityInterval = setInterval(applyGravity, 20);
  pipeInterval = setInterval(createPipe, 1500);
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") {
    jump();
  }
});

startGame();
