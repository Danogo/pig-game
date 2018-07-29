/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
- Player who rolls '6' two times in a row loses all his global score, and it's next player's turn

*/

// Global variables
let scores, roundScore, activePlayer, gameOn, lastRoll;
init();

document.querySelector('.btn-roll').addEventListener('click', function () {
  if (gameOn) {
    // 1. get random number from 1 to 6
    let diceRoll = Math.floor(Math.random() * 6) + 1;
    // or Math.ceil(Math.random()*6)
    // 2. display the result
    let diceEl = document.querySelector('.dice');
    diceEl.style.display = 'block';
    diceEl.src = `dice-${diceRoll}.png`;
    // 3. update current score with rolled dice value if value is not a 1, reset score if it's second 6 in a row
    if ( diceRoll === 6 && lastRoll === 6) {
      scores[activePlayer] = 0;
      document.getElementById(`score-${activePlayer}`).textContent = '0';
      switchPlayers();
    } else if (diceRoll !== 1) {
      // Add value to current score
      roundScore += diceRoll;
      document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
       // set lastRoll for the next roll
      lastRoll = diceRoll;
    } else {
      switchPlayers();
    }
  }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
  if (gameOn) {
    // Add CURRENT score to GLOBAL score
    let globalScore = scores[activePlayer] += roundScore;
    // Update the UI
    document.getElementById(`score-${activePlayer}`).textContent = globalScore;
    // grab winning score from input
    var winCase = parseInt(document.querySelector('.final-score').value, 10);
    // Check if player won the game, if winCase is empty string it's coerced to false and default win score of 100 is set
    if (globalScore >= (winCase || 100)) {
      document.getElementById(`name-${activePlayer}`).textContent = 'Winner!';
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.btn-roll').style.display = 'none';
      document.querySelector('.btn-hold').style.display = 'none';
      let activePanel = document.querySelector(`.player-${activePlayer}-panel`);
      activePanel.classList.remove('active');
      activePanel.classList.add('winner');
      gameOn = false;
    } else {
      // Switch players
      switchPlayers();
    }
  }
});

document.querySelector('.btn-new').addEventListener('click', init);

// switch player and reset scores
function switchPlayers() {
  activePlayer = activePlayer === 0 ? 1 : 0;
  roundScore = 0;
  lastRoll = 0;
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

// initialize game
function init() {
  // reseting settings for new clear start
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gameOn = true;
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.player-0-panel').className = 'player-0-panel active';
  document.querySelector('.player-1-panel').className = 'player-1-panel';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.btn-roll').style.display = 'block';
  document.querySelector('.btn-hold').style.display = 'block';
}