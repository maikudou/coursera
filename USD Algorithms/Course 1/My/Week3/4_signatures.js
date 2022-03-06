var readline = require('readline');

process.stdin.setEncoding('utf8');
var reader = readline.createInterface({
    input: process.stdin,
    terminal: false
});

reader.on('line', readLine);

var n;
var items = [];

function segments() {
    var count = 0;
    items.sort(function(a,b) {
        if (a.start < b.start) {
            return -1;
        } else if (a.start > b.start) {
            return 1;
        } else if (a.end > b.end) {
            return 1;
        } else if (a.end < b.end) {
            return -1;
        }
        return 0;
    });
    var currentStart = items.shift();
    var commoners = [];
    while (currentStart) {
        var commoner = currentStart.start;
        var nextItem = items.shift();
        var maxStart = currentStart.end;

        while (nextItem && nextItem.start <= maxStart && nextItem.start >= currentStart.start && nextItem.start <= currentStart.end) {
            if (nextItem.start > commoner) {
                commoner = nextItem.start;
            }
            if (maxStart > nextItem.end) {
                maxStart = nextItem.end;
            }
            nextItem = items.shift();
        }

        commoners.push(maxStart);
        currentStart = nextItem;
    }
    console.log(commoners.length);
    console.log(commoners.join(" "));
}

function readLine (line) {
    if (line !== "\n") {
        line = line.toString().split(" ");
        if (typeof n == "undefined") {
            n = parseInt(line[0], 10);
            W = parseInt(line[1], 10);
        } else if (items.length < n) {
            items.push({
                start: parseInt(line[0], 10),
                end: parseInt(line[1], 10)
            })
            if (items.length === n) {
                segments();
                process.exit();
            }
        }
    }
}
