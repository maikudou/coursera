var readline = require('readline');

process.stdin.setEncoding('utf8');
var reader = readline.createInterface({
    input: process.stdin,
    terminal: false
});

var n;
var input;

class Heap {
    constructor(arr) {
        this.arr = arr || [];
    }
    build() {
        for (var i=this.parentIndex(this.arr.length-1); i >= 0; i--) {
            this.bubbleDown(i);
        }
    }
    check() {
    }
    insert(value) {
        this.arr.push(value);
        this.bubbleUp(this.arr.length - 1);
    }
    swap(a, b) {
        var value = this.arr[a];
        this.arr[a] = this.arr[b];
        this.arr[b] = value;
    }
    parentIndex (index) {
        if (index == 0) {
            return null;
        }
        return parseInt((index - 1) / 2);
    }
    leftIndex (index) {
        var l = index * 2 + 1;
        if (l >= this.arr.length) {
            return null
        }
        return l;
    }
    rightIndex (index) {
        var r = index * 2 + 2;
        if (r >= this.arr.length) {
            return null
        }
        return r;
    }
    behead() {
        this.swap(0, this.size() - 1);
        var topValue = this.arr.pop();
        this.bubbleDown(0);
        return topValue;
    }
    top() {
        return this.arr[0];
    }
    size() {
        return this.arr.length;
    }
    bubbleUp(index) {
    }
    bubbleDown(index) {
    }
    compare(i,j) {
    }
}

class MinHeap extends Heap {
    bubbleUp(index) {
        var parentIndex = this.parentIndex(index);
        if (parentIndex !== null
            && this.compare(parentIndex, index) > 0) {
            this.swap(index, parentIndex);
            this.bubbleUp(parentIndex);
        }
    }
    bubbleDown(index) {
        // console.log("bubbleDown", index);
        var leftIndex = this.leftIndex(index);
        var rightIndex = this.rightIndex(index);

        if (leftIndex !== null) {
            var smallerIndex = leftIndex;
            if (rightIndex !== null && this.compare(rightIndex, leftIndex) < 0) {
                smallerIndex = rightIndex;
            }
            // console.log(index, smallerIndex, this.compare(index, smallerIndex));
            if (this.compare(index, smallerIndex) > 0) {
                this.swap(index, smallerIndex);
                this.bubbleDown(smallerIndex);
            }
        }
    }
    compare(i,j) {
        var a = this.arr[i];
        var b = this.arr[j];

        if (a.nextFreeTime < b.nextFreeTime) {
            return -1;
        } else if (a.nextFreeTime > b.nextFreeTime) {
            return 1;
        } else if (a.index < b.index) {
            return -1;
        } else {
            return 1;
        }
    }
};

const processJobs = function() {
    var h = new MinHeap();
    for (var i=0; i<n; i++) {
        h.insert({
            index: i,
            nextFreeTime: 0
        });
    }

    // console.log(h);
    // var j = h.behead();
    // console.log(h);
    // h.insert(j);
    // console.log(h);
    for (var j=0; j<input.length; j++) {
        var nextWorker = h.behead();
        console.log(`${nextWorker.index} ${nextWorker.nextFreeTime}`);
        nextWorker.nextFreeTime += input[j];
        h.insert(nextWorker);
    }
};

reader.on('line', readLine);

function readLine (line) {
    if (line !== "\n") {
        if (typeof n == "undefined") {
            n = parseInt(line.toString().split(" ")[0], 10);
        } else {
            input = line.toString().split(" ").map(function(num){
                return parseInt(num, 10);
            });

            processJobs();
            process.exit();
        }
    }
}
