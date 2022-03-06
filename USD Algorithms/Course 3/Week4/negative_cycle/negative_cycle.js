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

const hasNegativeCycle = function() {
    var lastRelaxed;
    for (var i=0; i<graph.size; i++) {
        var wasRelaxed;
        var verticesIterator = graph.values();
        var nextVertex;
        while (nextVertex = verticesIterator.next().value) {
            if (nextVertex.distance == Infinity) {
                nextVertex.distance = 0;
            }
            var queue = [nextVertex];

            while(queue.length) {
                var nextQueue = queue.shift();
                var nodeIterator = nextQueue.connected.keys();
                var nextNodeKey;
                var nextNode;

                while (nextNodeKey = nodeIterator.next().value) {
                    var nextNode = graph.get(nextNodeKey);
                    if (nextNode.distance == Infinity) {
                        queue.push(nextNode);
                    }

                    var newDistance = nextQueue.distance + distances.get(nextQueue.id).get(nextNodeKey);

                    if (nextNode.distance > newDistance) {
                        // console.log(nextNode.distance);
                        wasRelaxed = true;
                        nextNode.distance = newDistance;
                        nextNode.prev = nextQueue;
                        lastRelaxed = nextNode;
                        // console.log("-", lastRelaxed, newDistance);
                    }
                }
            }
        }
        if (!wasRelaxed) {
            break;
        }
    }
    if (lastRelaxed) {
        var prev = lastRelaxed.prev;
        for (var i=0; i<graph.size; i++) {
            if (!prev) {
                return 0;
            }
            prev = prev.prev;
        }
        var toFind = prev.id;
        prev = prev.prev;
        for (var i=0; i<graph.size; i++) {
            if (!prev) {
                return 0;
            }
            if (prev.id == toFind) {
                return 1;
            }
            prev = prev.prev;
        }
    }
    return 0;
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
            if (m == 0 || n == 0) {
                console.log(0);
                process.exit();
            }
        } else {
            line = line.toString().split(" ").map(function(num) {
                return parseInt(num, 10);
            });
            connect(line[0], line[1], line[2]);
            if (++i == m) {
                console.log(hasNegativeCycle());
                process.exit();
            }
        }
    }
}
