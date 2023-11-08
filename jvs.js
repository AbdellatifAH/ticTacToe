function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell(i, j));
        }
    }

    const getBoard = () => board;

    const placeMarker = (indexC, indexR, player) => {
        if (board[indexC][indexR].getValue() === 0)
            board[indexC][indexR].playerMove(player)
    }

    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardWithCellValues);
    };
    return {
        getBoard,
        printBoard,
        placeMarker,
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
