const handButtons = document.body.getElementsByClassName("handsButton");
const svg_playerHand = document.getElementById("punho_1");
const svg_computerHand = document.getElementById("punho_2");

const playerScore = document.getElementById("playerScore");
const computerScore = document.getElementById("computerScore");

const hands = ["rock", "paper", "scissors"];
const animation = [
  "animateHandsCounting",
  "animateHandsThrowing",
  "returnToPlace",
  "animateHandsCountingComputer",
  "animateHandsThrowingComputer",
  "returnToPlaceComputer",
];

var playerHand;
var computerHand;

var int_playerScore = 0;
var int_computerScore = 0;

/*==============================FUNCTIONS===============================*/

Start();

int_playerScore = 0;
int_computerScore = 0;

function Start() {
  playerHand = 0;
  computerHand = 0;
  //start page
  setSvg(svg_playerHand, 0);
  setSvg(svg_computerHand, 0);

  disableButtons(false);
  removeClasses();
  //waiting for player input...
}

function getInput(id) {
  playerHand = id;
  computerHand = Math.floor(Math.random() * 3);

  triggerAnimationChain();
  disableButtons(true);
}

function disableButtons(bool) {
  for (let i = 0; i < handButtons.length; i++) {
    handButtons[i].disabled = bool;
  }
}

function setSvg(spriteToChange, index) {
  spriteToChange.classList.add(hands[index]);
}

/*==============================ANIMATIONS==============================*/

function triggerAnimationChain() {
  animation_Counting();
  setTimeout(() => {
    animation_Throwing();
    setTimeout(() => {
      removeClasses();
      animation_Backing();
    }, 1500);
  }, 1200);
}

function animate(animationIndex) {
  svg_playerHand.classList.add(animation[animationIndex]);
  svg_computerHand.classList.add(animation[animationIndex + 3]);
}

function animation_Counting() {
  animate(0);
}
function animation_Throwing() {
  setSvg(svg_playerHand, playerHand);
  setSvg(svg_computerHand, computerHand);
  animate(1);
}

function removeClasses() {
  for (let i = svg_playerHand.classList.length; i > 1; i--) {
    if (svg_playerHand.classList.item(i) != "rock") {
      svg_playerHand.classList.remove(svg_playerHand.classList.item(i - 1));
    }
  }
  for (let j = svg_computerHand.classList.length; j > 1; j--) {
    if (svg_computerHand.classList.item(j) != "rock") {
      svg_computerHand.classList.remove(svg_computerHand.classList.item(j - 1));
    }
  }
}

function animation_Backing() {
  animate(2);
  checkWinner();
  setTimeout(() => {
    Start();
  }, 1000);
}

function checkWinner() {
  if (
    (playerHand == 0 && computerHand == 2) ||
    (playerHand == 1 && computerHand == 0) ||
    (playerHand == 2 && computerHand == 1)
  ) {
    popScore(playerScore);
    addScore(playerScore, true);
  } else if (playerHand == computerHand) {
  } else {
    addScore(computerScore, false);
    popScore(computerScore);
  }
}

function addScore(side, isPlayer) {
  if (isPlayer) {
    int_playerScore += 1;
    side.textContent = parseInt(int_playerScore);
  } else {
    int_computerScore += 1;
    side.textContent = parseInt(int_computerScore);
  }
}

function popScore(side) {
  side.classList.add("popScore");
  setTimeout(() => {
    side.classList.remove("popScore");
  }, 600);
}
