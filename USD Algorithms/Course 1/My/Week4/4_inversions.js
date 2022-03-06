var readline = require('readline');

process.stdin.setEncoding('utf8');
var reader = readline.createInterface({
    input: process.stdin,
    terminal: false
});

reader.on('line', readLine);

var n;
var list;
var result;
var inversions = 0;

function merge(array, placeholder, leftStart, rightEnd) {
    var leftEnd = parseInt((leftStart + rightEnd)/2);
    var leftIndex = leftStart;
    var rightStart = leftEnd + 1;
    var rightIndex = rightStart;
    var index = leftStart;

    while (leftIndex <= leftEnd && rightIndex <= rightEnd) {
        if (array[leftIndex] > array[rightIndex]) {
            inversions += rightStart - leftIndex;
            placeholder[index] = array[rightIndex];
            rightIndex++;
        } else {
            placeholder[index] = array[leftIndex];
            leftIndex++;
        }
        index++;
    }

    if (index <= rightEnd) {
        if (leftIndex > leftEnd) {
            for (rightIndex; rightIndex <= rightEnd; rightIndex++) {
                placeholder[index] = array[rightIndex];
                index++;
            }
        } else {
            for (leftIndex; leftIndex <= leftEnd; leftIndex++) {
                placeholder[index] = array[leftIndex];
                index++;
            }
        }
    }
    for (leftStart; leftStart <= rightEnd; leftStart++) {
        array[leftStart] = placeholder[leftStart];
    }
}

function mergeSort(array, placeholder, leftStart, rightEnd) {
    if (leftStart >= rightEnd) {
        return;
    }
    var middle = parseInt((leftStart + rightEnd)/2);
    mergeSort(array, placeholder, leftStart, middle);
    mergeSort(array, placeholder, middle + 1, rightEnd);
    merge(array, placeholder, leftStart, rightEnd);
}

function readLine (line) {
    if (line !== "\n") {
        if (typeof n == "undefined") {
            n = parseInt(line.toString(), 10);
        } else {
            list = line.toString().split(" ").map(function(num){
                return parseInt(num, 10);
            });
            mergeSort(list, new Array(list.length), 0, list.length - 1);;
            console.log(inversions);
            process.exit();
        }
    }
}
