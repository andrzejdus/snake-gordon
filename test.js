const Snake = require('./src/index.js');

function assertMove(nextMove, rightMove) {
    console.log('Next move:', nextMove, 'right move:', rightMove, nextMove === rightMove ? 'OK' : 'FAIL');
}

const snake = new Snake({
    "type": ["snake"][0],
    "start": {
        "x": 0,
        "y": 0,
        "length": 3,
        "direction": ["N", "E", "S", "W"][0],
    },
    "timeout": 200,
    "board": {
        "width": 5,
        "height": 1,
    },
    "bałwanek": "☃️",
    "players": [1,2,3],
    "you": 3,
});

console.log('-- 1 --');
console.log('[[-, 🍎, #, #, N]]');
let nextMove = snake.getMove([
        [
            undefined, // empty,
            "🍎", // apple
            {
                "dead": true,
            },
            {
                "player": 2,
            },
            {
                "player": 3,
                "head": ['N', 'E', 'S', 'W'][0],
            }
        ]
    ]
);
assertMove(nextMove, 'L');

console.log('-- 2 --');
console.log('[[-, 🍎, #, W, #]]');
nextMove = snake.getMove([
        [
            undefined, // empty,
            "🍎", // apple
            {
                "dead": true,
            },
            {
                "player": 3,
                "head": ['N', 'E', 'S', 'W'][3],
            },
            {
                "player": 2,
            },
        ]
    ]
);
assertMove(nextMove, undefined);

console.log('-- 3 --');
console.log('[[-, 🍎, W, #, #]]');
nextMove = snake.getMove([
        [
            undefined, // empty,
            "🍎", // apple
            {
                "player": 3,
                "head": ['N', 'E', 'S', 'W'][3],
            },
            {
                "dead": true,
            },
            {
                "player": 2,
            },
        ]
    ]
);
assertMove(nextMove, undefined);

console.log('-- 4 --');
console.log('[[-, E, #, #, 🍎]]');
nextMove = snake.getMove([
        [
            undefined, // empty,
            {
                "player": 3,
                "head": ['N', 'E', 'S', 'W'][1],
            },
            undefined, // empty,
            undefined, // empty,
            "🍎", // apple
        ]
    ]
);
assertMove(nextMove, undefined);
