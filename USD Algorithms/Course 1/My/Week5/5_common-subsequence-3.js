var readline = require('readline');

process.stdin.setEncoding('utf8');
var reader = readline.createInterface({
    input: process.stdin,
    terminal: false
});

reader.on('line', readLine);

var line1;
var line2;
var line3;
var matrix = [];
var directionMatrix = [];

function commonSubstring(a, b, c) {
    for (var i=0; i<=a.length; i++) {
        matrix[i] = [];
        for (var j=0; j<=b.length; j++) {
            matrix[i][j] = [];
            for (var k=0; k<=c.length; k++) {
                matrix[i][j][k] = 0;
            }
        }
    }

    // console.log(matrix);

    for (var i=1; i<=a.length; i++) {
        for(var j=1; j<=b.length; j++) {
            for(var k=1; k<=c.length; k++) {
                var distance;
                if (a[i-1] == b[j-1] && b[j-1] == c[k-1]) {
                    distance = matrix[i-1][j-1][k-1] + 1;
                    // directionMatrix[i][j] = ["d"];
                } else {
                    distance = Math.max(matrix[i-1][j][k], matrix[i][j-1][k], matrix[i][j][k-1]);
                    // if (matrix[i-1][j] == matrix[i][j-1]) {
                    //     // directionMatrix[i][j] = ["l", "u"];
                    // } else if (matrix[i-1][j] > matrix[i][j-1]) {
                    //     // directionMatrix[i][j] = ["u"];
                    // } else {
                    //     // directionMatrix[i][j] = ["l"];
                    // }
                }
                matrix[i][j][k] = distance;
            }
        }
    }

    return matrix[a.length][b.length][c.length];
}

function reconstructPaths(a,b,directionMatrix) {
    var branches = true;
    var variants = [];
    while (branches) {
        branches = false;
        var y = a.length;
        var x = b.length;
        var path = [];
        var variant = [];

        while(x || y) {
            var directionArr = directionMatrix[y][x];
            if (directionArr.length > 1) {
                branches = true;
            }
            var direction = directionArr.length > 1 ? directionArr.pop() : directionArr[0];
            path.push(direction);

            if (direction == "d") {
                x--;
                y--;
                variant.unshift(a[y]);
            } else if (direction == "l"){
                x--;
            } else if (direction == "u"){
                y--;
            }

        }
        // console.log(path);
        variants.push(variant);
    }

    // console.log(variants);

    return variants;
}

var lineCount = 0;

function readLine (line) {
    if (line !== "\n") {
        lineCount++;
        if (lineCount == 2) {
            line1 = line.toString().split(" ");
        } else if (lineCount == 4){
            line2 = line.toString().split(" ");
        } else if (lineCount == 6){
            line3 = line.toString().split(" ");
            console.log(commonSubstring(line1, line2, line3));
            process.exit();
        }
    }
}
