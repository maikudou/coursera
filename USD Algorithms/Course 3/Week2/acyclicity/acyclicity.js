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

var count = 0;

const explore = function(v) {
    // console.log("explore", v);
    const vertex = graph.get(v);
    if (!vertex) {
        return 0;
    }
    // console.log("=", v, vertex.visited, vertex.pre, vertex.post);
    if (vertex.visited) {
        return !vertex.post ? 1 : 0;
    }
    vertex.pre = pre++;
    vertex.visited = true;

    const toGo = Array.from(vertex.connected.values());
    var next = toGo.shift();
    while (next) {
        // console.log(">", next);
        var exploreResult = explore(next);
        if (exploreResult) {
            // console.log(v, next);
            return 1;
        }
        next = toGo.shift();
    }

    vertex.post = post++;

    return 0;
}

const hasCycles = function() {
    var startsIterator = graph.keys();
    var startVertexKey = startsIterator.next().value;
    if (!startVertexKey) {
        return 0;
    }
    // console.log("!");
    while (startVertexKey) {
        // console.log(startVertexKey);
        var result = explore(startVertexKey);
        if (result) {
            return 1;
        }
        startVertexKey = startsIterator.next().value;
    }
    return 0;
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
            for(var j=0; j<m; j++) {
                graph.set(j+1, {connected: new Set()});
            }
        } else {
            line = line.toString().split(" ").map(function(num) {
                return parseInt(num, 10);
            });
            connect(line[0], line[1]);
            if (++i == m) {
                console.log(hasCycles());
                process.exitCode = 0;
            }
        }
    }
}
