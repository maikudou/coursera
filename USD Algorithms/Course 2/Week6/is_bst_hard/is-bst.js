var readline = require('readline');

process.stdin.setEncoding('utf8');
var reader = readline.createInterface({
    input: process.stdin,
    terminal: false
});

reader.on('line', readLine);

var tree;

function addToTree (line, index) {
    tree[index] = Object.assign({}, tree[index], {
        index: index,
        value: line[0],
        left: line[1],
        right: line[2]
    });
    if (line[1] > 0) {
        tree[line[1]] = Object.assign({}, tree[line[1]], {
            parent: index
        });
    }
    if (line[2] > 0) {
        tree[line[2]] = Object.assign({}, tree[line[2]], {
            parent: index
        });
    }
    // console.log(tree, index);
}

function isBST (index, max, min) {
    var node = tree[index];
    if (!node) {
        return true;
    }
    if (node.value < max || node.value >= min) {
        return false;
    }
    return isBST(node.left, max, node.value) && isBST(node.right, node.value, min);
}

function isBSTInOrder () {
    var node = tree[0];
    var prev = -Infinity;
    var prevDir = "left";
    while (node) {
        if (node.left > -1 && !tree[node.left].visited) {
            prevDir = "left";
            node = tree[node.left];
            continue;
        }
        if (node.visited) {
            if (node.parent) {
                // prevDir = node.parent.right == node.index ? "right" : "left";
            }
            node = tree[node.parent];
            continue;
        } else {
            if (prevDir == "left" && node.value <= prev || prevDir == "right" && node.value < prev) {
                return false;
            }
            prev = node.value;
            node.visited = true;
        }
        if (node.right > -1 && !tree[node.right].visited) {
            prevDir = "right";
            node = tree[node.right];
            continue;
        }
    }
    return true;
}

var count;
var i;

function readLine (line) {
    if (line !== "\n") {
        if (typeof count == "undefined") {
            count = parseInt(line.toString(), 10);
            if (count === 0) {
                console.log("CORRECT");
                process.exit();
            }
            tree = Array(count);
            i=0;
        } else {
            line = line.toString().split(" ").map(function(num) {
                return parseInt(num, 10);
            });
            addToTree(line, i);

            if (++i == count) {
                // console.log(inOrder(0).join(" "));
                // console.log(isBST(0, -Infinity, +Infinity) ? "CORRECT" : "INCORRECT");
                console.log(isBSTInOrder() ? "CORRECT" : "INCORRECT");
                process.exit();
            }
        }
    }
}
