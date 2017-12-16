let me;
let boardWidth;
let boardHeight;

function init(options) {
    me = options.you;
    boardWidth = options.board.width;
    boardHeight = options.board.height;

    this.getMove = getMove;
}

function getNextDirection(head, current, destination) {
    console.log('getNextDirection', head, current, destination);

    const dx = destination.x - current.x;
    const dy = destination.y - current.y;

    let nextDirection;

    switch (head) {
        case 'N':
            if (dx != 0) {
                nextDirection = dx > 0 ? 'R' : 'L';
            } else {
                nextDirection = dy > 0 ? 'L' : undefined;
            }
            break;
        case 'S':
            if (dx != 0) {
                nextDirection = dx > 0 ? 'R' : 'L';
            } else {
                nextDirection = dy > 0 ? undefined : 'L';
            }
            break;
        case 'W':
            if (dx != 0) {
                nextDirection = dx > 0 ? 'L' : undefined;
            } else {
                nextDirection = dy > 0 ? 'L': 'R';
            }
            break;
        case 'E':
            if (dx != 0) {
                nextDirection = dx > 0 ? undefined : 'L';
            } else {
                nextDirection = dy > 0 ? 'L': 'R';
            }
            break;
        default:
            break;
    }

    return nextDirection;
}

function getMove(state) {
    const board = state.board;
    console.log(board);

    const applePosition = { x: 0, y: 0 };
    const myPosition =  { x: 0, y: 0 };
    let head;

    for (let x = 0; x < boardWidth; x++) {
        for (let y = 0; y < boardHeight; y++) {
            const current = board[y][x];

            if (!current) {
                continue;
            }

            console.log(x, y, current);


            if (current == '🍎') {
                applePosition.x = x;
                applePosition.y = y;
            }

            if (current.player == me && current.head) {
                myPosition.x = x;
                myPosition.y = y;
                head = current.head;
            }
        }
    }

    return getNextDirection(head, myPosition, applePosition);
}

module.exports = init;
