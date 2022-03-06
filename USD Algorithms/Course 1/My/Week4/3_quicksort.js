var readline = require('readline');

process.stdin.setEncoding('utf8');
var reader = readline.createInterface({
    input: process.stdin,
    terminal: false
});

reader.on('line', readLine);

var n;
var list;

function swap(a, b) {
    if (a == b) {
        return;
    }
    var c = list[a];
    list[a] = list[b];
    list[b] = c;
}

function partition(left, right) {
    var current = list[left];
    var j = left;
    for (var i = left + 1; i <= right; i++) {
        if (list[i] <= current) {
            j++
            swap(i, j);
        }
    }
    swap(left,j);
    return j;
}

function partition3(left, right) {
    // console.log(left, right);
    // console.log(list[left]);
    // console.log(list);
    var current = list[left];
    var j = left;
    var k = left;
    for (var i = left + 1; i <= right; i++) {
        if (list[i] < current) {
            j++;
            k++;
            swap(i, j);
            if (k > j) {
                swap(i, k);
            }
        } else if (list[i] == current) {
            k++;
            swap(i, k);
        }
        // console.log(list, j, k, i);
    }
    swap(left,j);
    // swap(j,k);

    // console.log(list);

    return {
        left: j,
        right: k
    };
}

function quickSort(left, right){
    if (left > right) {
        return;
    }

    var random = left + Math.round(Math.random() * (right-left));

    // var random = left + Math.floor((right-left)/2);

    swap(random, left);
    var newPivots = partition3(left, right);

    // console.log(newPivots);

    quickSort(left, newPivots.left - 1);
    quickSort(newPivots.right + 1, right);
}

function readLine (line) {
    if (line !== "\n") {
        if (typeof n == "undefined") {
            n = parseInt(line.toString(), 10);
        } else {
            list = line.toString().split(" ").map(function(num){
                return parseInt(num, 10);
            });
            quickSort(0, n-1);
            var i=0;
            while (i<list.length) {
                process.stdout.write(`${list[i]} `);
                i++;
            }
            process.stdout.write("\n");
            process.exit();
        }
    }
}
