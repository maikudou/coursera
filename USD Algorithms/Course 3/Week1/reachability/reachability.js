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

const isConnected = function(u, v) {
    // console.log('isConnected', u, v);
    var current = graph.get(u);
    if (!current) {
        return 0;
    }
    current.visited = true;
    var toGo = Array.from(current.connected.values());
    var next = Array.from(current.connected.values()).shift();
    var vertex;
    while(next) {
        if (next == v) {
            return 1;
        }
        vertex = graph.get(next);
        if (!vertex || vertex.visited) {
            next = toGo.shift();
            continue;
        }
        vertex.visited = true;
        toGo = Array.from(vertex.connected.values()).concat(toGo);
        graph.set(next, vertex);
        next = toGo.shift();
    }
    return  0;
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
        } else {
            line = line.toString().split(" ").map(function(num) {
                return parseInt(num, 10);
            });
            if (i++ == m) {
                console.log(isConnected(line[0], line[1]));
                process.exitCode = 0;
            } else {
                connect(line[0], line[1]);
                connect(line[1], line[0]);
            }
        }
    }
}
