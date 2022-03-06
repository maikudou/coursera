var readline = require('readline');

process.stdin.setEncoding('utf8');
var reader = readline.createInterface({
    input: process.stdin,
    terminal: false
});

reader.on('line', readLine);

const shortestConnection = function() {
    var distance = 0;
    var currentDistance;
    var nextSource;
    while (nextSource = queue.behead()) {
        // console.log(nextSource);
        distance += nextSource.distance;
        // console.log(distance);
        for (var i = 0; i < queue.arr.length; i++) {
            var coords = queue.arr[i].coords;
            var currentDistance = Math.sqrt(Math.pow(coords[0] - nextSource.coords[0], 2)
                + Math.pow(coords[1] - nextSource.coords[1], 2));
            if (queue.arr[i].distance > currentDistance) {
                queue.insert(Object.assign(queue.arr[i], {
                    distance: currentDistance
                }));
            }
        }
    }
    return distance;
}

var graph;
var n;
var i = 0;
var base;
var queue;

function readLine (line) {
    if (line !== "\n") {
        if (typeof n == "undefined") {
            line = line.toString().split(" ");
            n = parseInt(line[0], 10);
            graph = new Map();
            queue = new MinHeap();
        } else {
            line = line.toString().split(" ").map(function(num) {
                return parseInt(num, 10);
            });
            if (!base) {
                base = [line[0], line[1]];
                queue.insert({
                    id: i+1,
                    coords: [line[0], line[1]],
                    distance: 0
                });
            } else {
                queue.insert({
                    id: i+1,
                    coords: [line[0], line[1]],
                    distance: Infinity
                });
            }

            if (++i >= n) {
                console.log(shortestConnection().toFixed(9));
                process.exitCode = 0;
            }
        }
    }
}

class Heap {
    constructor(arr) {
        this.arr = arr || [];
        this.byId = new Map();
    }
    build() {
        for (var i=this.parentIndex(this.arr.length-1); i >= 0; i--) {
            this.bubbleDown(i);
        }
    }
    check() {
    }
    insert(value) {
        if (!this.byId.has(value.id)) {
            this.arr.push(value);
            this.byId.set(value.id, {
                index: this.arr.length - 1,
                value: value
            });
            this.bubbleUp(this.arr.length - 1);
        } else {
            var prevIndex = this.byId.get(value.id).index;
            this.byId.set(value.id, {
                index: prevIndex,
                value: value
            });
            this.bubbleUp(prevIndex);
        }
    }
    swap(a, b) {
        var value = this.arr[a];
        this.arr[a] = this.arr[b];
        this.arr[b] = value;

        // console.log("swap", a, b);

        this.byId.set(this.arr[a].id, {
            index: a,
            value: this.arr[a]
        });
        this.byId.set(this.arr[b].id, {
            index: b,
            value: this.arr[b]
        });

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
        if (!this.size()) {
            return null;
        }
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
        var leftIndex = this.leftIndex(index);
        var rightIndex = this.rightIndex(index);

        if (leftIndex !== null) {
            var smallerIndex = leftIndex;
            if (rightIndex !== null && this.compare(rightIndex, leftIndex) < 0) {
                smallerIndex = rightIndex;
            }
            if (this.compare(index, smallerIndex) > 0) {
                this.swap(index, smallerIndex);
                this.bubbleDown(smallerIndex);
            }
        }
    }
    compare(i,j) {
        var a = this.arr[i];
        var b = this.arr[j];

        if (a.distance < b.distance) {
            return -1;
        } else if (a.distance > b.distance) {
            return 1;
        } else {
            return 0;
        }
    }
};
