'use strict';

const messageEl = document.querySelector('.message');
const scoreEl = document.querySelector('.score');
const highscoreEl = document.querySelector('.highscore');
const numberEl = document.querySelector('.number');
const guessEl = document.querySelector('.guess');
const checkBtn = document.querySelector('.check');
const againBtn = document.querySelector('.again');
const betweenEl = document.querySelector('.between');

let secretNumber;
let score = 0;
let highscore = 0;
let gamesPlayed = 0;
const totalGames = 20;

const getRandomNumber = () => Math.trunc(Math.random() * 100) + 1;

const newGame = () => {
  secretNumber = getRandomNumber();
  score = 0;
  gamesPlayed = 0;
  updateUI('Start guessing...', '?', '#222', 'auto');
  scoreEl.textContent = score;
  betweenEl.textContent = `(Turn: ${gamesPlayed + 1}/${totalGames})`;
  guessEl.value = '';
  checkBtn.disabled = false;
  guessEl.disabled = false;
};

const endGame = () => {
  updateUI(`Game Over! Final Score: ${score}`, 'Game Over');
  checkBtn.disabled = true;
  guessEl.disabled = true;
  betweenEl.textContent = `(Turn: ${gamesPlayed}/${totalGames})`;

  if (score > highscore) {
    highscore = score;
    highscoreEl.textContent = highscore;
  }
};

const updateUI = (msg, number, bg = '#222', width = 'auto') => {
  messageEl.textContent = msg;
  numberEl.textContent = number;
  document.body.style.backgroundColor = bg;
  numberEl.style.width = width;
};

const checkGuess = () => {
  const guess = Number(guessEl.value);

  if (!guess || guess < 1 || guess > 100) {
    return (messageEl.textContent = '⛔ No number between 1 and 100!');
  }

  gamesPlayed++;

  if (guess === secretNumber) {
    updateUI('🎉 Correct Number!', secretNumber, '#4fff19ff', '30rem');
    score++;
    scoreEl.textContent = score;
  } else {
    updateUI(guess > secretNumber ? 'Too high!' : 'Too low!', secretNumber, '#e01616ff');
  }

  betweenEl.textContent = `(Turn: ${gamesPlayed}/${totalGames})`;

  if (gamesPlayed >= totalGames) {
    endGame();
  } else {
    setTimeout(() => {
      updateUI('Start guessing...', '?');
      secretNumber = getRandomNumber();
      guessEl.value = '';
    }, 1000);
  }
};

checkBtn.addEventListener('click', checkGuess);
againBtn.addEventListener('click', newGame);
guessEl.addEventListener('keydown', e => e.key === 'Enter' && checkGuess());

newGame();