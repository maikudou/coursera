var readline = require('readline');

process.stdin.setEncoding('utf8');
var reader = readline.createInterface({
    input: process.stdin,
    terminal: false
});

reader.on('line', readLine);

var list;

function binarySearch(n, left, right) {
    if (left > right) {
        return -1;
    }
    if (left == right) {
        if (n == list[left]) {
            return left;
        }
        return -1;
    } else {
        middle = left + Math.floor((right - left)/2);
        var middleValue = list[middle];
        var leftValue = list[left];
        var rightValue = list[right];
        if (rightValue < n) {
            return -1;
        }
        if (leftValue >n) {
            return -1;
        }
        if (middleValue == n) {
            return middle;
        }
        if (list[right] == n) {
            return right;
        }
        if (list[left] == n) {
            return left;
        }
        if (middleValue > n) {
            return binarySearch(n, left, middle-1);
        } else {
            return binarySearch(n, middle+1, right);
        }
    }
};

function search(n) {
    return binarySearch(n, 0, list.length - 1);
}

function readLine (line) {
    if (line !== "\n") {
        if (typeof list == "undefined") {
            list = line.toString().split(" ");
            list.shift();
            list = list.map(function(num){
                return parseInt(num, 10);
            });
        } else {
            searchables = line.toString().split(" ");
            searchables.shift();
            searchables = searchables.map(function(num){
                return parseInt(num, 10);
            });
            var i = 0;
            while (i < searchables.length) {
                process.stdout.write(`${search(searchables[i])} `);
                i++;
            }
            process.stdout.write("\n");
            process.exit();
        }
    }
}
