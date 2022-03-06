var readline = require('readline');

process.stdin.setEncoding('utf8');
var reader = readline.createInterface({
    input: process.stdin,
    terminal: false
});

reader.on('line', readLine);

var n;

function fibonacciTable(n) {
    if (n < 2) {
        return n;
    }
    else {
        var table = [0,1];
        for (var i = 2; i <= n; i++) {
            table[i] = table[i-2] + table[i-1];
        }
    }
    return table[n];
}

function readLine (line) {
    if (line !== "\n") {
        if (typeof n == "undefined") {
            n = parseInt(line.toString(), 10);
            console.log(fibonacciTable(n));
            process.exit();
        }
    }
}
