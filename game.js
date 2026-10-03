function closePopup() {
  document.getElementById("popup-get-information").style.display = "none";
  var n = document.getElementById("name-input").value.trim();
  let pname = document.getElementById("name");
  if (n === "") {
    n = "guest";
    console.log(n);
  } else {
    document.getElementById("name-input").value = n;
    console.log(n);
  }

  if (n === "carmal" || n === "Carmal vibirsha" || n === "Carmal" ||n === "GARMAL") {
    document.getElementById("name-input").style.color = "green";
    alert("Welcome Carmal. Thank you for using my game my dear friendyyyyy.");
    console.log(n);
    pname.style.color = "rgb(144, 238, 144)";
    pname.textContent = "Name: " + n + " the best friend 😔🦋";
    pname.style.fontSize = "12px";
  } else if (n.length > 12) {
    let firstPart = n.substring(0, 12);
    let secondPart = n.substring(12);
    pname.innerHTML = "Name: " + firstPart + secondPart;
    pname.style.fontSize = "14px";
  } else if (n.length > 9) {
    pname.style.fontSize = "14px";
    pname.textContent = "Name: " + n;
  } else {
    pname.textContent = "Name: " + n;
    pname.style.fontSize = "16px"; // reset normal
  }
 startGame();
}
// --- Tic Tac Toe Game Logic ---

let cells = [];
let gameActive = true;
let timeLeft = 30;
let timerInterval = null;

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function startTimer() {
  stopTimer();
  const timerValue = document.getElementById("time-remaining");
  const timeeee=document.getElementById("timer-box")
  if (!timerValue) return;

  timeLeft = 30;
  timerValue.textContent = timeLeft;

  timerInterval = setInterval(() => {
    if (!gameActive) {
      stopTimer();
      return;
    }

    timeLeft -= 1;
    timerValue.textContent = Math.max(0, timeLeft);

    if (timeLeft <= 0) {
      stopTimer();
      gameActive = false;
      timeleftmessage();
    }
    if (timeLeft < 15) {
        timerValue.style.color = "red";
        timeeee.style.color="red";
      }
  }, 1000);
}
function timeleftmessage(){
    let pop=document.getElementById("time-left-pop");
    pop.style.height="40%";
    pop.style.top="50%";
    pop.style.left="50%";
    pop.style.padding="10%";
    pop.style.position="fixed";
    pop.style.zIndex="1";
    pop.style.transform="translate(-50%, -50%)";
    pop.style.fontWeight="900";
    pop.style.borderRadius="10px";
    pop.style.boxShadow = "inset 0 0 10px rgba(0,0,0,0.7)";
    pop.style.background = "linear-gradient(135deg, #1e3c72, #2a5298)";
    pop.textContent="TIME out";
    pop.style.color="#39ff14";
}

// Create board dynamically
function createBoard() {
  const board = document.querySelector(".board");
  board.innerHTML = "";
  cells = [];

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.addEventListener("click", () => playerMove(i));
    board.appendChild(cell);
    cells.push(cell);
  }

  document.getElementById("name").textContent;
  let s=document.getElementById("turn");
  s.textContent="You are x";
  s.style.position="fixed";
  s.style.top="85%";
  s.style.left="50%";
  s.style.transform= "translate(-50%, -50%)";
  startTimer();
}

