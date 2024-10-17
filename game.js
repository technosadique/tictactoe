const board = document.getElementById('board');
const restartButton = document.getElementById('restart');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(clickedCell, clickedCellIndex) {
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    clickedCell.classList.add(currentPlayer.toLowerCase());
    checkResult();
}

function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] === "" || gameState[b] === "" || gameState[c] === "") {
            continue;
        }
        if (gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        gameActive = false;
        alert(`Player ${currentPlayer} wins!`);
        return;
    }

    if (!gameState.includes("")) {
        alert("It's a draw!");
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function createBoard() {
    gameState = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    board.innerHTML = '';

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', () => handleCellClick(cell, i));
        board.appendChild(cell);
    }
}

restartButton.addEventListener('click', createBoard);

createBoard();
