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

var inOrderArr = [];
function inOrder (index) {
    var node = tree[index];
    // console.log(index, node);
    if (!node) {
        return;
    }
    if (node.left > -1) {
        inOrder(node.left);
    }
    inOrderArr.push(node.value);
    if (node.right > -1) {
        inOrder(node.right);
    }
    return inOrderArr;
}

function inOrderNR () {
    var node = tree[0];
    while (node) {
        // console.log(node);
        if (node.left > -1 && !tree[node.left].visited) {
            node = tree[node.left];
            continue;
        }
        if (node.visited) {
            node = tree[node.parent];
            continue;
        } else {
            process.stdout.write(`${node.value} `);
            node.visited = true;
        }
        if (node.right > -1 && !tree[node.right].visited) {
            node = tree[node.right];
            continue;
        }
    }
    process.stdout.write("\n");
}

var preOrderArr = [];
function preOrder (index) {
    var node = tree[index];
    // console.log(index, node);
    if (!node) {
        return;
    }
    preOrderArr.push(node.value);
    if (node.left > -1) {
        preOrder(node.left);
    }
    if (node.right > -1) {
        preOrder(node.right);
    }
    return preOrderArr;
}

function preOrderNR () {
    var node = tree[0];
    while (node) {
        // console.log(node);
        if (node.POvisited && (!tree[node.right] || tree[node.right].POvisited)) {
            node = tree[node.parent];
            continue;
        } else if (!node.POvisited) {
            process.stdout.write(`${node.value} `);
            node.POvisited = true;
        }
        if (node.left > -1 && !tree[node.left].POvisited) {
            node = tree[node.left];
            continue;
        }
        if (node.right > -1 && !tree[node.right].POvisited) {
            node = tree[node.right];
            continue;
        }
    }
    process.stdout.write("\n");
}

var postOrderArr = [];
function postOrder (index) {
    var node = tree[index];
    // console.log(index, node);
    if (!node) {
        return;
    }
    if (node.left > -1 && !node.left.visited) {
        postOrder(node.left);
        node.left.visited = true;
    }
    if (node.right > -1 && !node.right.visited) {
        postOrder(node.right);
        node.right.visited = true;
    }
    postOrderArr.push(node.value);
    return postOrderArr;
}

function postOrderNR () {
    postOrderArr = [];
    var node = tree[0];
    while (node) {
        // console.log(node);
        if (node.left > -1 && !tree[node.left].PoOvisited) {
            node = tree[node.left];
            continue;
        }
        if (node.right > -1 && !tree[node.right].PoOvisited) {
            node = tree[node.right];
            continue;
        }
        if (node.PoOvisited && (!tree[node.right] || tree[node.right].PoOvisited)) {
            node = tree[node.parent];
            continue;
        } else if (!node.PoOvisited) {
            process.stdout.write(`${node.value} `);
            node.PoOvisited = true;
        }
    }
    process.stdout.write("\n");
}

var count;
var i;

function readLine (line) {
    if (line !== "\n") {
        if (typeof count == "undefined") {
            count = parseInt(line.toString(), 10);
            tree = Array(count);
            i=0;
        } else {
            line = line.toString().split(" ").map(function(num) {
                return parseInt(num, 10);
            });
            addToTree(line, i);

            if (++i == count) {
                // console.log(inOrder(0).join(" "));
                inOrderNR();
                // console.log(preOrder(0).join(" "));
                preOrderNR();
                // console.log(postOrder(0).join(" "));
                postOrderNR();
                process.exit();
            }
        }
    }
}
