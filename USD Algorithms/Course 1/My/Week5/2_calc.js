var readline = require('readline');

process.stdin.setEncoding('utf8');
var reader = readline.createInterface({
    input: process.stdin,
    terminal: false
});

reader.on('line', readLine);

var sorter = function(a,b) {
    if (a > b) {
        return 1;
    }
    if (a < b) {
        return -1;
    }
    return 0;
};

var n;

var minimumsBackSteps = [
    0, 0, 1, 1
];

var minimumLengths = [0, 1, 2, 2];

var path = [1];

function minOperations(n) {
    for (var i = 4; i <= n; i++) {
        var possibleMins = [minimumLengths[i-1] + 1];
        var min;
        var dev3 = false;
        var dev2 = false;
        if (!(i % 3)) {
            dev3 = minimumLengths[i/3] + 1;
            possibleMins.push(dev3);
        }
        if (!(i % 2)) {
            dev2 = minimumLengths[i/2] + 1;
            possibleMins.push(dev2);
        }

        var min = Math.min.apply(null, possibleMins);
        if (dev3 && min == dev3) {
            minimumsBackSteps[i] = i/3;
        } else if (dev2 && min == dev2) {
            minimumsBackSteps[i] = i/2;
        } else {
            minimumsBackSteps[i] = i-1;
        }
        minimumLengths[i] = min;
    }
}

function readLine (line) {
    if (line !== "\n") {
        if (typeof n == "undefined") {
            n = parseInt(line.toString(), 10);
            var time = Date.now();
            minOperations(n);
            // console.log(process.memoryUsage().heapUsed/1024/1024);
            console.log(minimumLengths[n]-1);

            var result = [];
            var step = minimumsBackSteps[n];

            while (step) {
                result.unshift(step);
                step = minimumsBackSteps[step];
            }
            result.push(n);

            for (let entry of result) {
                process.stdout.write(`${entry} `);
            }
            process.stdout.write("\n");

            // console.log(Date.now() - time);
            process.exit();
        }
    }
}
