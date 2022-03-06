var readline = require('readline');

process.stdin.setEncoding('utf8');
var reader = readline.createInterface({
    input: process.stdin,
    terminal: false
});

reader.on('line', readLine);

var n;
var list = [];

var sorter = function(a,b) {
    if (a[0] > b[0]) {
        return 1;
    }
    if (a[0] < b[0]) {
        return -1;
    }
    if (a[1] > b[1]) {
        return 1;
    }
    if (a[1] < b[1]) {
        return -1;
    }
    return 0;
};

var binaryHighPass = function(x, y, l, r) {
    if (l > r) {
        return r;
    }
    if (l == r) {
        var compare = sorter(list[l], [x,y]);
        if (compare >= 0) {
            return l;
        } else {
            return Math.max(0, l-1);
        }
    } else {
        middle = l + Math.floor((r - l)/2);
        var middleCompare = sorter(list[middle], [x,y]);
        var lCompare = sorter(list[l], [x,y]);
        var rCompare = sorter(list[r], [x,y]);
        if (rCompare < 0) {
            return -1;
        }
        if (lCompare >= 0) {
            return l;
        }
        if (middleCompare == 0) {
            return middle;
        }
        if (rCompare == 0) {
            return r;
        }
        if (middleCompare > 0) {
            return binaryHighPass(x, y, l, middle-1);
        } else {
            return binaryHighPass(x, y, middle+1, r);
        }
    }
};

var binaryLowPass = function(x, y, l, r) {
    if (l > r) {
        return r;
    }
    if (l == r) {
        if (x == list[l][0]) {
            return l;
        }
        var compare = sorter(list[l], [x,y]);
        if (compare <= 0) {
            return l;
        } else {
            return Math.min(list.length-1, l+1);
        }
    } else {
        middle = l + Math.floor((r - l)/2);
        var middleCompare = sorter(list[middle], [x,y]);
        var lCompare = sorter(list[l], [x,y]);
        var rCompare = sorter(list[r], [x,y]);
        if (lCompare > 0) {
            return -1;
        }
        if (rCompare <= 0) {
            return r;
        }
        if (middleCompare == x) {
            return middle;
        }
        if (lCompare == x) {
            return l;
        }
        if (middleCompare > 0) {
            return binaryLowPass(x, y, l, middle-1);
        } else {
            return binaryLowPass(x, y, middle+1, r);
        }
    }
};

var iterations = 0;

var minimumDistance = function(l, r) {
    if (r <= l) {
        return Infinity;
    }

    if (r - l == 1) {
        var a = list[r];
        var b = list[l];
        return Math.pow((a[0]-b[0]), 2) + Math.pow((a[1]-b[1]), 2);
    }

    var median = l + Math.floor((r-l)/2);
    var leftMinumun = minimumDistance(l, median);
    var rightMinimun = minimumDistance(median+1, r);

    var currentMinimum = Math.min(leftMinumun, rightMinimun);

    // console.log("currentMinimum", currentMinimum);

    var medianX = list[median][0];
    var medianY = list[median][1];

    var maxLeftIndex = binaryHighPass(currentMinimum - medianX, currentMinimum - medianY, l, median);
    var maxRightIndex = binaryLowPass(currentMinimum - medianX, currentMinimum - medianY, median+1, r);

    // console.log(medianX, maxLeftIndex, maxRightIndex);

    if (maxLeftIndex == -1) {
        maxLeftIndex = median;
    }
    if (maxRightIndex == -1 ) {
        maxRightIndex = median;
    }

    var localMinimun = Infinity;
    for (var i = maxLeftIndex; i <= maxRightIndex; i++) {
        for (var j = maxLeftIndex; j <= maxRightIndex; j++) {
            if (i == j) {
                continue;
            }
            iterations++;
            var a = list[i];
            var b = list[j];
            var distance = Math.pow((a[0]-b[0]), 2) + Math.pow((a[1]-b[1]), 2);
            localMinimun = Math.min(localMinimun, distance);
        }
    }

    return Math.min(localMinimun, currentMinimum);
}

function readLine (line) {
    if (line !== "\n") {
        if (typeof n == "undefined") {
            n = parseInt(line.toString(), 10);
        } else {
            list.push(line.toString().split(" ").map(function(num){
                return parseInt(num, 10);
            }));

            if (list.length == n) {
                list = list.sort(sorter);
                // console.log(list);
                console.log(Math.sqrt(minimumDistance(0, list.length-1)).toFixed(4));
                // console.log(iterations);
                process.exit();
            }
        }
    }
}
