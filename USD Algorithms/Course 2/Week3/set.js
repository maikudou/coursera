const rank = new Map();
const parents = new Map();
function MakeSet(i) {
    rank.set(i, 0);
    parents.set(i, i);
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
        parents.set(jp, ip);
    } else {
        parents.set(ip, jp);
        if (rank.get(ip) == rank.get(jp)) {
            rank.set(jp, rank.get(ip)+1);
        }
    }
}

for (var i = 1; i <= 60; i++) {
    MakeSet(i);
}
for (var i = 1; i <= 30; i++) {
    Union(i, 2*i);
}
for (var i = 1; i <= 20; i++) {
    Union(i, 3*i);
}
for (var i = 1; i <= 12; i++) {
    Union(i, 5*i);
}
for (var i = 1; i <= 60; i++) {
    Find(i);
}


var maxHeight = 0;
var iterator = parents.keys();
var key;
var parent;

while (key = iterator.next().value) {
    var height = 0;
    parent = key;
    while (parents.get(parent) != parent) {
        height++;
        parent = parents.get(parent);
    }
    maxHeight = Math.max(maxHeight, height);
}
console.log(maxHeight);
