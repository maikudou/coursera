var readline = require('readline');

process.stdin.setEncoding('utf8');
var reader = readline.createInterface({
    input: process.stdin,
    terminal: false
});

reader.on('line', readLine);

const connect = function(u, v) {
    // console.log(u,v);
    if(!graph.has(u)) {
        graph.set(u, {connected: new Set()});
    }
    graph.get(u).connected.add(v);
}

var pre = 1;
var post = 1;

var result = [];

const explore = function(v, backtrack) {
    const vertex = graph.get(v);
    if (!vertex) {
        return 0;
    }
    if (vertex.visited) {
        return !vertex.post ? 1 : 0;
    }
    vertex.pre = pre++;
    vertex.visited = true;

    const toGo = Array.from(vertex.connected.values());
    // console.log(toGo, v);
    var next = toGo.shift();
    while (next) {
        // console.log(">", next);
        var exploreResult = explore(next, v);
        if (exploreResult) {
            // console.log(v, next);
            return 1;
        }
        next = toGo.shift();
    }

    result.unshift(v);

    vertex.post = post++;

    return 0;
}

const toposort = function() {
    var startsIterator = graph.keys();
    var startVertexKey = startsIterator.next().value;
    if (!startVertexKey) {
        return result;
    }
    // console.log("!", graph);
    while (startVertexKey) {
        // console.log(startVertexKey);
        var exploreResult = explore(startVertexKey);
        if (exploreResult) {
            return result;
        }
        startVertexKey = startsIterator.next().value;
    }
    return result;
}

var graph;
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
            for(var j=n; j>0; j--) {
                graph.set(j, {connected: new Set()});
            }
            if (m == 0) {
                console.log(Array.from(graph.keys()).join(" "));
                process.exitCode = 0;
            }
        } else {
            line = line.toString().split(" ").map(function(num) {
                return parseInt(num, 10);
            });
            connect(line[0], line[1]);
            if (++i == m) {
                console.log(toposort().join(" "));
                process.exitCode = 0;
            }
        }
    }
}
