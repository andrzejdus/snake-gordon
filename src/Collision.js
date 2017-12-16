let headToRelativeCoordinates = {
    'N': {
        left: {
            x: -1,
            y: 0
        },
        front: {
            x: 0,
            y: -1
        },
        right: {
            x: 1,
            y: 0
        }
    },
    'S': {
        left: {
            x: 1,
            y: 0
        },
        front: {
            x: 0,
            y: 1
        },
        right: {
            x: -1,
            y: 0
        }
    },
    'W': {
        left: {
            x: 0,
            y: 1
        },
        front: {
            x: -1,
            y: 0
        },
        right: {
            x: 0,
            y: -1
        }
    },
    'E': {
        left: {
            x: 0,
            y: -1
        },
        front: {
            x: 1,
            y: 0
        },
        right: {
            x: 0,
            y: 1
        }
    },
};

module.exports = {
    isWall: function (boardMeta, direction) {
        const x = boardMeta.myPosition.x + headToRelativeCoordinates[boardMeta.head][direction].x;
        const y = boardMeta.myPosition.y + headToRelativeCoordinates[boardMeta.head][direction].y;

        if (x < 0 || y < 0 || x >= boardMeta.boardWidth || y >= boardMeta.boardHeight) {
            return true;
        }

        const tile = boardMeta.board[y][x];

        return tile.dead || tile.player !== undefined;
    }
};
