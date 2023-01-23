'use strict';

//Housekeeping
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currentScore0 = document.querySelector('#current--0');
const currentScore1 = document.querySelector('#current--1');
let scores, currentScore, activePlayer, playing;
//initialize function
const init = function () {
  score0El.textContent = 0;
  score1El.textContent = 0;
  currentScore = 0;
  //first player is 0 and next is 1
  activePlayer = 0;
  //player 0 will be index 0, and 1 will be index 1
  scores = [0, 0];
  playing = true;
  //adding a class to HTML, so that the dice will be hidden
  diceEl.classList.add('hidden');

  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');

  //clear current scores
  currentScore0.textContent = currentScore;
  currentScore1.textContent = currentScore;
};

//delcaring function for player switch
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  //if active player is 0 switch to 1 else 0
  activePlayer = activePlayer === 0 ? 1 : 0;
  //toggle() will add or remove the class selected
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

/***Starting initializing new game */
init();

/***Rolling the dice****/
btnRoll.addEventListener('click', function () {
  if (playing) {
    //Generating a random dice roll
    //math.random generates a num>=0 && <1
    // Math.trunc(Math.random() * 6) will output 0-5
    const dice = Math.trunc(Math.random() * 6) + 1;

    //Display dice
    //when button is clicked, remove the hidden class to show dice
    diceEl.classList.remove('hidden');
    //selecting the img src and use dice variable to diplay dice accordingly
    diceEl.src = `dice-${dice}.png`;

    //Check if rolled 1
    if (dice !== 1) {
      //add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

/****when HOLD button is clicked, display hold score***/
btnHold.addEventListener('click', function () {
  //if false, following will not be executed
  if (playing) {
    //add current score to active player score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //check if score is>=100
    if (scores[activePlayer] >= 20) {
      //finsh game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer(); //continue
    }
  }
});

/**Reset game button */
btnNew.addEventListener('click', function () {
  init();
});
