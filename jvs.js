function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];
    let availableCells = 9;

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    const decreaseAvailableCells = () => availableCells--;

    const getAvailableCells = () => availableCells;

    const placeMarker = (i, j, player) => {
        if (board[i][j].getValue() === "") {
            board[i][j].playerMove(player);
            decreaseAvailableCells();
        }
    }

    const getBoardValues = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        return boardWithCellValues;
    };

    return {
        getBoard,
        getBoardValues,
        placeMarker,
        getAvailableCells,
    };
}

function Cell() {
    let value = "";
    const playerMove = (player) => {
        value = player;
    }

    const getValue = () => value;

    return {
        playerMove,
        getValue,
    };
}

function GameController(playerOneName = "Player One", playerTwoName = "Player Two") {

    const board = Gameboard();

    const players = [
        {
            name: playerOneName,
            marker: "X",
        },
        {
            name: playerTwoName,
            marker: "O",
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const getActivePlayer = () => activePlayer;

    const printPlayerTurn = () => {
        console.clear();
        const boardWithCellValues = board.getBoardValues();
        console.table(boardWithCellValues);
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    const checkWinner = () => {
        const value = board.getBoardValues();
        if (value[0][0] != "" && value[0][0] == value[0][1] && value[0][0] == value[0][2])
            return true;
        else
            if (value[1][0] != "" && value[1][0] == value[1][1] && value[1][0] == value[1][2])
                return true;
            else
                if (value[2][0] != "" && value[2][0] == value[2][1] && value[2][0] == value[2][2])
                    return true;
                else
                    if (value[0][0] != "" && value[0][0] == value[1][0] && value[0][0] == value[2][0])
                        return true;
                    else
                        if (value[0][1] != "" && value[0][1] == value[1][1] && value[0][1] == value[2][1])
                            return true;
                        else
                            if (value[0][2] != "" && value[0][2] == value[1][2] && value[0][2] == value[2][2])
                                return true;
                            else
                                if (value[0][0] != "" && value[0][0] == value[1][1] && value[0][0] == value[2][2])
                                    return true;
                                else
                                    if (value[0][2] != "" && value[0][2] == value[1][1] && value[0][2] == value[2][0])
                                        return true
                                    else
                                        return false;
    }

    const playRound = (i, j) => {
        const availableCells = board.getAvailableCells();
        board.placeMarker(i, j, getActivePlayer().marker);
        if (availableCells > board.getAvailableCells()) {
            if (board.getAvailableCells() == 0) {
                console.log("No Winner, it's a DRAW!!!")
                return ("draw")
            }
            if (checkWinner()) {
                printPlayerTurn();
                console.log(`${getActivePlayer().name} is the WINNER!!`);
                return ("win");
            }
            else {
                switchPlayerTurn();
                printPlayerTurn();
            }
        }
        else {
            printPlayerTurn();
            console.log("illegal move, try again");
            return ("illegal move, try again");
        }
    };

    printPlayerTurn();
    return {
        playRound,
        getActivePlayer,
        getBoard: board.getBoard
    };
}

function ScreenController() {
    const game = GameController();
    const playerTunDiv = document.querySelector(".turn");
    const resultDiv = document.querySelector(".result")
    const boardDiv = document.querySelector(".board");

    const changeResultDiv = (result) => {
        resultDiv.textContent = result;
    }

    const updateScreen = () => {
        boardDiv.textContent = "";
        const board = game.getBoard();
        const activePlayer = game.getActivePlayer();

        playerTunDiv.textContent = `${activePlayer.name}'s turn...`;

        board.forEach((row, indexR) => {
            row.forEach((cell, indexC) => {
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");
                cellButton.dataset.rowIndex = indexR
                cellButton.dataset.columnIndex = indexC
                cellButton.textContent = cell.getValue();
                // if (cellButton.textContent == 0)
                //     cellButton.addEventListener("click", clickHandlerBoard)
                boardDiv.appendChild(cellButton);
            })
        })
    }
    function clickHandlerBoard(e) {
        const indexR = e.target.dataset.rowIndex;
        const indexC = e.target.dataset.columnIndex;
        const gameResult = game.playRound(indexR, indexC);
        if (!indexC || !indexR) return;
        if (gameResult == "win") {
            boardDiv.removeEventListener("click", clickHandlerBoard)
            changeResultDiv(`${game.getActivePlayer().name} is the WINNER!!`)
        }
        else if (gameResult == "draw")
            changeResultDiv("No Winner, it's a DRAW!!!")
        updateScreen();
    }
    boardDiv.addEventListener("click", clickHandlerBoard);

    updateScreen();
}

ScreenController();

