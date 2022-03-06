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
        this.swaps = [];
        if (this.arr.length) {
            this.build();
        }
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
        if (this.arr[a] !== this.arr[b]) {
            this.swaps.push([a, b]);
        }
        var value = this.arr[a];
        this.arr[a] = this.arr[b];
        this.arr[b] = value;
    }
    parentIndex (index) {
        return parseInt((index - 1) / 2);
    }
    leftIndex (index) {
        return index * 2 + 1;
    }
    rightIndex (index) {
        return index * 2 + 2;
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
}

class MinHeap extends Heap {
    bubbleUp(index) {
        var parentIndex = this.parentIndex(index);
        var parent = this.arr[parentIndex];
        if (typeof parent != "undefined" && parent > this.arr[index]) {
            this.swap(index, parentIndex);
            this.bubbleUp(parentIndex);
        }
    }
    bubbleDown(index) {
        var leftIndex = this.leftIndex(index);
        var rightIndex = this.rightIndex(index);
        var left = this.arr[leftIndex];
        var right = this.arr[rightIndex];
        var current = this.arr[index];

        if (typeof left != "undefined") {
            var smallerIndex = leftIndex;
            if (typeof right != "undefined" && right < left) {
                smallerIndex = rightIndex;
            }
            if (current > this.arr[smallerIndex]) {
                this.swap(index, smallerIndex);
                this.bubbleDown(smallerIndex);
            }
        }
    }
    check() {
        for(var i = 0; i < this.arr.length; i++) {
            var leftIndex = this.leftIndex(i);
            var rightIndex = this.rightIndex(i);
            var left = this.arr[leftIndex];
            var right = this.arr[rightIndex];
            if (left < this.arr[i] || right < this.arr[i]) {
                return false;
            }
        }
        return true;
    }
};
class MaxHeap extends Heap {
    bubbleUp(index) {
        var parentIndex = this.parentIndex(index);
        var parent = this.arr[parentIndex];
        if (typeof parent != "undefined"  && parent < this.arr[index]) {
            this.swap(index, parentIndex);
            this.bubbleUp(parentIndex);
        }
    }
    bubbleDown(index) {
        var leftIndex = this.leftIndex(index);
        var rightIndex = this.rightIndex(index);
        var left = this.arr[leftIndex];
        var right = this.arr[rightIndex];
        var current = this.arr[index];

        if (typeof left != "undefined") {
            var smallerIndex = leftIndex;
            if (typeof right != "undefined" && right > left) {
                smallerIndex = rightIndex;
            }
            if (current < this.arr[smallerIndex]) {
                this.swap(index, smallerIndex);
                this.bubbleDown(smallerIndex);
            }
        }
    }
    check() {
        for(var i = 0; i < this.arr.length; i++) {
            var leftIndex = this.leftIndex(i);
            var rightIndex = this.rightIndex(i);
            var left = this.arr[leftIndex];
            var right = this.arr[rightIndex];
            if (left > this.arr[i] || right > this.arr[i]) {
                return false;
            }
        }
        return true;
    }
};

const buildHeap = function() {
    var h = new MinHeap(input);
    console.log(h.swaps.length);
    for (var i = 0; i < h.swaps.length; i++) {
        process.stdout.write(`${h.swaps[i].join(" ")}\n`);
    }
    // console.log(h.swaps.map(function(swap){
    //     return swap.join(" ");
    // }).join("\n"))
    // console.log(h.check());
};

reader.on('line', readLine);

function readLine (line) {
    if (line !== "\n") {
        if (typeof n == "undefined") {
            n = parseInt(line.toString(), 10);
        } else {
            input = line.toString().split(" ").map(function(num){
                return parseInt(num, 10);
            });
            // console.log(input.length);
            // console.log("");
            // for(var i = 0; i< input.length; i++){
            //     console.log(input[i]);
            // }

            buildHeap();
            process.exit();
        }
    }
}
