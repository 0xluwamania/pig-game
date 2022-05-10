"use strict";
let player = 0;
let playerTwo = document.querySelector(".player--1");
let scoreOne = 0;
let scoreTwo = 0;
let playerOneScore = 0;
let playerTwoScore = 0;
let rollDice;
let playerOne = document.querySelector(".player--0");
document.querySelector(".dice").classList.add("hidden");
let promptPlayerOne = prompt("Player 1, Whats your name ?");
let promptPlayerTwo = prompt("Player 2, Whats your name ?");

document.querySelector("#name--0").textContent = promptPlayerOne;
document.querySelector("#name--1").textContent = promptPlayerTwo;

// dice is rolled and switch cases to change the dice shown
let diceRoll = function () {
  rollDice = Math.trunc(Math.random() * 6) + 1;
  switch (rollDice) {
    case 1:
      document.querySelector(".dice").src = "dice-1.png";
      break;
    case 2:
      document.querySelector(".dice").src = "dice-2.png";
      break;
    case 3:
      document.querySelector(".dice").src = "dice-3.png";
      break;
    case 4:
      document.querySelector(".dice").src = "dice-4.png";
      break;
    case 5:
      document.querySelector(".dice").src = "dice-5.png";
      break;
    case 6:
      document.querySelector(".dice").src = "dice-6.png";
      break;
    default:
      document.querySelector(".dice").src = "";
  }
};

// When the roll dice button is clicked
document.querySelector(".btn--roll").addEventListener("click", function () {
  document.querySelector(".dice").classList.remove("hidden");
  // dice roll function is performed with switch cases for images
  diceRoll();

  //   if player is first player
  if (player == 0) {
    // if score < 100

    // when dice not equal to 1 add score and check if player wants to continue or not
    if (rollDice !== 1) {
      // make score = rolled dice value and display same
      scoreOne += rollDice;
      document.querySelector("#current--0").textContent = scoreOne;
      //   if player 1 wants fold and cash out his game
      document
        .querySelector(".btn--hold")
        .addEventListener("click", function () {
          if (playerOneScore < 100) {
            playerOneScore += scoreOne;
            document.querySelector("#score--0").textContent = playerOneScore;
            playerOne.classList.remove("player--active");
            playerTwo.classList.add("player--active");
            player = 1;
            scoreOne = 0;
            document.querySelector("#current--0").textContent = scoreOne;
          } else if (playerOneScore >= 100) {
            document.querySelector(
              "#name--0"
            ).textContent = `${promptPlayerOne} wins the game`;
            document.querySelector("#score--0").textContent = playerOneScore;
            playerOne.classList.add("player--winner");
          }
        });
    }
    // if rolldice = 1, dont add anything to score, just switch to player 2
    else {
      playerOne.classList.remove("player--active");
      playerTwo.classList.add("player--active");
      player = 1;
      scoreOne = 0;
      document.querySelector("#current--0").textContent = scoreOne;
    }
  }

  //   player 2 turn
  else if (player == 1) {
    // when dice not equal to 1 add score and check if player wants to continue or not
    if (rollDice !== 1) {
      scoreTwo += rollDice;
      document.querySelector("#current--1").textContent = scoreTwo;

      document
        .querySelector(".btn--hold")
        .addEventListener("click", function () {
          if (playerTwoScore < 100) {
            playerTwoScore += scoreTwo;
            document.querySelector("#score--1").textContent = playerTwoScore;
            playerTwo.classList.remove("player--active");
            playerOne.classList.add("player--active");
            player = 0;
            scoreTwo = 0;
            document.querySelector("#current--1").textContent = scoreTwo;
          }

          // Player two greater than 100
          else if (playerTwoScore >= 100) {
            document.querySelector(
              "#name--1"
            ).textContent = `${promptPlayerTwo} wins the game`;
            document.querySelector("#score--1").textContent = playerTwoScore;
            playerTwo.classList.add("player--winner");
          }
        });
    }
    // if rolldice = 1, dont add anything to score, just switch to player 1
    else {
      playerTwo.classList.remove("player--active");
      playerOne.classList.add("player--active");
      player = 0;
      scoreTwo = 0;
      document.querySelector("#current--1").textContent = scoreOne;
    }
  }
});

document.querySelector(".btn--new").addEventListener("click", function () {
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
  document.querySelector(".dice").classList.add("hidden");
  playerOne.classList.remove("player--winner");
  playerTwo.classList.remove("player--winner");
  document.querySelector("#name--0").textContent = promptPlayerOne;
  document.querySelector("#name--1").textContent = promptPlayerTwo;
});
