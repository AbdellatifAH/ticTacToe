function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];
    let availableCells = 9;

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell(i, j));
        }
    }

    const getBoard = () => board;

    const decreaseAvailableCells = () => availableCells--;

    const getAvailableCells = () => availableCells;

    const placeMarker = (i, j, player) => {
        if (board[i][j].getValue() === 0) {
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

function Cell(indexC, indexR) {
    let value = 0;
    const playerMove = (player) => {
        value = player;
    }

    const indexOfCell = () => {
        indexC, indexR;
    }

    const getValue = () => value;

    return {
        playerMove,
        getValue,
        indexOfCell,
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
        if (value[0][0] != 0 && value[0][0] == value[0][1] && value[0][0] == value[0][2])
            return true;
        else
            if (value[1][0] != 0 && value[1][0] == value[1][1] && value[0][0] == value[1][2])
                return true;
            else
                if (value[2][0] != 0 && value[2][0] == value[2][1] && value[0][0] == value[2][2])
                    return true;
                else
                    if (value[0][0] != 0 && value[0][0] == value[1][0] && value[0][0] == value[2][0])
                        return true;
                    else
                        if (value[0][1] != 0 && value[0][1] == value[1][1] && value[0][1] == value[2][1])
                            return true;
                        else
                            if (value[0][2] != 0 && value[0][2] == value[1][2] && value[0][2] == value[2][2])
                                return true;
                            else
                                if (value[0][0] != 0 && value[0][0] == value[1][1] && value[0][0] == value[2][2])
                                    return true;
                                else
                                    if (value[0][2] != 0 && value[0][2] == value[1][1] && value[0][2] == value[2][0])
                                        return true
                                    else
                                        return false;
    }

    const playRound = (i, j) => {
        const availableCells = board.getAvailableCells();
        console.log(
            `placing ${getActivePlayer().name}'s marker into the cell ${i} ${j}...`
        );
        board.placeMarker(i, j, getActivePlayer().marker);
        if (availableCells > board.getAvailableCells()) {
            if (board.getAvailableCells() == 0)
                return console.log("No Winner, it's a DRAW!!!")
            if (checkWinner()) {
                printPlayerTurn();
                return console.log(`${getActivePlayer().name} is the WINNER!!`);
            }
            else {
                switchPlayerTurn();
                printPlayerTurn();
            }
        }
        else {
            printPlayerTurn();
            return console.log("illegal move, try again");
        }
    };

    printPlayerTurn();
    return {
        playRound,
        getActivePlayer
    };
}

const game = GameController();