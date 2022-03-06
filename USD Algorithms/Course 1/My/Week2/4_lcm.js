var readline = require('readline');

process.stdin.setEncoding('utf8');
var reader = readline.createInterface({
    input: process.stdin,
    terminal: false
});

reader.on('line', readLine);

var a, b;

function euqlidGCD(a,b) {
    if (b == 0) {
        return a;
    }
    if (a == 0) {
        return b;
    }
    return (euqlidGCD(b, a%b));
}

function readLine (line) {
    if (line !== "\n") {
        if (typeof a == "undefined") {
            line = line.toString().split(" ");
            a = parseInt(line[0], 10);
            b = parseInt(line[1], 10);
            console.log(Math.max(a,b)/euqlidGCD(a,b) * Math.min(a,b));
            process.exit();
        }
    }
}
