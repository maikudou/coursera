var readline = require('readline');

process.stdin.setEncoding('utf8');
var reader = readline.createInterface({
    input: process.stdin,
    terminal: false
});

var n;
var input;
var headId;
var tree;

reader.on('line', readLine);

const treeHeight = function(head) {
    if (!head) {
        return 0;
    }
    var height = 1;
    var maxHeight = -Infinity;
    var heads = [];
    while (head) {
        if (head.kids.length) {
            heads.push(head);
            head = tree[head.kids.pop()];
            height++;
        } else {
            head = heads.pop();
            height--;
        }
        maxHeight = Math.max(maxHeight, height);
    }
    return maxHeight;
}

const check = function() {
    // console.log(tree);
    return treeHeight(tree[headId]);
}


function readLine (line) {
    if (line !== "\n") {
        if (typeof n == "undefined") {
            n = parseInt(line.toString(), 10);
        } else if (typeof input == "undefined") {
            tree = Array(n);
            index = 0;
            input = line.toString().split(" ").map(function(num){
                var num = parseInt(num, 10);
                if (!tree[index]) {
                    tree[index] = {
                        kids: []
                    }
                }
                if (num === -1) {
                    headId = index;
                } else {
                    if (!tree[num]) {
                        tree[num] = {
                            kids: [index]
                        }
                    } else {
                        tree[num].kids.push(index);
                    }
                }
                index++;
                return num;
            });
            console.log(check());
            process.exit();
        }
    }
}
