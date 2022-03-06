var readline = require('readline');

process.stdin.setEncoding('utf8');
var reader = readline.createInterface({
    input: process.stdin,
    terminal: false
});

reader.on('line', readLine);

var n;
var max1 = 0;
var max1Index;
var max2 = 0;
var max2Index;

function readLine (line) {
    if (line !== "\n") {
        if (typeof n == "undefined") {
            n = parseInt(line.toString(), 10);
        } else {
            var digits = line.toString().split(" ");
            var num;
            for(var i=0; i < digits.length; i++) {
                num = parseInt(digits[i], 10);
                // console.log(num, max1, max2);
                if (num > max1 && i != max1Index) {
                    max2 = max1;
                    max2Index = max1Index;
                    max1 = num;
                    max1Index = i;
                } else if (num > max2 && i != max2Index) {
                    max2 = num;
                    max2Index = i;
                }
            }
            console.log(max2 * max1);
            process.exit();
        }

    }
}