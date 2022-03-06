var readline = require('readline');

process.stdin.setEncoding('utf8');
var reader = readline.createInterface({
    input: process.stdin,
    terminal: false
});

reader.on('line', readLine);

var W, n;
var bars;
var matrix = [[]];

function calcGold() {
    for (var i=0; i<=W; i++) {
        matrix[0][i] = 0;
    }
    for (var i=1; i<=n; i++) {
        matrix[i] = [0];
    }

    for (var i=1; i<=n; i++) {
        for(var w=1; w<=W; w++) {
            matrix[i][w] = matrix[i-1][w];
            if (bars[i-1] <= w) {
                var value = matrix[i-1][w - bars[i-1]] + bars[i-1];
                if (matrix[i][w] < value) {
                    matrix[i][w] = value;
                }
            }
        }
    }
    return matrix[n][W];
}

function readLine (line) {
    if (line !== "\n") {
        if (typeof n == "undefined") {
            line = line.toString().split(" ");
            W = parseInt(line[0], 10);
            n = parseInt(line[1], 10);
        } else {
            bars = line.toString().split(" ").map(function(w){
                return parseInt(w, 10);
            })
            console.log(calcGold());
            process.exit();
        }
    }
}
