const GameBoard = (function () {
  const board = Array(9).fill("");
  const getBoard = () => [...board];
  const placeMarker = (index, mark) => {
    if (board[index] === "") {
      board[index] = mark;
      return true;
    }
    return false;
  };
  const resetBoard = () => board.fill("");
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

const Player = (name, mark, isComputer = false) => ({ name, mark, isComputer });

const GameController = (function () {
  let player1,
    player2,
    currentPlayer,
    gameOver,
    mode = "pvp";

  const start = (
    name1 = "Player 1",
    name2 = "Player 2",
    selectedMode = "pvp"
  ) => {
    mode = selectedMode;
    player1 = Player(name1, "X");
    player2 = Player(
      name2 || (mode === "pvc" ? "Computer" : "Player 2"),
      "O",
      mode === "pvc"
    );
    currentPlayer = player1;
    gameOver = false;
    GameBoard.resetBoard();
  };

  const playRound = (index) => {
    if (gameOver || !GameBoard.placeMarker(index, currentPlayer.mark)) return;

    const winCheck = GameBoard.checkWin();
    if (winCheck) {
      gameOver = true;
      return { type: "win", player: currentPlayer, cells: winCheck.cells };
    }
    if (GameBoard.checkTie()) {
      gameOver = true;
      return { type: "tie" };
    }

    currentPlayer = currentPlayer === player1 ? player2 : player1;
    return { type: "continue" };
  };
  const getCurrentPlayer = () => currentPlayer;
  const isGameOver = () => gameOver;
  const getMode = () => mode;

  return { start, playRound, getCurrentPlayer, isGameOver, getMode };
})();

const SoundManager = {
  click: new Howl({ src: ["sounds/click.mp3"], volume: 1.0 }),
  start: new Howl({ src: ["sounds/start.mp3"], volume: 1.0 }),
  win: new Howl({ src: ["sounds/win.mp3"], volume: 1.0 }),
  tie: new Howl({ src: ["sounds/tie.mp3"], volume: 1.0 }),
  reset: new Howl({ src: ["sounds/reset.mp3"], volume: 1.0 }),
};

const DisplayController = (function () {
  const playerVsPlayer = document.getElementById("player-against-player-btn");
  const playerVsComputer = document.getElementById(
    "player-against-computer-btn"
  );
  const firstPlayerName = document.getElementById("player1-name");
  const secondPlayerName = document.getElementById("player2-name");
  const startGameBtn = document.getElementById("start-btn");
  const playAgainBtn = document.getElementById("replay-btn");
  const restartGameBtn = document.getElementById("restart-btn");
  const gameStatus = document.getElementById("game-status");
  const gameboard = document.getElementById("game-board");
  const resultElement = document.getElementById("result");
  const turnIndicator = document.getElementById("turn-indicator");
  const playerInput = document.getElementById("player-inputs");

  let selectedMode = "pvp";

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

  const renderResult = (status) => {
    if (!status) return;
    if (status.type === "win") {
      SoundManager.win.play();
      gameStatus.textContent = "The Game is over...";
      resultElement.textContent = `${status.player.name} (${status.player.mark}) wins 🎉`;
    } else if (status.type === "tie") {
      SoundManager.tie.play();
      gameStatus.textContent = "The Game is over...";
      resultElement.textContent = "It's a tie!";
    }
  };

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
    const result = GameController.playRound(index);
    renderBoard();
    renderTurn();
    renderResult(result);

    if (
      result?.type === "continue" &&
      GameController.getCurrentPlayer().isComputer
    ) {
      setTimeout(computerMove, 400);
    }
  }

  const computerMove = () => {
    const board = GameBoard.getBoard();
    const emptyIndices = board
      .map((v, i) => (v === "" ? i : null))
      .filter((i) => i !== null);
    const randomIndex =
      emptyIndices[Math.floor(Math.random() * emptyIndices.length)];

    SoundManager.click.play();
    const result = GameController.playRound(randomIndex);
    renderBoard();
    renderTurn();
    renderResult(result);
  };

  const setInputsDisabled = (disabled) => {
    firstPlayerName.disabled = disabled;
    secondPlayerName.disabled = disabled || selectedMode === "pvc";
  };
  const startGame = () => {
    SoundManager.start.play();
    const name1 = firstPlayerName.value || "Player 1";
    const name2 =
      selectedMode === "pvc"
        ? "Computer"
        : secondPlayerName.value || "Player 2";
    GameController.start(name1, name2, selectedMode);

    gameStatus.textContent = "The Game has started...";
    renderBoard();
    renderTurn();
    setInputsDisabled(true);
    resultElement.textContent = "";
  };

  const playAgain = () => {
    SoundManager.reset.play();
    GameBoard.resetBoard();
    gameStatus.textContent = "Play Again!";
    renderBoard();
    renderTurn();
    resultElement.textContent = "";
  };

  function restartGame() {
    setInputsDisabled(false);
    try {
      SoundManager.reset.play();
    } catch (e) {
      console.log("Sound play error:", e);
    }
    GameBoard.resetBoard();
    playerInput.style.display = "none";
    firstPlayerName.value = "";
    secondPlayerName.value = "";
    gameStatus.textContent = "The Game was restarted";
    resultElement.textContent = "";
    turnIndicator.textContent = "";
    gameboard.innerHTML = "";
    renderBoard();
  }
  playerVsPlayer.addEventListener("click", () => {
    selectedMode = "pvp";
    playerInput.style.display = "block";
    playerInput.style.paddingTop = 20 + "px";
  });
  playerVsComputer.addEventListener("click", () => {
    selectedMode = "pvc";
    playerInput.style.display = "block";
    secondPlayerName.value = "Computer";
  });

  startGameBtn.addEventListener("click", startGame);
  playAgainBtn.addEventListener("click", playAgain);
  restartGameBtn.addEventListener("click", restartGame);

  renderBoard();
})();
