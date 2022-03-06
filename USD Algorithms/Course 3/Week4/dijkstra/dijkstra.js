var readline = require('readline');

process.stdin.setEncoding('utf8');
var reader = readline.createInterface({
    input: process.stdin,
    terminal: false
});

reader.on('line', readLine);

const connect = function(u, v, distance) {
    if(!graph.has(u)) {
        graph.set(u, {
            id: u,
            connected: new Set(),
            distance: Infinity
        });
    }
    graph.get(u).connected.add(v);

    if (!distances.has(u)) {
        distances.set(u, new Map());
    }

    distances.get(u).set(v, distance);
}

var pre = 1;
var post = 1;

var result = [];

const shortestPath = function(source, target) {
    var source = graph.get(source);
    if (!source || !target) {
        return -1;
    }
    source.distance = 0;
    var queue = new MinHeap();
    queue.insert(source);
    var targetWasFound = false;
    while (queue.size()) {
        var node = queue.behead();
        var nodeIterator = node.connected.keys();
        var nextNodeKey;
        var nextNode;

        // console.log(">", node);

        while (nextNodeKey = nodeIterator.next().value) {
            var nextNode = graph.get(nextNodeKey);
            var newDistance = node.distance + distances.get(node.id).get(nextNodeKey);

            // console.log("=", nextNode, newDistance);

            if (nextNodeKey == target) {
                targetWasFound = true;
            }

            if (nextNode.distance > newDistance) {
                nextNode.distance = newDistance;
                queue.insert(nextNode);
            }
        }
    }
    var targetDistance = graph.get(target).distance;
    // console.log(targetDistance, targetWasFound, source, target);
    return targetWasFound ? targetDistance : (source.id == target ? 0 : -1);
}

var graph;
var distances;
var n;
var m;
var w;
var i = 0;

function readLine (line) {
    if (line !== "\n") {
        if (typeof n == "undefined") {
            line = line.toString().split(" ");
            n = parseInt(line[0], 10);
            m = parseInt(line[1], 10);
            w = parseInt(line[2], 10);
            graph = new Map();
            distances = new Map();
            for(var j=n; j>0; j--) {
                graph.set(j, {
                    id: j,
                    connected: new Set(),
                    distance: Infinity
                });
            }
            // if (m == 0 || n == 0) {
            //     console.log(-1);
            //     process.exitCode = 0;
            // }
        } else {
            line = line.toString().split(" ").map(function(num) {
                return parseInt(num, 10);
            });
            if (++i <= m) {
                connect(line[0], line[1], line[2]);
            } else {
                console.log(shortestPath(line[0], line[1]));
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
