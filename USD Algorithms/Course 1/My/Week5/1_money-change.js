var readline = require('readline');

process.stdin.setEncoding('utf8');
var reader = readline.createInterface({
    input: process.stdin,
    terminal: false
});

reader.on('line', readLine);

var n;
var denominations = [1,3,4];
var minimums = [0];

function moneyChange(n) {
    for (var i = 1; i <= n; i++) {
        if(i >= 4) {
            minimums[i] = Math.min(minimums[i-4]+1, minimums[i-3]+1, minimums[i-1]+1);
        } else if(i >= 3) {
            minimums[i] = Math.min(minimums[i-3]+1, minimums[i-1]+1);
        } else {
            minimums[i] = i;
        }
    }
    return minimums[n];
}

function readLine (line) {
    if (line !== "\n") {
        if (typeof n == "undefined") {
            n = parseInt(line.toString(), 10);
            console.log(moneyChange(n));
            process.exit();
        }
    }
}
