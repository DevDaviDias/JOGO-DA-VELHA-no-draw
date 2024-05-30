document.addEventListener("DOMContentLoaded", () => {
    const boardElement = document.getElementById("board");
    const messageElement = document.getElementById("message");
    const resetButton = document.getElementById("reset");
    let board = Array(9).fill(null);
    let currentPlayer = "X";
    let gameActive = true;

    function renderBoard() {
        boardElement.innerHTML = "";
        board.forEach((cell, index) => {
            const cellElement = document.createElement("div");
            cellElement.classList.add("cell");
            if (cell) {
                cellElement.classList.add("taken");
                cellElement.textContent = cell;
            }
            cellElement.addEventListener("click", () => handleCellClick(index));
            boardElement.appendChild(cellElement);
        });
    }

    function handleCellClick(index) {
        if (board[index] || !gameActive) return;
        board[index] = currentPlayer;
        renderBoard();
        if (checkWin()) {
            gameActive = false;
            messageElement.textContent = `${currentPlayer} Ganhou!`;
        } else if (board.every(cell => cell)) {
            undoRandomMove();
            messageElement.textContent = "É um empate! Dois movimentos aleatórios foram desfeito.";
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    }

    function checkWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], 
            [0, 3, 6], [1, 4, 7], [2, 5, 8], 
            [0, 4, 8], [2, 4, 6]
        ];
        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return board[a] && board[a] === board[b] && board[a] === board[c];
        });
    }

function undoRandomMove() {
    const filledCells = board.map((cell, index) => cell ? index : null).filter(index => index !== null);
    if (filledCells.length < 2) return; // Retorna se houver menos de duas células preenchidas
    const randomIndices = [];
    for (let i = 0; i < 2; i++) {
        const randomIndex = filledCells.splice(Math.floor(Math.random() * filledCells.length), 1)[0];
        board[randomIndex] = ""; // Limpa a célula
        randomIndices.push(randomIndex);
    }
    currentPlayer = currentPlayer === "X" ? "O" : "X"; // Alterna o jogador atual
    renderBoard();
    return randomIndices; // Retorna os índices das células desfeitas
}



    resetButton.addEventListener("click", () => {
        board = Array(9).fill(null);
        currentPlayer = "X";
        gameActive = true;
        messageElement.textContent = "";
        renderBoard();
    });

    renderBoard();
});



