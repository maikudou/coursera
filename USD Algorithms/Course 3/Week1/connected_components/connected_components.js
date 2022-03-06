var readline = require('readline');

process.stdin.setEncoding('utf8');
var reader = readline.createInterface({
    input: process.stdin,
    terminal: false
});

reader.on('line', readLine);

const connect = function(u, v) {
    // console.log("connect", u, v);
    graph.get(u).connected.add(v);
}

var componentCount = 0;

const explore = function(v) {
    vertex = graph.get(v);
    if (vertex.visited) {
        return;
    }
    vertex.visited = true;
    vertex.component = componentCount;
    graph.set(v, vertex);
    var toGo = Array.from(vertex.connected.values());
    var next = toGo.shift();
    while(next) {
        explore(next);
        next = toGo.shift();
    }
}

const getComponentsCount = function() {
    var toGo = Array.from(graph.keys());
    var next = toGo.shift();
    while(next) {
        var vertex = graph.get(next);
        // console.log(vertex);
        if (vertex.visited) {
            next = toGo.shift();
            continue;
        }
        componentCount++;
        explore(next);
        next = toGo.shift();
    }
    return componentCount;
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
            if (m == 0) {
                console.log(n);
                process.exitCode = 0;
            }
            graph = new Map();
            for (var j=0; j<n;j++) {
                graph.set(j+1, {connected: new Set()});
            }
            // console.log(graph);
        } else {
            line = line.toString().split(" ").map(function(num) {
                return parseInt(num, 10);
            });
            // console.log(i);
            connect(line[0], line[1]);
            connect(line[1], line[0]);
            if (++i == m) {
                // console.log(graph);
                console.log(getComponentsCount());
                process.exitCode = 0;
            }
        }
    }
}
