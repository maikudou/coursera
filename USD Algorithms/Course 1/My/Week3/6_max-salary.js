var readline = require('readline');

process.stdin.setEncoding('utf8');
var reader = readline.createInterface({
    input: process.stdin,
    terminal: false
});

reader.on('line', readLine);

var n;
var nums;

function maxSalary() {
    nums.sort(function(a,b){
        if (a === b) {
            return 0;
        }
        var aDigits = a.split("");
        var bDigits = b.split("");

        var try1 = [a,b].join("");
        var try2 = [b,a].join("");

        if (try1 > try2) {
            return -1;
        } else if (try1 < try2){
            return 1
        }
        return 0;
    });
    return nums.join("");
}

function readLine (line) {
    if (line !== "\n") {
        if (typeof n == "undefined") {
            n = parseInt(line.toString(), 10);
        } else {
            nums = line.toString().split(" ");
            console.log(maxSalary());
            process.exit();
        }
    }
}
