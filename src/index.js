const io = require("socket.io-client");
const Collision = require('./Collision.js');
const NeuralNetwork = require('./NeuralNetwork.js');
const Naive = require('./Naive.js');

const snakeName = "Gordon";
// const backendUrl = "https://syzygy-snake-wars.herokuapp.com/";
const backendUrl = "http://localhost:3001";
const socket = io.connect(backendUrl, { reconnection: true });

socket.on("connect", function() {
    console.log(`Snake ${snakeName} sent hello to the server.`);
    socket.emit("hello", snakeName);
});

socket.on("init", function(data) {
    console.log(`Snake ${snakeName} has been accepted by the server.`);

    init(data);

    socket.on("move", function(data) {
        socket.emit("move", getMove(data));
    });
});

socket.on("disconnect", function() {
    console.log(`Snake ${snakeName} has been disconnected from remote server.`);
});

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
    console.log(options);

    boardMeta.me = options.you;
    boardMeta.boardWidth = options.board.width;
    boardMeta.boardHeight = options.board.height;

    this.getMove = getMove;
}

function getMove(board) {
    boardMeta.board = board;

    for (let y = 0; y < boardMeta.boardHeight; y++) {
        for (let x = 0; x < boardMeta.boardWidth; x++) {
            const current = boardMeta.board[x][y];

            if (!current) {
                continue;
            }

            if (current == '🍎') {
                console.log('found apple at x: ' + x + ', y: ' + y);
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

    const move = isSmartGordon ? NeuralNetwork.getNextDirection(boardMeta) : Naive.getNextDirection(boardMeta);
    console.log('gordon move', move);

    return move;
}

module.exports = init;
