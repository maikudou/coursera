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

const bipartite = function() {
    // console.log(source, target);
    var source = graph.get(1);
    source.color = 1;
    var queue = [source];
    while (queue.length) {
        var node = queue.shift();
        // console.log("=", node);
        var nodeIterator = node.connected.keys();
        var nextNodeKey;
        var nextNode;
        while (nextNodeKey = nodeIterator.next().value) {
            var nextNode = graph.get(nextNodeKey);
            if (nextNode.color == node.color) {
                return 0;
            }
            if (!nextNode.color) {
                nextNode.color = -node.color;
                queue.push(nextNode);
            }
        }
    }
    return 1;
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
                // console.log(Array.from(graph.keys()).join(" "));
                process.exitCode = 0;
            }
        } else {
            line = line.toString().split(" ").map(function(num) {
                return parseInt(num, 10);
            });
            connect(line[0], line[1]);
            connect(line[1], line[0]);
            if (++i == m) {
                console.log(bipartite());
                process.exitCode = 0;
            }
        }
    }
}
