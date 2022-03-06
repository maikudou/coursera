var readline = require('readline');

process.stdin.setEncoding('utf8');
var reader = readline.createInterface({
    input: process.stdin,
    terminal: false
});

reader.on('line', readLine);

var n;
var list;

var sorter = function(a,b) {
    if (a > b) {
        return 1;
    }
    if (a < b) {
        return -1;
    }
    return 0;
};

function hasMajority() {
    if (list.length == 1) {
        return 1;
    }
    list = list.sort(sorter);

    var middle = Math.floor(list.length/2)-1;
    var start = 0;
    var finish = middle+1;
    while (finish < list.length) {
        if (list[start] == list[finish]) {
            return 1;
        }
        start++;
        finish++;
    }
    return 0;
}

function readLine (line) {
    if (line !== "\n") {
        if (typeof n == "undefined") {
            n = parseInt(line.toString(), 10);
        } else {
            list = line.toString().split(" ").map(function(num){
                return parseInt(num, 10);
            });
            console.log(hasMajority());
            process.exit();
        }
    }
}
