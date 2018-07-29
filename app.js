/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls tw dices as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn, player doesn't lose turn if he rolls 2x 1
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
- Player who rolls '12' two times in a row loses all his global score, and it's next player's turn

*/

// Global variables
let scores, roundScore, activePlayer, gameOn, lastRoll;
init();

document.querySelector('.btn-roll').addEventListener('click', function () {
  if (gameOn) {
    // 1. get random number from 1 to 6
    let dice1Roll = Math.floor(Math.random() * 6) + 1;
    let dice2Roll = Math.floor(Math.random() * 6) + 1;
    // or Math.ceil(Math.random()*6)
    // 2. display the result
    let dice1El = document.getElementById('dice-1');
    let dice2El = document.getElementById('dice-2');
    dice1El.style.display = 'block';
    dice2El.style.display = 'block';
    dice1El.src = `dice-${dice1Roll}.png`;
    dice2El.src = `dice-${dice2Roll}.png`;
    // 3. update current score with rolled dice value if value is not a 1, reset score if it's second 12 in a row
    if (dice1Roll + dice2Roll === 12 && lastRoll === 12) {
      scores[activePlayer] = 0;
      document.getElementById(`score-${activePlayer}`).textContent = '0';
      switchPlayers();
    } else if ((dice1Roll === 1 || dice2Roll === 1) && !(dice1Roll === 1 && dice2Roll === 1)) {
      switchPlayers();
    } else {
      // Add value to current score
      roundScore += dice1Roll + dice2Roll;
      document.querySelector(`#current-${activePlayer}`).textContent = roundScore;
      // set lastRoll for the next roll
      lastRoll = dice1Roll + dice2Roll;
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
      hideDices();
      document.getElementById(`name-${activePlayer}`).textContent = 'Winner!';
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
    hideDices();
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
  document.querySelector('.player-0-panel').className = 'player-0-panel active';
  document.querySelector('.player-1-panel').className = 'player-1-panel';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.btn-roll').style.display = 'block';
  document.querySelector('.btn-hold').style.display = 'block';
  hideDices();
}

function hideDices() {
  document.getElementById('dice-1').style.display = 'none';
  document.getElementById('dice-2').style.display = 'none';
}