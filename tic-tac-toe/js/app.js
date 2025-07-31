const GameBoard = (function () {
  const board = ["", "", "", "", "", "", "", "", ""];
  const getBoard = () => board;
  const placeMarker = (index, mark) => {
    if (board[index] === "") {
      board[index] = mark;
      return true;
    }
    return false;
  };
  const resetBoard = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
  };
  const checkWin = () => {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // rows
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // cols
      [0, 4, 8],
      [2, 4, 6], // diags
    ];
    for (let pattern of winPatterns) {
      const [a, b, c] = pattern;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a]; // 'X' or 'O'
      }
    }
    return null;
  };
  const checkTie = () => {
    return board.every((cell) => cell !== "") && !checkWin();
  };
  return { getBoard, placeMarker, resetBoard, checkWin, checkTie };
})();

function Player(name, mark) {
  return { name, mark };
}

const GameController = (function () {
  let player1, player2, currentPlayer, gameOver;
  const start = (name1 = "Player 1", name2 = "Player 2") => {
    player1 = Player(name1, "X");
    player2 = Player(name2, "O");
    currentPlayer = player1;
    gameOver = false;
    GameBoard.resetBoard();
  };
  const playRound = (index) => {
    if (gameOver) {
      // console.log("The game has already ended please restart");
      return;
    }
    if (GameBoard.placeMarker(index, currentPlayer.mark)) {
      const winner = GameBoard.checkWin();
      if (winner) {
        gameOver = true;
        // console.log(`${currentPlayer.name} wins!`);
        return;
      }
      if (GameBoard.checkTie()) {
        gameOver = true;
        // console.log("It's a tie!");
        return;
      }
      currentPlayer = currentPlayer === player1 ? player2 : player1;
    } else {
      // console.log("Invalid move. Try again.");
    }
  };
  const getCurrentPlayer = () => currentPlayer;
  const isGameOver = () => gameOver;

  return { start, playRound, getCurrentPlayer, isGameOver };
})();

// GameController.start("Codekage", "Opponent");
// GameController.playRound(0);
// GameController.playRound(1);
// GameController.playRound(4);
// GameController.playRound(2);
// GameController.playRound(8);
// GameController.start();
const SoundManager = {
  click: new Howl({ src: ["sounds/click.mp3"], volume: 1.0 }),
  start: new Howl({ src: ["sounds/start.mp3"], volume: 1.0 }),
  win: new Howl({ src: ["sounds/win.mp3"], volume: 1.0 }),
  tie: new Howl({ src: ["sounds/tie.mp3"], volume: 1.0 }),
  reset: new Howl({ src: ["sounds/reset.mp3"], volume: 1.0 }),
};

const DisplayController = (function () {
  const firstPlayerName = document.getElementById("player1-name");
  const secondPlayerName = document.getElementById("player2-name");
  const startGameBtn = document.getElementById("start-btn");
  const restartGameBtn = document.getElementById("restart-btn");
  const gameStatus = document.getElementById("game-status");
  const gameboard = document.getElementById("game-board");
  const resultElement = document.getElementById("result");
  const turnIndicator = document.getElementById("turn-indicator");

  function renderBoard() {
    const board = GameBoard.getBoard();
    gameboard.innerHTML = "";
    board.forEach((cell, index) => {
      const cellDiv = document.createElement("div");
      cellDiv.classList.add("cell");
      cellDiv.textContent = cell;
      cellDiv.dataset.index = index;
      cellDiv.addEventListener("click", handleCellClick);
      gameboard.appendChild(cellDiv);
    });
  }

  function renderTurn() {
    if (GameController.isGameOver()) {
      turnIndicator.textContent = "";
      return;
    }
    const player = GameController.getCurrentPlayer();
    turnIndicator.textContent = `${player.name}(${player.mark}) is playing.`;
  }

  function renderResult() {
    const winner = GameBoard.checkWin();
    if (winner) {
      const name =
        winner === "X"
          ? firstPlayerName.value || "Player 1"
          : secondPlayerName.value || "Player 2";
      SoundManager.win.play();
      gameStatus.textContent = "The Game is over...";
      resultElement.textContent = `${name}(${winner}) is the winner 🎉`;
    } else if (GameBoard.checkTie()) {
      SoundManager.tie.play();
      gameStatus.textContent = "The Game is over...";
      resultElement.textContent = "It's a tie";
    } else {
      resultElement.textContent = "";
    }
  }

  function handleCellClick(e) {
    const index = Number(e.target.dataset.index);
    if (GameBoard.getBoard()[index] !== "" || GameController.isGameOver()) {
      return;
    }
    try {
      SoundManager.click.play();
    } catch (e) {
      console.log("Sound play error:", e);
    }

    GameController.playRound(index);
    renderBoard();
    renderResult();
    renderTurn();
  }

  function setInputsDisabled(disabled) {
    firstPlayerName.disabled = disabled;
    secondPlayerName.disabled = disabled;
  }

  function startGame() {
    const name1 = firstPlayerName.value;
    const name2 = secondPlayerName.value;
    SoundManager.start.play();
    gameStatus.textContent = "The Game has started...";
    GameController.start(name1, name2);
    renderBoard();
    renderResult();
    renderTurn();
    setInputsDisabled(true);
  }

  function restartGame() {
    setInputsDisabled(false);
    SoundManager.reset.play();
    GameBoard.resetBoard();
    gameStatus.textContent = "The Game was restarted";
    resultElement.textContent = "";
    turnIndicator.textContent = "";
    gameboard.innerHTML = "";
    renderBoard();
  }

  startGameBtn.addEventListener("click", startGame);
  restartGameBtn.addEventListener("click", restartGame);
  renderBoard();
  return {
    renderBoard,
    renderTurn,
    renderResult,
    handleCellClick,
    startGame,
    restartGame,
  };
})();
