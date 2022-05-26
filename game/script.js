"use strict";

//DECLARATION OF VARIABLES /////
let player = 0;
let playerTwo = document.querySelector(".player--1");
let scoreOne = 0;
let scoreTwo = 0;
let playerOneScore = 0;
let playerTwoScore = 0;
let rollDice;
let playerOne = document.querySelector(".player--0");
document.querySelector(".dice").classList.add("hidden");
let promptPlayerOne = "";
let promptPlayerTwo = "";
let playerOneName = document.querySelector("#name--0");
let playerTwoName = document.querySelector("#name--1");
let btnTwoPlayers = document.querySelector(".btn--two");
let btnVsComputer = document.querySelector(".btn--computer");
let dice = document.querySelector(".dice");
let scorePlayerOne = document.querySelector("#score--0");
let scorePlayerTwo = document.querySelector("#score--1");
let currentOne = document.querySelector("#current--0");
let currentTwo = document.querySelector("#current--1");
let computer;

const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

////// INITIALIZATION FUNCTION //////////
let init = function () {
  player = 0;
  scoreOne = 0;
  scoreTwo = 0;
  playerOneScore = 0;
  playerTwoScore = 0;
  document.querySelector("#current--1").textContent = scoreTwo;
  document.querySelector("#current--0").textContent = scoreOne;
  document.querySelector("#score--1").textContent = playerTwoScore;
  document.querySelector("#score--0").textContent = playerOneScore;
  playerOne.classList.add("player--active");
  playerTwo.classList.remove("player--active");
  document.querySelector(".dice").classList.add("hidden");
  playerOne.classList.remove("player--winner");
  playerTwo.classList.remove("player--winner");
  document.querySelector("#name--0").textContent = "";
  document.querySelector("#name--1").textContent = "";
  btnVsComputer.classList.remove("hidden");
  btnTwoPlayers.classList.remove("hidden");
  btnVsComputer.disabled = false;
  btnTwoPlayers.disabled = false;
  computer;
  btnRoll.disabled = true;
  btnHold.disabled = true;
};
init();
////// DICE ROLL FUNCTION TO GENERATE RANDOM NUMBER BETWEEN 1 AND 6 AND CHANGE DICE DISPLAY
let diceRoll = function () {
  rollDice = Math.trunc(Math.random() * 6) + 1;
  switch (rollDice) {
    case 1:
      dice.src = "dice-1.png";
      break;
    case 2:
      dice.src = "dice-2.png";
      break;
    case 3:
      dice.src = "dice-3.png";
      break;
    case 4:
      dice.src = "dice-4.png";
      break;
    case 5:
      dice.src = "dice-5.png";
      break;
    case 6:
      dice.src = "dice-6.png";
      break;
    default:
      dice.src = "";
  }
};

// WHEN YOU CLICK ON TWO PLAYERS
btnTwoPlayers.addEventListener("click", function () {
  promptPlayerOne = prompt("Player 1, Whats your name ?"); // PROMPT BOX FOR PLAYER NAME
  promptPlayerTwo = prompt("Player 2, Whats your name ?"); // PROMPT BOX FOR PLAYER NAME
  playerOneName.textContent = promptPlayerOne;
  playerTwoName.textContent = promptPlayerTwo;
  scorePlayerOne.textContent = 0;
  scorePlayerTwo.textContent = 0;
  btnVsComputer.classList.add("hidden");
  btnTwoPlayers.classList.add("hidden");
  btnVsComputer.disabled = true;
  btnTwoPlayers.disabled = false;
  computer = false;
  btnRoll.disabled = false;
  btnHold.disabled = false;
});

// WHEN YOU CLICK ON VS COMPUTER
btnVsComputer.addEventListener("click", function () {
  playerOneName.textContent = prompt("Player 1, Whats your name ?");
  playerTwoName.textContent = "Computer";
  scorePlayerOne.textContent = 0;
  scorePlayerTwo.textContent = 0;
  btnVsComputer.classList.add("hidden");
  btnVsComputer.disabled = false;
  btnTwoPlayers.disabled = true;
  btnTwoPlayers.classList.add("hidden");
  computer = true;
  btnRoll.disabled = false;
  btnHold.disabled = false;
});

