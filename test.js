const Index = require('./index.js');

const index = new Index({
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

const nextMove = index.getMove({
    "board": [
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
});

console.log('Next move', nextMove);
