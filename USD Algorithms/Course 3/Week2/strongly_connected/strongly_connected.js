var readline = require('readline');

process.stdin.setEncoding('utf8');
var reader = readline.createInterface({
    input: process.stdin,
    terminal: false
});

reader.on('line', readLine);

const connect = function(graph, u, v) {
    // console.log(u,v);
    if(!graph.has(u)) {
        graph.set(u, {connected: new Set()});
    }
    graph.get(u).connected.add(v);
}

const explore = function(graph, counter, postOrderArray, v) {
    const vertex = graph.get(v);
    if (!vertex || vertex.visited) {
        return;
    }
    vertex.pre = counter++;
    vertex.visited = true;

    const toGo = Array.from(vertex.connected.values());
    // console.log(toGo, v);
    var next = toGo.shift();
    while (next) {
        // console.log(">", next);
        explore(graph, counter, postOrderArray, next);
        next = toGo.shift();
    }
    postOrderArray.push(v);
    vertex.post = counter++;
}

const countSCC = function() {
    var reverseCounter = 1;
    var reversePostOrderArray = [];

    var count = 0;

    var startsIterator = reverseGraph.keys();
    var startVertexKey = startsIterator.next().value;
    if (!startVertexKey) {
        return 0;
    }
    // console.log("!", reverseGraph);
    while (startVertexKey) {
        // console.log(startVertexKey);
        explore(reverseGraph, reverseCounter, reversePostOrderArray, startVertexKey);
        startVertexKey = startsIterator.next().value;
    }

    var next = reversePostOrderArray.pop();
    var vertex;

    while (next) {
        vertex = graph.get(next);
        if (vertex.visited) {
            next = reversePostOrderArray.pop()
            continue;
        }
        count++;
        explore(graph, 1, [], next);
        next = reversePostOrderArray.pop()
    }

    return count;
}

var graph;
var reverseGraph;

var n;
var m;
var i = 0;

function readLine (line) {
    if (line !== "\n") {
        if (typeof n == "undefined") {
            line = line.toString().split(" ");
            n = parseInt(line[0], 10);
            m = parseInt(line[1], 10);
            graph = new Map();
            reverseGraph = new Map();
            for(var j=n; j>0; j--) {
                graph.set(j, {connected: new Set()});
                reverseGraph.set(j, {connected: new Set()});
            }
            if (m == 0) {
                console.log(n);
                process.exitCode = 0;
            }
        } else {
            line = line.toString().split(" ").map(function(num) {
                return parseInt(num, 10);
            });
            connect(graph, line[0], line[1]);
            connect(reverseGraph, line[1], line[0]);
            if (++i == m) {
                console.log(countSCC());
                process.exitCode = 0;
            }
        }
    }
}
