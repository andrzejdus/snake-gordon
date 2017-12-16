const synaptic = require('synaptic');
const Neuron = synaptic.Neuron,
    Layer = synaptic.Layer,
    Network = synaptic.Network,
    Trainer = synaptic.Trainer,
    Architect = synaptic.Architect;

const network = new Architect.Perceptron(4, 25, 1);

function isRightMove(input) {
    const direction = input[3];

    return !input[direction];
}

let trainingSet = [];
for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
        for (let k = 0; k < 2; k++) {
            for (let direction = 0; direction < 3; direction++) {
                const input = [i, j, k, direction];
                trainingSet.push({
                    input: input,
                    output: [isRightMove(input) ? 1 : 0]
                });
            }
        }
    }
}

const trainer = new Trainer(network);
trainer.train(trainingSet);

const numberDirectionToString = {
    0: 'L',
    2: 'R'
};

module.exports = {
    getNextDirection: function (boardMeta) {
        for (let nextDirection = 0; nextDirection < 3; nextDirection++) {

            const networkResponse =
                network.activate([boardMeta.walls.left, boardMeta.walls.front, boardMeta.walls.right, nextDirection]);

            console.log(boardMeta.walls.left, boardMeta.walls.front, boardMeta.walls.right, nextDirection, networkResponse);

            if (networkResponse > 0.5) {
                return numberDirectionToString[nextDirection];
            }
        }

        return;
    }
};
