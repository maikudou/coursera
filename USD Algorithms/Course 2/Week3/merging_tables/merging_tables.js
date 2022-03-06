var readline = require('readline');

process.stdin.setEncoding('utf8');
var reader = readline.createInterface({
    input: process.stdin,
    terminal: false
});

const rank = new Map();
const parents = new Map();
const sizes = new Map();

var n;
var m;
var maxSize;
var maxSizes = [];
var set;

function MakeSet(i, size) {
    maxSize = Math.max(maxSize, size);
    rank.set(i, 0);
    parents.set(i, i);
    sizes.set(i, size);
}

function Find(n) {
    if (n != parents.get(n)) {
        parents.set(n, Find(parents.get(n)));
    }
    return parents.get(n);
}

function Union(i, j) {
    const ip = Find(i);
    const jp = Find(j);
    if (ip == jp) {
        return;
    }
    if (rank.get(ip) > rank.get(jp)) {
        sizes.set(ip, sizes.get(ip) + sizes.get(jp));
        sizes.set(jp, 0);
        maxSize = Math.max(maxSize, sizes.get(ip));
        // if (isNaN(jp)) {
        //     console.log(jp);
        //     process.exit(1);
        // }
        parents.set(jp, ip);
    } else {
        sizes.set(jp, sizes.get(jp) + sizes.get(ip));
        sizes.set(ip, 0);
        maxSize = Math.max(maxSize, sizes.get(jp));
        // if (isNaN(ip)) {
        //     console.log(jp);
        //     process.exit(1);
        // }
        parents.set(ip, jp);
        if (rank.get(ip) == rank.get(jp)) {
            rank.set(jp, rank.get(ip)+1);
        }
        // if (maxSize != maxSizes[maxSizes.length-1]) {
        //     maxSizes.push(maxSize);
        // }
    }
}

reader.on('line', readLine);

var lineIndex = 0;
function readLine (line) {
    if (line !== "\n") {
        if (typeof n == "undefined") {
            line = line.toString().split(" ");
            n = parseInt(line[0], 10);
            m = parseInt(line[1], 10);
        } else if (typeof maxSize == "undefined") {
            i = 1;
            maxSize = 0;
            line.toString().split(" ").map(function(num){
                MakeSet(i++, parseInt(num, 10));
            });
        } else {
            line = line.toString().split(" ");
            // console.log(line[0], line[1]);
            Union(parseInt(line[0], 10), parseInt(line[1], 10));
            // console.log(parseInt(line[0], 10), parseInt(line[1], 10));
            console.log(maxSize);
            // console.log(parents);
            // console.log(sizes);
            if (lineIndex++ == m-1) {
                // console.log(maxSizes.join("\n"));
                // console.log(Array.from(parents.keys()).join(" "));
                // console.log(parents.size);
                process.exit();
            }
        }
    }
}
