var readline = require('readline');

process.stdin.setEncoding('utf8');
var reader = readline.createInterface({
    input: process.stdin,
    terminal: false
});

reader.on('line', readLine);
const book = new Map();

const processLine = function(line) {
    switch (line[0]) {
        case "add":
            book.set(line[1], line[2]);
            break;
        case "find":
            var found = book.get(line[1]);
            if (found) {
                console.log(found);
            } else {
                console.log("not found");
            }
            break;
        case "del":
            book.delete(line[1]);
            break;
    }
}

var lineIndex = 0;
var n;
function readLine (line) {
    if (line !== "\n") {
        if (typeof n == "undefined") {
            line = line.toString().split(" ");
            n = parseInt(line[0], 10);
        } else {
            line = line.toString().split(" ");
            processLine(line);
            if (lineIndex++ == n-1) {
                process.exit();
            }
        }
    }
}
