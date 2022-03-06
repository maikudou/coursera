var readline = require('readline');

process.stdin.setEncoding('utf8');
var reader = readline.createInterface({
    input: process.stdin,
    terminal: false
});

reader.on('line', readLine);

var n;

function moneyChange(n) {
    var count = 0;
    if (n >= 10) {
        count += Math.floor(n/10);
        n = n%10;
    }
    if (n >= 5) {
        count += Math.floor(n/5);
        n = n%5;
    }
    count += n;
    return count;
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