///// COMPUTER AUTO PLAYING FUNCTION
let comPlay = function () {
  btnRoll.disabled = true;
  let compTurns = Math.trunc(Math.random() * 3) + 1; // the number of times the computer will play in random numbers
  for (let i = 0; i < compTurns; i++) {
    diceRoll();
    scoreTwo += rollDice;
    currentTwo.textContent = scoreTwo;
  }

  //// COMPUTER IS DONE PLAYING AND SWITCH BACK TO PLYER ONE
  playerTwoScore += scoreTwo;
  if (playerTwoScore < 100) {
    scorePlayerTwo.textContent = playerTwoScore;
    playerTwo.classList.remove("player--active");
    playerOne.classList.add("player--active");
    player = 0;
    scoreTwo = 0;
    currentTwo.textContent = scoreTwo;
    btnRoll.disabled = false;
  }

  // PLAYER TWO (COMPUTER) SCORE  GREATER THAN 100
  else if (playerTwoScore >= 100) {
    playerTwoName.textContent = `Computer wins the game`;
    dice.src = "trophy.png";
    scorePlayerTwo.textContent = playerTwoScore;
    playerTwo.classList.add("player--winner");
  }
};

// When the roll dice button is clicked
btnRoll.addEventListener("click", function () {
  dice.classList.remove("hidden");

  // dice roll function is performed with switch cases for images and obtaining a random value
  diceRoll();

  //   if player is first player (player = 0)
  if (player == 0) {
    // if score < 100

    // when dice not equal to 1 add score and check if player wants to continue or not
    if (rollDice !== 1) {
      // make score = rolled dice value and display same
      scoreOne += rollDice;
      currentOne.textContent = scoreOne;
    }
    // if rolldice = 1, dont add anything to score of player 1, just switch to player 2
    else if (rollDice == 1) {
      scoreOne = 0;
      currentOne.textContent = scoreOne;

      if (computer == true) {
        player = 2;
        btnRoll.disabled = true;
        comPlay();
      } else if (computer == false) {
        player = 1;
        btnRoll.disabled = false;
      }

      playerOne.classList.remove("player--active");
      playerTwo.classList.add("player--active");
    }
  }

  ///////   second player turn (player == 1)
  else if (player == 1) {
    // when dice not equal to 1 add score and check if player wants to continue or not
    if (rollDice !== 1) {
      scoreTwo += rollDice;
      currentTwo.textContent = scoreTwo;
    }
    // if rolldice = 1, dont add anything to score, just switch to player 1
    else if (rollDice == 1) {
      scoreTwo = 0;
      currentTwo.textContent = scoreTwo;
      btnRoll.disabled = true;

      btnRoll.disabled = false;
      playerTwo.classList.remove("player--active");
      playerOne.classList.add("player--active");
      player = 0;
      if (playerTwoScore < 100) {
        playerTwoScore += scoreTwo;
        scorePlayerTwo.textContent = playerTwoScore;
        playerTwo.classList.remove("player--active");
        playerOne.classList.add("player--active");
        player = 0;
        scoreTwo = 0;
        currentTwo.textContent = scoreTwo;
      }

      // Player two greater than 100
      else if (playerTwoScore >= 100) {
        playerTwoName.textContent = `Computer wins the game`;
        dice.src = "trophy.png";
        scorePlayerTwo.textContent = playerTwoScore;
        playerTwo.classList.add("player--winner");
      }
    }
  }
});

//////////////
////////// if player One or Two Clicks btnhold
btnHold.addEventListener("click", function () {
  //   if player 1 wants fold and clicks the btnhld
  if (player == 0) {
    playerOneScore += scoreOne;
    if (playerOneScore < 100) {
      scorePlayerOne.textContent = playerOneScore;
      playerOne.classList.remove("player--active");
      playerTwo.classList.add("player--active");
      scoreOne = 0;
      currentOne.textContent = scoreOne;

      // !computer ? (player = 1) : (player = 2);
      if (computer == true) {
        // alert("h");
        player = 2;
        btnRoll.disabled = true;
        comPlay();
      } else if (computer == false) {
        player = 1;
        btnRoll.disabled = false;
      }
    } else {
      playerOneName.textContent = `${promptPlayerOne} wins the game`;
      scorePlayerOne.textContent = playerOneScore;
      playerOne.classList.add("player--winner");
      dice.src = "trophy.png";
    }
  }

  ///// Deals with player two clicking hold
  else {
    playerTwoScore += scoreTwo;
    if (playerTwoScore < 100) {
      scorePlayerTwo.textContent = playerTwoScore;
      playerTwo.classList.remove("player--active");
      playerOne.classList.add("player--active");
      player = 0;
      scoreTwo = 0;
      currentTwo.textContent = scoreTwo;
    }
    // Player two greater than 100 WINNING THE GAME
    else {
      playerTwoName = `${promptPlayerTwo} wins the game`;
      scorePlayerTwo = playerTwoScore;
      playerTwo.classList.add("player--winner");
      dice.src = "trophy.png";
    }
  }
});

document.querySelector(".btn--new").addEventListener("click", init);
