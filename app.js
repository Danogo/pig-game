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

document.querySelector('.btn-roll').addEventListener('click', function () {
  // 1. get random number from 1 to 6
  let diceRoll = Math.floor(Math.random() * 6) + 1;
  // or Math.ceil(Math.random()*6)

  // 2. display the result
  let diceEl = document.querySelector('.dice');
  diceEl.style.display = 'block';
  diceEl.src = `dice-${diceRoll}.png`;

  // 3. update current score with rolled dice value if value is not a 1
  if (diceRoll !== 1) {
    // Add value to current score
    roundScore += diceRoll;
    document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
  } else {
    switchPlayers();
  }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
  // Add CURRENT score to GLOBAL score
  let globalScore = scores[activePlayer] += roundScore;

  // Update the UI
  document.getElementById(`score-${activePlayer}`).textContent = globalScore;

  // Check if player won the game
  if (globalScore >= 100) {
    document.getElementById(`name-${activePlayer}`).textContent = 'Winner!';
    document.querySelector('.dice').style.display = 'none';
    let activePanel = document.querySelector(`.player-${activePlayer}-panel`);
    activePanel.classList.remove('active');
    activePanel.classList.add('winner');
  } else {
    // Switch players
    switchPlayers();
  }
});

// switch player and reset scores
function switchPlayers() {
  activePlayer = activePlayer === 0 ? 1 : 0;
  roundScore = 0;
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  // change display active player
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  // hide dice for next player
  setTimeout(function () {
    document.querySelector('.dice').style.display = 'none';
  }, 400);
}