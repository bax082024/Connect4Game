const rows = 6;
const cols = 7;
let board = [];
let currentPlayer = 'red';
let gameMode = 'pvp';

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
      cell.addEventListener('click', handleClick); 
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

      
      if (checkWin(row, col)) {
        document.getElementById('winnerMessage').textContent = `${currentPlayer.toUpperCase()} Wins!`;  
        return;  
      }

      currentPlayer = currentPlayer === 'red' ? 'yellow' : 'red';  
      updateStatus();  
      return;
    }
  }
};

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






const checkWin = (row, col) => {
  return checkDirection(row, col, 1, 0) ||  
         checkDirection(row, col, 0, 1) ||  
         checkDirection(row, col, 1, 1) ||  
         checkDirection(row, col, 1, -1);   
};

const checkDirection = (row, col, rowIncrement, colIncrement) => {
  let count = 1;
  count += countCells(row, col, rowIncrement, colIncrement);   
  count += countCells(row, col, -rowIncrement, -colIncrement); 
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


createBoard();