// Player move
function playerMove(index) {
  if (!gameActive || cells[index].textContent !== "") return;
  cells[index].textContent = "✖️";

  if (checkWin("✖️")) {
    alert("🎉 You win!");
    win();
    const sound = document.getElementById('winnerSound');
    sound.currentTime = 0;
    sound.play().catch(() => {});
    gameActive = false;
    stopTimer();
    return;
  }

  if (isDraw()) {
  alert("It's a draw!");
  gameActive = false;
  stopTimer();

  // Restart the game after short delay
  setTimeout(() => {
    startGame();
    gameActive = true;
  }, 1500); // waits 1.5 seconds before restarting
  return;
}

  setTimeout(computerMove, 500); // computer plays after short delay
}
// Computer move (smart logic)
function computerMove() {
  if (!gameActive) return;

  // 1. Try to win if possible
  let winIndex = findBestMove("😊");
  if (winIndex !== null) {
    cells[winIndex].textContent = "😊";
    if (checkWin("😊")) {
      alert("you out,Practice makes perfect.");
      out();
      let winSound = document.getElementById("win-sound");
      winSound.play();
      gameActive = false;
      stopTimer();
    }
    return;
  }

  // 2. Block player if they are about to win
  let blockIndex = findBestMove("✖️");
  if (blockIndex !== null) {
    cells[blockIndex].textContent = "😊";
    return;
  }

  // 3. Otherwise, pick center if free
  if (cells[4].textContent === "") {
    cells[4].textContent = "😊";
    return;
  }

  // 4. Otherwise, pick a corner if free
  let corners = [0, 2, 6, 8];
  let freeCorners = corners.filter(i => cells[i].textContent === "");
  if (freeCorners.length > 0) {
    cells[freeCorners[Math.floor(Math.random() * freeCorners.length)]].textContent = "😊";
    return;
  }

  // 5. Otherwise, random move
  let emptyIndices = cells
    .map((cell, i) => cell.textContent === "" ? i : null)
    .filter(i => i !== null);

  if (emptyIndices.length > 0) {
    let choice = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    cells[choice].textContent = "😊";
  }
}

// Helper: find winning/blocking move
function findBestMove(player) {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // columns
    [0,4,8],[2,4,6]          // diagonals
  ];

  for (let pattern of winPatterns) {
    const [a,b,c] = pattern;
    let values = [cells[a].textContent, cells[b].textContent, cells[c].textContent];
    if (values.filter(v => v === player).length === 2 &&
        values.includes("")) {
      return pattern[values.indexOf("")]; // return empty spot
    }
  }
  return null;
}
  
function win(){
  let w=document.getElementById("win");
  w.style.transform="translate(-50%, -50%)";
  w.style.position="fixed";
  w.style.top="50%";
  w.style.left="50%";
  w.style.zIndex="10";
  w.style.width="auto";
  w.style.height="auto";
  w.style.padding="20px";
  w.style.borderRadius="20px";
  w.style.fontWeight="900";
  w.style.boxShadow="0 6px 15px rgba(0,0,0,0.4),0 0 10px rgba(79,172,254,0.6)";
  w.style.background="linear-gradient(135deg, #ffcc00, #ff9900)";
  w.textContent="You win,life is also a game play like this.";
}
function out(){
  let w=document.getElementById("win");
  w.style.transform="translate(-50%, -50%)";
  w.style.position="fixed";
  w.style.top="50%";
  w.style.left="50%";
  w.style.zIndex="10";
  w.style.width="auto";
  w.style.height="auto";
  w.style.padding="20px";
  w.style.borderRadius="20px";
  w.style.fontWeight="900";
  w.style.boxShadow="0 6px 15px rgba(0,0,0,0.4),0 0 10px rgba(79,172,254,0.6)";
  w.style.background="linear-gradient(135deg, #ffcc00, #ff9900)";
  w.textContent="out,Failure is the first step to success.";
  let winSound = document.getElementById("win-sound");
  winSound.play();
}

// Check win
function checkWin(player) {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // columns
    [0,4,8],[2,4,6]          // diagonals
  ];
  return winPatterns.some(pattern => {
    const [a,b,c] = pattern;
    return cells[a].textContent === player &&
           cells[b].textContent === player &&
           cells[c].textContent === player;
  });
}

// Check draw
function isDraw() {
  return cells.every(cell => cell.textContent !== "");
}

// Start game after popup closes
function startGame() {
  document.getElementById("board").style.visibility= "visible";
  createBoard();
}
