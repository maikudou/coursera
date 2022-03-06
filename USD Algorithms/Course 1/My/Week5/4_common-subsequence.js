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
        matrix[0][i] = 0;
    }
    for (var i=1; i<=a.length; i++) {
        matrix[i] = [0];
    }

    for (var i=1; i<=a.length; i++) {
        for(j=1; j<=b.length; j++) {
            var distance;
            if (a[i-1] == b[j-1]) {
                distance = matrix[i-1][j-1] + 1;
            } else {
                distance = Math.max(matrix[i-1][j], matrix[i][j-1]);
            }
            matrix[i][j] = distance;
        }
    }
    // console.log(matrix);

    return reconstrunctAlignment(a.slice(0), b.slice(0));
}

function reconstrunctAlignment(a, b) {
    var reconstructedA = "";
    var reconstructedB = "";
    var common = "";

    var count = 0;
    var y = a.length;
    var x = b.length;

    while(x || y) {
        var direction;
        if (a[y-1] == b[x-1]) {
            direction = "d";
        } else {
            if (x == 0) {
                direction = "u";
            } else if (y == 0) {
                direction = "l";
            } else {
                // console.log(matrix[y-1][x], matrix[y][x-1], y, x, a[y-1], b[x-1]);
                if (matrix[y-1][x] > matrix[y][x-1]) {
                    direction = "u";
                } else {
                    direction = "l";
                }
            }

        }

        // console.log(direction);

        if (direction == "d") {
            x--;
            y--;
            reconstructedA = a[y] + reconstructedA;
            reconstructedB = b[x] + reconstructedB;
            common = a[y] + common;
            count++;
        } else if (direction == "l"){
            x--;
            reconstructedA = "-" + reconstructedA;
            reconstructedB = b[x] + reconstructedB;
        } else if (direction == "u"){
            y--;
            reconstructedA = a[y] + reconstructedA;
            reconstructedB = "-" + reconstructedB;
        }
    }

    // console.log(reconstructedA);
    // console.log(reconstructedB);
    // console.log(common);

    return count;
}

var lineCount = 0;

function readLine (line) {
    if (line !== "\n") {
        lineCount++;
        if (lineCount == 2) {
            line1 = line.toString().split(" ");
        } else if (lineCount == 4){
            line2 = line.toString().split(" ");
            console.log(editDistance(line1, line2));
            process.exit();
        }
    }
}
