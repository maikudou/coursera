var readline = require('readline');

process.stdin.setEncoding('utf8');
var reader = readline.createInterface({
    input: process.stdin,
    terminal: false
});

reader.on('line', readLine);

var input;
var ops;
var digits;

var maxs = [];
var mins = [];

function minAndMax(i, j) {
    if (typeof maxs[i][j] != "undefined") {
        return  {
            max: maxs[i][j],
            min: mins[i][j]
        }
    }
    var min = +Infinity;
    var max = -Infinity;
    for (var k = i; k < j; k++) {
        var Mm = minAndMax(i, k);
        var Mmk = minAndMax(k+1, j);
        var a,b,c,d;
        switch (ops[k]) {
            case "+":
                a = Mm.max + Mmk.max;
                b = Mm.min + Mmk.min;
                c = Mm.max + Mmk.min;
                d = Mm.min + Mmk.max;
                break;
            case "-":
                a = Mm.max - Mmk.max;
                b = Mm.min - Mmk.min;
                c = Mm.max - Mmk.min;
                d = Mm.min - Mmk.max;
                break;
            case "*":
                a = Mm.max * Mmk.max;
                b = Mm.min * Mmk.min;
                c = Mm.max * Mmk.min;
                d = Mm.min * Mmk.max;
                break;
        }
        max = Math.max(max, a, b, c, d);
        min = Math.min(min, a, b, c, d);
    }
    return  {
        max: max,
        min: min
    }
}

function parentheses() {
    var regexp = /\D?(\d+)\D?/g;
    digits = [];
    var digit

    while(digit = regexp.exec(input)) {
        digits.push(parseInt(digit[1], 10));
    }

    regexp = /([\+\-\*])/g;
    ops = [];
    var op

    while(op = regexp.exec(input)) {
        ops.push(op[1]);
    }

    for (var i=0; i<digits.length; i++) {
        maxs[i] = [];
        mins[i] = [];
        maxs[i][i] = digits[i];
        mins[i][i] = digits[i];
    }

    for (var s = 1; s < digits.length; s++) {
        for (i = 1; i <= digits.length-s; i++) {
            var j = i + s;
            var minmax = minAndMax(i-1, j-1);
            maxs[i-1][j-1] = minmax.max;
            mins[i-1][j-1] = minmax.min;
        }
    }

    return maxs[0][digits.length-1];
}

function readLine (line) {
    if (line !== "\n") {
        if (typeof input == "undefined") {
            input = line.toString();
            console.log(parentheses());
            process.exit();
        }
    }
}
