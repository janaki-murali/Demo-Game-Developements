const gameBoard = document.querySelector('.game-board');
const movesCounter = document.getElementById('moves');
const restartButton = document.getElementById('restart');

const icons = [
  '\uD83C\uDF4E', 
  '\uD83C\uDF4C', 
  '\uD83C\uDF47', 
  '\uD83C\uDF52', 
  '\uD83C\uDF53', 
  '\uD83C\uDF4D', 
  '\uD83E\uDD5D', 
  '\uD83C\uDF49'  
];

let moves = 0;
let firstCard = null;
let secondCard = null;
let matchedCards = 0;

let cards = [...icons, ...icons].sort(() => 0.5 - Math.random());

function createBoard() {
  gameBoard.innerHTML = '';
  cards.forEach((icon) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.icon = icon;
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
  moves = 0;
  movesCounter.textContent = moves;
  firstCard = null;
  secondCard = null;
}

function flipCard() {
  if (this.classList.contains('flipped') || this.classList.contains('matched')) return;

  this.classList.add('flipped');
  this.textContent = this.dataset.icon;

  if (!firstCard) {
    firstCard = this;
  } else if (!secondCard) {
    secondCard = this;
    moves++;
    movesCounter.textContent = moves;
    checkMatch();
  }
}

function checkMatch() {
  if (firstCard.dataset.icon === secondCard.dataset.icon) {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');
    matchedCards++;
    resetTurn();
    checkWin();
  } else {
    setTimeout(() => {
      firstCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      firstCard.textContent = '';
      secondCard.textContent = '';
      resetTurn();
    }, 1000);
  }
}

function checkWin() {
    if (matchedCards === cards.length / 2) {
      setTimeout(() => {
        alert('You Win!!');
      }, 500);
    }
  }

function resetTurn() {
  firstCard = null;
  secondCard = null;
}

restartButton.addEventListener('click', createBoard);

createBoard();
