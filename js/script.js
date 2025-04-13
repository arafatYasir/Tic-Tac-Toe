const board = document.querySelector(".board");
const resetBtn = document.querySelector(".reset-btn");
let player = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;


resetBtn.addEventListener("click", resetGame);

function displayBoard() {
    for (let i = 0; i < gameBoard.length; i++) {
        let cell = document.createElement("button");
        cell.classList.add("cell");
        cell.setAttribute("data-index", i);
        board.appendChild(cell);

        cell.addEventListener("click", handleClick);
    }
}

function handleClick(e) {
    const cell = e.target;
    const cellIdx = parseInt(cell.dataset.index);

    if (gameBoard[cellIdx] || !gameActive) {
        return;
    }

    gameBoard[cellIdx] = player;
    cell.innerText = player;

    // checking both winner and getting the winning combination
    let winner = checkWinner();
    if (winner) {
        gameActive = false;
        document.querySelector(".game-status").innerHTML = `The winner is: Player`;
        drawLine(winner);
        // highlight();
        return;
    }

    if (checkDraw()) {
        gameActive = false;
        document.querySelector(".game-status").innerHTML = "The game is draw!";
        return;
    }

    player = "O";
    document.querySelector(".game-status").innerHTML = `Computer's turn`;

    // now computers move
    let computerMove;

    // while computer is not getting a valid move the loop will continue
    while (1) {
        computerMove = parseInt(Math.random() * 9);

        if (gameBoard[computerMove] === "") {
            setTimeout(() => {
                gameBoard[computerMove] = player;
                document.querySelector(`.cell[data-index="${computerMove}"]`).innerText = player;

                player = "X";
                document.querySelector(".game-status").innerHTML = `Your turn`;

                winner = checkWinner();
                if (winner) {
                    gameActive = false;
                    document.querySelector(".game-status").innerHTML = `The winner is: Computer`;
                    drawLine(winner);
                }
            }, 600);
            break;
        }

    }
}

function checkWinner() {
    const winnerCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combination of winnerCombinations) {
        const [a, b, c] = combination;

        if (gameBoard[a] !== "" && gameBoard[a] === gameBoard[b] && gameBoard[b] === gameBoard[c]) {
            combination.forEach(cellIdx => {
                document.querySelector(`.cell[data-index="${cellIdx}"]`).classList.add("mark");
            })

            return combination;
        }
    }
}

function checkDraw() {
    return gameBoard.every(cell => cell !== "");
}

function drawLine(combination) {
    const [a, b, c] = combination;
    const line = document.querySelector(".cross-line");
    line.style.display = "block";

    // ROWS
    if (a === 0 && b === 1 && c === 2) {
        line.style.top = "47px";
        line.style.left = "0px";
    } else if (a === 3 && b === 4 && c === 5) {
        line.style.top = "147px";
        line.style.left = "0px";
    } else if (a === 6 && b === 7 && c === 8) {
        line.style.top = "247px";
        line.style.left = "0px";
    }

    // COLUMNS
    else if (a === 0 && b === 3 && c === 6) {
        line.style.top = "147px";
        line.style.left = "-100px";
        line.style.transform = "rotate(90deg)";
    } else if (a === 1 && b === 4 && c === 7) {
        line.style.top = "147px";
        // line.style.left = "-100px";
        line.style.transform = "rotate(90deg)";
    } else if (a === 2 && b === 5 && c === 8) {
        line.style.top = "147px";
        line.style.left = "100px";
        line.style.transform = "rotate(90deg)";
    }

    // DIAGONALS
    else if (a === 0 && b === 4 && c === 8) {
        line.style.width = "375px";
        line.style.top = "146px";
        line.style.left = "-38px";
        line.style.transform = "rotate(45deg)";
    } else if (a === 2 && b === 4 && c === 6) {
        line.style.width = "375px";
        line.style.top = "146px";
        line.style.left = "-38px";
        line.style.transform = "rotate(-45deg)";

    }
}

function resetGame() {
    const cells = Array.from(document.querySelectorAll(".cell"));
    const line = document.querySelector(".cross-line");

    // resetting every additional styles
    line.style.display = "none";
    line.style.width = "300px";
    line.style.top = "0px";
    line.style.left = "0px";
    line.style.transform = "rotate(0deg)";
    document.querySelector(".game-status").innerHTML = `Player ${player}'s turn`;

    for (let i = 0; i < gameBoard.length; i++) {
        cells[i].innerText = "";
        gameBoard[i] = "";
        cells[i].classList.remove("mark");
    }

    gameActive = true;
    player = "X";
}

displayBoard();