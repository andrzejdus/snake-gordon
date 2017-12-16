const Collision = require('./Collision.js');
const NeuralNetwork = require('./NeuralNetwork.js');
const Naive = require('./Naive.js');

const boardMeta = {
    applePosition: { x: 0, y: 0 },
    myPosition: { x: 0, y: 0 },
    walls: {},
    head: 'N',
    me: undefined,
    boardWidth: undefined,
    boardHeight: undefined,
    board: undefined
};

const isSmartGordon = false;

function init(options) {
    boardMeta.me = options.you;
    boardMeta.boardWidth = options.board.width;
    boardMeta.boardHeight = options.board.height;

    this.getMove = getMove;
}

function getMove(board) {
    boardMeta.board = board;

    for (let x = 0; x < boardMeta.boardWidth; x++) {
        for (let y = 0; y < boardMeta.boardHeight; y++) {
            const current = boardMeta.board[y][x];

            console.log(x, y, current);

            if (!current) {
                continue;
            }

            if (current == '🍎') {
                console.log('found apple', x, y);
                boardMeta.applePosition.x = x;
                boardMeta.applePosition.y = y;
            }

            if (current.player == boardMeta.me && current.head) {
                boardMeta.myPosition.x = x;
                boardMeta.myPosition.y = y;
                boardMeta.head = current.head;
            }

            boardMeta.walls.left = Collision.isWall(boardMeta, 'left');
            boardMeta.walls.front = Collision.isWall(boardMeta, 'front');
            boardMeta.walls.right = Collision.isWall(boardMeta, 'right');
        }
    }

    return isSmartGordon ? NeuralNetwork.getNextDirection(boardMeta) : Naive.getNextDirection(boardMeta);
}

module.exports = init;
