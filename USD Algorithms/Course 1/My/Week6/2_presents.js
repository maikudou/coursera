var readline = require('readline');

process.stdin.setEncoding('utf8');
var reader = readline.createInterface({
    input: process.stdin,
    terminal: false
});

reader.on('line', readLine);

var W, n;
var presents;
var matrix = [[]];

function sharePresents() {
    var W = presents.reduce(function(present, sum){
        return sum + present;
    }, 0);

    console.log(W, n);

    if (W%3) {
        return 0;
    }

    W = W/3;

    for (var i=0; i<=W; i++) {
        matrix[0][i] = 0;
    }
    for (var i=1; i<=n; i++) {
        matrix[i] = [0];
    }

    for (var i=1; i<=n; i++) {
        for(var w=1; w<=W; w++) {
            matrix[i][w] = matrix[i-1][w];
            if (presents[i-1] <= w) {
                var value = matrix[i-1][w - presents[i-1]] + presents[i-1];
                if (matrix[i][w] < value) {
                    matrix[i][w] = value;
                }
            }
        }
    }
    // console.log(matrix);

    for (var i = 0; i<=n;i++) {
        console.log(i, matrix[i][W]);
    }

    var w = W;
    var solution = [];
    var n1 = n;
    while (w > 0 && n1 > 0) {
        var value = matrix[n1][w];
        console.log(value, matrix[n1-1][w-value], presents[n1-1]);
        if (matrix[n1-1][w-value] + presents[n1-1] == value) {
            solution.unshift(presents[n1-1]);
            w -= presents[n1-1];
        }
        n1--;
    }
    solution.unshift(presents[0]);
    console.log(solution);

    return matrix[n][W];
}

function readLine (line) {
    if (line !== "\n") {
        if (typeof n == "undefined") {
            n = parseInt(line.toString());
        } else {
            presents = line.toString().split(" ").map(function(w){
                return parseInt(w, 10);
            })
            console.log(sharePresents());
            process.exit();
        }
    }
}
