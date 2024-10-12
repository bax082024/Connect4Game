const rows = 6;
const cols = 7;
let board = [];
let currentPlayer = 'red'

const createBoard = () => {
  const boardDiv = document.getElementById('board');
  boardDiv.innerHTML = '';
  board = Array(rows).fill(null).map(() => Array(cols).fill(null));
}
