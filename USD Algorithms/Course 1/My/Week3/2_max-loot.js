var readline = require('readline');

process.stdin.setEncoding('utf8');
var reader = readline.createInterface({
    input: process.stdin,
    terminal: false
});

reader.on('line', readLine);

var n;
var W;
var items = [];

function maxLoot() {
    var value = 0;
    items.sort(function(a,b) {
        var aRatio = a.value/a.weight;
        var bRatio = b.value/b.weight;
        if (aRatio > bRatio) {
            return -1;
        }
        if (aRatio < bRatio) {
            return 1;
        }
        return 0;
    });
    var currentItem = items.shift();
    while (currentItem && W) {
        if (currentItem.weight <= W) {
            value += currentItem.value;
            W -= currentItem.weight;
        } else {
            value += currentItem.value/currentItem.weight * W;
            W = 0;
        }
        currentItem = items.shift();
    }
    return value;
}

function readLine (line) {
    if (line !== "\n") {
        line = line.toString().split(" ");
        if (typeof n == "undefined") {
            n = parseInt(line[0], 10);
            W = parseInt(line[1], 10);
        } else if (items.length < n) {
            items.push({
                value: parseInt(line[0], 10),
                weight: parseInt(line[1], 10),
            })
            if (items.length === n) {
                console.log(maxLoot().toFixed(4));
                process.exit();
            }
        } else {
            console.log(maxLoot().toFixed(4));
            process.exit();
        }
    }
}
