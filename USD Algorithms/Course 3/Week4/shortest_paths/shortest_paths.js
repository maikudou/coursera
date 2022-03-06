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

const shortestPaths = function(start) {
    var lastRelaxed;
    var startFound = false;
    var relaxed = new Set();
    for (var i=0; i<=graph.size; i++) {
        var verticesIterator = graph.values();
        var nextVertex;
        while (nextVertex = verticesIterator.next().value) {
            if (!startFound && nextVertex.id == start) {
                nextVertex.distance = 0;
                startFound = true;
            }
            if (!startFound) {
                continue;
            }
            if (nextVertex.distance == Infinity) {
                continue;
            }

            var queue = [nextVertex];

            while(queue.length) {
                var nextQueue = queue.shift();
                var nodeIterator = nextQueue.connected.keys();
                var nextNodeKey;
                var nextNode;

                while (nextNodeKey = nodeIterator.next().value) {
                    var nextNode = graph.get(nextNodeKey);
                    if (i == 0 && nextNode.distance == Infinity) {
                        queue.push(nextNode);
                    }

                    var newDistance = nextQueue.distance + distances.get(nextQueue.id).get(nextNodeKey);

                    if (nextNode.distance > newDistance) {
                        // console.log(nextNode.distance);
                        nextNode.distance = newDistance;
                        nextNode.prev = nextQueue;
                        lastRelaxed = nextNode;
                        if (i==graph.size) {
                            relaxed.add(nextNode.id);
                        }
                        // console.log("-", lastRelaxed, newDistance);
                    }
                }
            }
        }
    }
    var IA = new Set();
    // console.log(relaxed);
    if (relaxed.size) {
        var relaxedIterator = relaxed.keys();
        var nextVertexId;
        var nextVertex;
        var visited = new Set();
        while (nextVertexId = relaxedIterator.next().value) {
            nextVertex = graph.get(nextVertexId);

            var queue = [nextVertex];

            while(queue.length) {
                var nextQueue = queue.shift();
                var nodeIterator = nextQueue.connected.keys();
                var nextNodeKey;
                var nextNode;

                while (nextNodeKey = nodeIterator.next().value) {
                    var nextNode = graph.get(nextNodeKey);
                    if (!IA.has(nextNodeKey)) {
                        queue.push(nextNode);
                    }
                    IA.add(nextNodeKey);
                }
            }
        }
    }
    for (var i=1; i<=n; i++) {
        var node = graph.get(i);
        if (node.distance == Infinity) {
            console.log("*");
            continue;
        }
        if (IA.has(node.id)) {
            console.log("-");
            continue;
        }
        console.log(node.distance);
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
        } else {
            line = line.toString().split(" ").map(function(num) {
                return parseInt(num, 10);
            });
            if (++i <= m) {
                connect(line[0], line[1], line[2]);
            } else {
                shortestPaths(line[0]);
                process.exitCode = 0;
            }
        }
    }
}
