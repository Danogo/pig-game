/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

const scores = [0, 0];;
let roundScore, activePlayer;

roundScore = 0;
activePlayer = 0;

document.querySelector('.btn-roll').addEventListener('click', function() {
  // 1. get random number from 1 to 6
  let diceNum = Math.floor(Math.random() * 6) + 1;
  // or Math.ceil(Math.random()*6)

  // 2. display the result
  let diceEl = document.querySelector('.dice');
  diceEl.style.display = 'block';
  diceEl.src = `dice-${diceNum}.png`;

  // 3. update current score with rolled dice value
  document.querySelector(`#current-${activePlayer}`).textContent = diceNum;

});