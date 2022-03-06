var readline = require('readline');

process.stdin.setEncoding('utf8');
var reader = readline.createInterface({
    input: process.stdin,
    terminal: false
});

reader.on('line', readLine);

var a, b;

function bigIntModulo(a, b) {
    while (a.length > 15) {
        var part = a.substring(0, 15);
        a = (part % b) +  a.substring(15);
    }

    return a % b;
}

function fibonacciPeriod(m, a, aInt) {
    var periodTable = [0, 1];
    var periodLength = null;
    var i = 2;
    while (i <= aInt) {
        periodTable[i] = (periodTable[i-1] + periodTable[i-2]) % m;
        if (periodTable[i] == 1 && periodTable[i-1] == 0) {
            periodLength = i-1;
            break;
        }
        i++;
    }
    if (periodLength) {
        return periodTable[bigIntModulo(a, periodLength)]
    } else {
        return periodTable[a];
    }
}

function readLine (line) {
    if (line !== "\n") {
        if (typeof n == "undefined") {
            line = line.toString().split(" ");
            a = line[0];
            aInt = parseInt(a, 10);
            b = parseInt(line[1], 10);
            console.log(fibonacciPeriod(b, a, aInt));
            process.exit();
        }
    }
}
