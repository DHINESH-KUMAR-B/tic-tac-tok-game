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

  if (n === "carmal" || n === "Carmal vibirsha" || n === "Carmal" ||n === "GARMAL" || n === "Aroan" || n === "aroan") {
    document.getElementById("name-input").style.color = "green";
    alert("Welcome Carmal. Thank you for using my game my dear friendyyyyy.");
    console.log(n);
    pname.style.color = "rgb(144, 238, 144)";
    pname.textContent = "Name: " + n + " the best friend 😔🦋";
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
    pop.style.height="30%";
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
    pop.textContent="💪நேரம்💪 முடிந்தாலும், உன் முயற்சி முடிவதில்லை!.\n Timeout என்பது ஒரு இடைவேளை… வெற்றி இன்னும் காத்திருக்கிறது!🔥🔥🔥🔥";
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
  s.style.top="79%";
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
    gameActive = false;
    stopTimer();
    return;
  }

  if (isDraw()) {
    alert("It's a draw!");
    gameActive = false;
    stopTimer();
    return;
  }

  setTimeout(computerMove, 500); // computer plays after short delay
}

// Computer move (basic random logic)
function computerMove() {
  if (!gameActive) return;

  let emptyIndices = cells
    .map((cell, i) => cell.textContent === "" ? i : null)
    .filter(i => i !== null);

  if (emptyIndices.length === 0) return;

  let choice = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  cells[choice].textContent = "😊";

  if (checkWin("😊")) {
    alert("🤖 Computer wins!");
    gameActive = false;
    stopTimer();
    return;
  }

  if (isDraw()) {
    alert("It's a draw!");
    gameActive = false;
    stopTimer();
    return;
  }
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
  w.textContent="சக்ஸஸ்ஸு! இனிமேல் யாருமே என்னை ஜெயிக்க முடியாது! 🏆🏆🏆🏆";
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
  w.textContent="ஏய், செத்த பையலே, நாரப் பையலே! ஒழுங்கா விளையாடுடா, அசிங்கப்படுத்திட்ட இல்ல!";
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
  createBoard();
}
