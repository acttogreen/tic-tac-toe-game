let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];

function createBoard() {
    const board = document.getElementById('game-board');
    board.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', () => handleMove(i));
        board.appendChild(cell);
    }
    updatePlayerTurn();
}

function handleMove(index) {
    if (gameBoard[index] === '') {
        gameBoard[index] = currentPlayer;
        document.querySelectorAll('.cell')[index].textContent = currentPlayer;
        if (checkWin()) {
            alert(`${currentPlayer} wins!`);
            resetBoard();
        } else if (gameBoard.every(cell => cell !== '')) {
            alert('Draw!');
            resetBoard();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            updatePlayerTurn();
        }
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winPatterns.some(pattern => {
        const [a, b, c] = pattern;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

function resetBoard() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    createBoard();
}

function updatePlayerTurn() {
    const playerTurnDiv = document.getElementById('player-turn');
    playerTurnDiv.textContent = `Player ${currentPlayer}'s turn`;
}

createBoard();
