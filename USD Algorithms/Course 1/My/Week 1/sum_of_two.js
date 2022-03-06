var readline = require('readline');

process.stdin.setEncoding('utf8');
var reader = readline.createInterface({
    input: process.stdin,
    terminal: false
});

reader.on('line', readLine);

function readLine (line) {
    if (line !== "\n") {
        var digits = line.toString().split(' ');
        var a = parseInt(digits[0], 10);
        var b = parseInt(digits[1], 10);
        console.log(a + b);
        process.exit();
    }
}