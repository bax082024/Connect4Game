const rows = 6;
const cols = 7;
let board = [];
let currentPlayer = 'red';

console.log("Connect 4 game loaded");

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
      cell.addEventListener('click', handleClick);  // Fixed typo
      boardDiv.appendChild(cell);
    }
  }

  updateStatus();
};

const handleClick = (e) => {
  const col = parseInt(e.target.dataset.col);

  for (let row = rows - 1; row >= 0; row--) {
    if (!board[row][col]) {
      board[row][col] = currentPlayer;
      const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
      cell.classList.add(currentPlayer);

      // Check for a win
      if (checkWin(row, col)) {
        document.getElementById('winnerMessage').textContent = `${currentPlayer.toUpperCase()} Wins!`;  // Show the winner
        return;  // Stop further actions after a win
      }

      currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';  // Switch players
      updateStatus();  // Update the status message
      return;
    }
  }
};

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

const updateStatus = () => {
  const statusDiv = document.getElementById('status');
  statusDiv.textContent = `${currentPlayer.toUpperCase()}'s turn`;
};

const resetGame = () => {
  setTimeout(() => {
    createBoard();
    document.getElementById('winnerMessage').textContent = '';  // Clear win message
    currentPlayer = 'red';
  }, 500);
};

// Call createBoard to initialize the game
createBoard();
