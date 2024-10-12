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
}

