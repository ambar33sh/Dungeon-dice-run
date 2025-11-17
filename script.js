// Dungeon Dice Run – simple browser implementation

const boardElement = document.getElementById("board");
const posSpan = document.getElementById("pos");
const heartsSpan = document.getElementById("hearts");
const treasureSpan = document.getElementById("treasure");
const statusSpan = document.getElementById("status");
const diceValuesSpan = document.getElementById("diceValues");

const rollBtn = document.getElementById("rollBtn");
const lowerBtn = document.getElementById("lowerBtn");
const higherBtn = document.getElementById("higherBtn");
const resetBtn = document.getElementById("resetBtn");

const boardSize = 30;

// Types: start, exit, treasure, trap, monster, potion, empty
const board = Array(boardSize + 1).fill("empty");
board[1] = "start";
board[30] = "exit";

[2, 6, 9, 14, 17, 21, 26, 29].forEach(i => (board[i] = "treasure"));
[4, 7, 12, 18, 24, 28].forEach(i => (board[i] = "trap"));
[5, 13, 19, 25].forEach(i => (board[i] = "monster"));
[10, 20].forEach(i => (board[i] = "potion"));

let position, hearts, treasure, die1, die2, gameOver;

function initBoard() {
  boardElement.innerHTML = "";
  for (let i = 1; i <= boardSize; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.classList.add(board[i]);

    const indexSpan = document.createElement("span");
    indexSpan.classList.add("index");
    indexSpan.textContent = i;
    cell.appendChild(indexSpan);

    const label = document.createElement("span");
    if (board[i] === "start") label.textContent = "START";
    else if (board[i] === "exit") label.textContent = "EXIT";
    else if (board[i] === "treasure") label.textContent = "💰";
    else if (board[i] === "trap") label.textContent = "☠";
    else if (board[i] === "monster") label.textContent = "👹";
    else if (board[i] === "potion") label.textContent = "🧪";
    cell.appendChild(label);

    boardElement.appendChild(cell);
  }
}

function updateBoardHighlight() {
  const cells = boardElement.querySelectorAll(".cell");
  cells.forEach((c, idx) => {
    c.classList.remove("player");
    if (idx + 1 === position) {
      c.classList.add("player");
    }
  });
}

function updateStats() {
  posSpan.textContent = position;
  heartsSpan.textContent = hearts;
  treasureSpan.textContent = treasure;
}

function setButtons(rollEnabled, choiceEnabled) {
  rollBtn.disabled = !rollEnabled;
  lowerBtn.disabled = !choiceEnabled;
  higherBtn.disabled = !choiceEnabled;
}

function startGame() {
  position = 1;
  hearts = 5;
  treasure = 0;
  gameOver = false;
  diceValuesSpan.textContent = "-";
  statusSpan.textContent = "You enter the catacombs. Roll the dice to begin.";
  updateStats();
  updateBoardHighlight();
  setButtons(true, false);
}

function rollDice() {
  if (gameOver) return;
  die1 = Math.ceil(Math.random() * 6);
  die2 = Math.ceil(Math.random() * 6);
  diceValuesSpan.textContent = `${die1} and ${die2}`;
  statusSpan.textContent = "Choose to move by the lower or higher die.";
  setButtons(false, true);
}

function moveBy(choice) {
  if (gameOver) return;
  const lower = Math.min(die1, die2);
  const higher = Math.max(die1, die2);
  const step = choice === "lower" ? lower : higher;

  position += step;
  if (position > boardSize) position = boardSize;
  applyTileEffect();
  updateStats();
  updateBoardHighlight();

  if (!gameOver) {
    setButtons(true, false);
  }
}

function applyTileEffect() {
  const tile = board[position];
  let message = `You move to space ${position}. `;

  switch (tile) {
    case "treasure":
      treasure += 1;
      message += "You found an ancient treasure! (+1 💰)";
      break;
    case "trap":
      hearts -= 1;
      message += "A hidden trap injures you! (-1 ❤️)";
      break;
    case "monster":
      const roll = Math.ceil(Math.random() * 6);
      if (roll <= 3) {
        hearts -= 1;
        message += `A monster attacks! You rolled ${roll}. (-1 ❤️)`;
      } else {
        treasure += 1;
        message += `You slay the monster! You rolled ${roll}. (+1 💰)`;
      }
      break;
    case "potion":
      if (hearts < 5) {
        hearts += 1;
        message += "You find a glowing potion and regain 1 Heart!";
      } else {
        message += "You find a potion but you're already at full health.";
      }
      break;
    case "exit":
      message += "You reach the exit of the catacombs!";
      break;
    default:
      message += "The corridor is eerily quiet...";
  }

  if (hearts <= 0) {
    message += " Your hearts drop to zero. You perish in the darkness.";
    endGame(false);
  } else if (position === boardSize) {
    message += ` You escape with ${treasure} treasure!`;
    endGame(true);
  }

  statusSpan.textContent = message;
}

function endGame(won) {
  gameOver = true;
  setButtons(false, false);
  if (won) {
    if (treasure >= 5) {
      statusSpan.textContent += " Epic victory! You break the curse of Vorthan.";
    } else if (treasure >= 1) {
      statusSpan.textContent += " You survive with modest loot.";
    } else {
      statusSpan.textContent += " You escape, but with empty hands.";
    }
  } else {
    statusSpan.textContent += " The catacombs claim another soul.";
  }
}

rollBtn.addEventListener("click", rollDice);
lowerBtn.addEventListener("click", () => moveBy("lower"));
higherBtn.addEventListener("click", () => moveBy("higher"));
resetBtn.addEventListener("click", startGame);

initBoard();
startGame();
