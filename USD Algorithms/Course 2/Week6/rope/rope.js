var readline = require('readline');

process.stdin.setEncoding('utf8');
var reader = readline.createInterface({
    input: process.stdin,
    terminal: false
});

reader.on('line', readLine);

var tree;

function query (i,j,k) {
    // console.log(i,j,k);
    var start = string.slice(0,i);
    var sub = string.slice(i,j+1);
    var end = string.slice(j+1);
    // console.log(start, sub, end);
    string = start + end;
    // console.log(string);
    if (k > 0) {
        start = string.slice(0,k);
    } else {
        start = "";
    }
    end = string.slice(k);
    // console.log(start, end);
    string = start + sub + end;
    // console.log(string);
}

var string;
var count;
var i;

function readLine (line) {
    if (line !== "\n") {
        if (typeof string == "undefined") {
            string = line.toString();
        } else if (typeof count == "undefined") {
            count = parseInt(line.toString(), 10);
            i=0;
        } else {
            line = line.toString().split(" ").map(function(num) {
                return parseInt(num, 10);
            });
            query(line[0], line[1], line[2]);

            if (++i == count) {
                for (var j=0;j<string.length; j++) {
                    process.stdout.write(`${string[j]}`);
                }
                process.stdout.write("\n");
                process.exitCode = 0;
            }
        }
    }
}
