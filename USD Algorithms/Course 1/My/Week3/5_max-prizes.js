var readline = require('readline');

process.stdin.setEncoding('utf8');
var reader = readline.createInterface({
    input: process.stdin,
    terminal: false
});

reader.on('line', readLine);

var n;

function maxPrizes(n) {
    var min = 1;
    var prizes = [1];
    var sum = 0;
    while (sum < n) {
        if (sum + prizes[prizes.length-1] == n) {
            break;
        }
        if (sum + prizes[prizes.length-1] > n) {
            sum -= prizes.pop();
            prizes[prizes.length-1] = n - sum -1;
            break;
        } else {
            sum += prizes[prizes.length-1];
            min++;
            prizes.push(min);
        }
    }
    console.log(prizes.length);
    for (const prize of prizes) {
        process.stdout.write(`${prize} `);
    }
    process.stdout.write("\n");
}

function readLine (line) {
    if (line !== "\n") {
        if (typeof n == "undefined") {
            n = parseInt(line.toString(), 10);
            maxPrizes(n);
            process.exit();
        }
    }
}
