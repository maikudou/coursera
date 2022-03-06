var readline = require('readline');

process.stdin.setEncoding('utf8');
var reader = readline.createInterface({
    input: process.stdin,
    terminal: false
});

reader.on('line', readLine);

var line1;
var line2;
var matrix = [[]];

function editDistance(a, b) {
   for (var i=0; i<=b.length; i++) {
        matrix[0][i] = i;
    }
    for (var i=1; i<=a.length; i++) {
        matrix[i] = [i];
    }

    for (var i=1; i<=a.length; i++) {
        for(j=1; j<=b.length; j++) {
            var plusDistance = a[i-1] == b[j-1] ? 0 : 1;
            var distance = Math.min(matrix[i-1][j-1] + plusDistance, matrix[i-1][j] + 1, matrix[i][j-1] + 1);
            matrix[i][j] = distance;
        }
    }
    return matrix[a.length][b.length];
}

function readLine (line) {
    if (line !== "\n") {
        if (typeof line1 == "undefined") {
            line1 = line.toString();
        } else {
            line2 = line.toString();
            console.log(editDistance(line1, line2));
            process.exit();
        }
    }
}
