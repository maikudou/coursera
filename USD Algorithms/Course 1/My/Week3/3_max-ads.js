var readline = require('readline');

process.stdin.setEncoding('utf8');
var reader = readline.createInterface({
    input: process.stdin,
    terminal: false
});

reader.on('line', readLine);

var n;
var aArray;
var bArray;

var sorter = function(a,b) {
    if (a > b) {
        return -1;
    }
    if (a < b) {
        return 1;
    }
    return 0;
};

function maxRevenue() {
    var revenue = 0;
    aArray.sort(sorter);
    bArray.sort(sorter);
    while (aArray.length) {
        revenue += aArray.shift()*bArray.shift();
    }
    return revenue;
}

function readLine (line) {
    if (line !== "\n") {
        line = line.toString();
        if (typeof n == "undefined") {
            n = parseInt(line, 10);
        } else if (typeof aArray == "undefined") {
            aArray = line.split(" ").map(function(num){
                return parseInt(num, 10);
            });
        } else {
            bArray = line.split(" ").map(function(num){
                return parseInt(num, 10);
            });
            console.log(maxRevenue());
            process.exit();
        }
    }
}
