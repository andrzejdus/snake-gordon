module.exports = {
    getNextDirection: function (boardMeta) {
        let head = boardMeta.head;
        let myPosition = boardMeta.myPosition;
        let destination = boardMeta.applePosition;

        console.log('getNextDirection', head, myPosition, destination);

        const dx = destination.x - myPosition.x;
        const dy = destination.y - myPosition.y;

        console.log('getNextDirection, dx, dy', dx, dy);

        let nextDirection;

        switch (head) {
            case 'N':
                if (dx != 0) {
                    nextDirection = dx > 0 ? 'R' : 'L';
                } else {
                    nextDirection = dy > 0 ? 'L' : 'F';
                }
                break;
            case 'S':
                if (dx != 0) {
                    nextDirection = dx > 0 ? 'L' : 'R';
                } else {
                    nextDirection = dy > 0 ? 'F' : 'L';
                }
                break;
            case 'W':
                if (dx != 0) {
                    nextDirection = dx > 0 ? 'L' : 'F';
                } else {
                    nextDirection = dy > 0 ? 'L': 'R';
                }
                break;
            case 'E':
                if (dx != 0) {
                    nextDirection = dx > 0 ? 'F' : 'L';
                } else {
                    nextDirection = dy > 0 ? 'R': 'L';
                }
                break;
            default:
                break;
        }

        const shortToLong = {
            'L': 'left',
            'R': 'right'
        };

        const opposite = {
            'L': 'R',
            'R': 'L',
            'F': 'R'
        };

        console.log('walls', boardMeta.walls);
        if (boardMeta.walls[shortToLong[nextDirection]]) {
            nextDirection = opposite[nextDirection];
        }

        return nextDirection == 'F' ? undefined : nextDirection;
    }
};
