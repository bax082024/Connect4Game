const rows = 6;
const cols = 7;
let board = [];
let currentPlayer = 'red';
let gameMode = 'pvp'; // Default game mode is Player vs Player

// Initialize the game board
const createBoard = () => {
  const boardDiv = document.getElementById('board');
  boardDiv.innerHTML = '';
  board = Array(rows).fill(null).map(() => Array(cols).fill(null));

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.addEventListener('click', handleClick); 
      boardDiv.appendChild(cell);
    }
  }

  updateStatus();
};

// Handle player's move
const handleClick = (e) => {
  const col = parseInt(e.target.dataset.col);

  for (let row = rows - 1; row >= 0; row--) {
    if (!board[row][col]) {
      board[row][col] = currentPlayer;
      const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
      cell.classList.add(currentPlayer);

      if (checkWin(row, col)) {
        document.getElementById('winnerMessage').textContent = `${currentPlayer.toUpperCase()} Wins!`;  
        return;
      }

      currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
      updateStatus();

      // If in PvC mode, let the computer make a move
      if (gameMode === 'pvc' && currentPlayer === 'yellow') {
        setTimeout(computerMove, 500); // Delay the computer move slightly
      }

      return;
    }
  }
};

// Computer's move (simple AI)
const computerMove = () => {
  let col;
  let row;

  do {
    col = Math.floor(Math.random() * cols);
    row = rows - 1;
    while (row >= 0 && board[row][col]) {
      row--;
    }
  } while (row < 0);

  board[row][col] = 'yellow';
  const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
  cell.classList.add('yellow');

  if (checkWin(row, col)) {
    document.getElementById('winnerMessage').textContent = 'YELLOW Wins!';
    return;
  }

  currentPlayer = 'red';
  updateStatus();
};

// Check for win conditions
const checkWin = (row, col) => {
  return checkDirection(row, col, 1, 0) ||  // Horizontal
         checkDirection(row, col, 0, 1) ||  // Vertical
         checkDirection(row, col, 1, 1) ||  // Diagonal (down-right)
         checkDirection(row, col, 1, -1);   // Diagonal (up-right)
};

const checkDirection = (row, col, rowIncrement, colIncrement) => {
  let count = 1;
  count += countCells(row, col, rowIncrement, colIncrement);   // Forward
  count += countCells(row, col, -rowIncrement, -colIncrement); // Backward
  return count >= 4;
};

const countCells = (row, col, rowIncrement, colIncrement) => {
  let count = 0;
  let r = row + rowIncrement;
  let c = col + colIncrement;
  while (r >= 0 && r < rows && c >= 0 && c < cols && board[r][c] === currentPlayer) {
    count++;
    r += rowIncrement;
    c += colIncrement;
  }
  return count;
};

// Update status text and game mode status
const updateStatus = () => {
  const statusDiv = document.getElementById('status');
  const gameModeStatusDiv = document.getElementById('gameModeStatus');
  
  if (gameMode === 'pvc') {
    statusDiv.textContent = `${currentPlayer.toUpperCase()}'s turn (${currentPlayer === 'red' ? 'Player' : 'Computer'})`;
    gameModeStatusDiv.textContent = 'Current Mode: Player vs Computer';
  } else {
    statusDiv.textContent = `${currentPlayer.toUpperCase()}'s turn`;
    gameModeStatusDiv.textContent = 'Current Mode: Player vs Player';
  }
};

// Reset the game
document.getElementById('resetButton').addEventListener('click', () => {
  resetGame();
});

const resetGame = () => {
  setTimeout(() => {
    createBoard();
    document.getElementById('winnerMessage').textContent = '';  
    currentPlayer = 'red';
  }, 500);
};

// Handle game mode button clicks
document.getElementById('pvpButton').addEventListener('click', () => {
  gameMode = 'pvp';
  resetGame();
  // Update active button state
  document.getElementById('pvpButton').classList.add('active-mode');
  document.getElementById('pvcButton').classList.remove('active-mode');
});

document.getElementById('pvcButton').addEventListener('click', () => {
  gameMode = 'pvc';
  resetGame();
  // Update active button state
  document.getElementById('pvcButton').classList.add('active-mode');
  document.getElementById('pvpButton').classList.remove('active-mode');
});

// Initialize the game
createBoard();
