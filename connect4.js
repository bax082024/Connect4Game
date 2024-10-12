const rows = 6;
const cols = 7;
let board = [];
let currentPlayer = 'red'

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
      cell-addEventListener('click', handleClick);
      boardDiv.appendChild(cell);
    }
  }

  updateStatus();
};

const hancleClick = (e) => {
  const col = parseInt(e.target.dataset.col);
  for (let row = rows - 1; row >= 0; row --) {
    if (!board[row][col]) {
      board[row][col] = currentPlayer;
      const cell = document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`);
      cell.classList.add(currentPlayer);
      if (checkWin(row, col)) {
        setTimeout(() => alert(`${currentPlayer.toUpperCase()} Wins!`), 100);
        resetGame();
        return;
      }
      currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';
      updateStatus();
      return;
    }
  }
};

const checkWin = (row, col) => {
  return checkDirection(row, col, 1, 0) ||
         checkDirection(row, col, 0, 1) ||
         checkDirection(row, col, 1, 1) ||
         checkDirection(row, col, 1, -1); 

};

const checkDirection = (row, col, rowIncrement, colIncrement) => {
  let count = 1;
  count += countCells(row, col, rowIncrement, colIncrement);
  count += countCells(row, col, rowIncrement, colIncrement);
  return count >= 4;
}

const countCells = (row, col, rowIncrement, colIncrement) => {
  let count = 0;
  let r = row + rowIncrement;
  let c = col + colIncrement;
  while (r >= 0 && c >= 0 && c < cols && board[r][c] === currentPlayer) {
    count++;
    r += rowIncrement;
    c += colIncrement;
  }
  return count;
};


