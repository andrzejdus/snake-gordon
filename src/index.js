const Collision = require('./Collision.js');
const NeuralNetwork = require('./NeuralNetwork.js');
const Naive = require('./Naive.js');

const boardMeta = {
    applePosition: { x: 0, y: 0 },
    myPosition: { x: 0, y: 0 },
    head: 'N',
    me: undefined,
    boardWidth: undefined,
    boardHeight: undefined,
    board: undefined
};

function init(options) {
    boardMeta.me = options.you;
    boardMeta.boardWidth = options.board.width;
    boardMeta.boardHeight = options.board.height;

    this.getMove = getMove;
}

function getMove(board) {
    boardMeta.board = board;
    console.log(boardMeta);

    for (let x = 0; x < boardMeta.boardWidth; x++) {
        for (let y = 0; y < boardMeta.boardHeight; y++) {
            const current = boardMeta.board[y][x];

            if (!current) {
                continue;
            }

            console.log(x, y, current);

            if (current == '🍎') {
                boardMeta.applePosition.x = x;
                boardMeta.applePosition.y = y;
            }

            if (current.player == boardMeta.me && current.head) {
                boardMeta.myPosition.x = x;
                boardMeta.myPosition.y = y;
                boardMeta.head = current.head;
            }

            boardMeta.isWallLeft = Collision.isWall(boardMeta, 'left');
            boardMeta.isWallFront = Collision.isWall(boardMeta, 'front');
            boardMeta.isWallRight = Collision.isWall(boardMeta, 'right');
        }
    }

    return Naive.getNextDirection(boardMeta);
    // return NeuralNetwork.getNextDirection(boardMeta);
}

module.exports = init;
