/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, winningScore;
var roundLost = document.querySelector('.losing-roll');
var btnRollDice = document.querySelector('.btn-roll');
var btnHoldDice = document.querySelector('.btn-hold');


init();

btnRollDice.addEventListener('click', function() {
  if(gamePlaying) {
    //1. Random Number
    var dice = Math.floor(Math.random() * 6) + 1;

    //2. Display the result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'Images/dice-' + dice + '.png';

    //3. Updated the round Score if it's not a 1
    if (dice !== 1) {
      //Add Score
      roundScore += dice;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      roundLost.style.display = 'block';
      document.querySelector('#current-' + activePlayer).textContent = 'X';
      //Next Player
      setTimeout(nextPlayer, 2500);

    }
  }
});


document.querySelector('.btn-hold').addEventListener('click', function() {
  if(gamePlaying) {
    //add current score to global score
    scores[activePlayer] += roundScore; //shorthand for: scores[activePlayer] = scores[activePlayer] + roundScore;

    //Update UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    //Check if player won the game
    winningScore = document.querySelector('#winning-score').value;
    //console.log(winningScore);
      if (scores[activePlayer] >= winningScore) {
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        document.querySelector('.dice').style.display = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        btnRollDice.style.opacity = '.5';
        btnHoldDice.style.opacity = '.5';
        gamePlaying = false;

      } else {
        //Next player
        nextPlayer();
      }
  }
});


function nextPlayer() {
  //Next Player
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0; //Ternary operator
  roundScore = 0;
  //console.log(activePlayer);
  //Remove roundLost div
  roundLost.style.display = 'none';

  //reset roundScores
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';


  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.querySelector('.dice').style.display = 'none';

};


document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0,0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.querySelector('.dice').style.display = 'none';

  btnRollDice.style.opacity = '1';
  btnHoldDice.style.opacity = '1';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
  document.querySelector('#winning-score').value = 50;
}

//document.querySelector('#current-' + activePlayer).textContent = dice;
//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'
