var readline = require('readline');

process.stdin.setEncoding('utf8');
var reader = readline.createInterface({
    input: process.stdin,
    terminal: false
});

reader.on('line', readLine);

var n;
var sum = 1;

function bigIntModulo(a, b) {
    while (a.length > 15) {
        var part = a.substring(0, 15);
        a = (part % b) +  a.substring(15);
    }

    return a % b;
}

function fibonacciPeriod(m, a, aInt, b) {
    var periodTable = [0, 1];
    var periodLength = null;
    var i = 2;
    while (i <= aInt) {
        periodTable[i] = (periodTable[i-1] + periodTable[i-2]) % m;
        if (periodTable[i] == 1 && periodTable[i-1] == 0) {
            periodLength = i-1;
            break;
        }
        i++;
    }
    if (periodLength) {
        periodTable = periodTable.slice(0, periodLength);
        var modulo = bigIntModulo(a, periodLength);
        var divisor = (aInt - modulo)/periodLength;

        if (b <= periodLength) {
            divisor--;
        } else {
            divisor -= Math.floor(b/periodLength);
            b = bigIntModulo(b, periodLength);
        }

        if (divisor < 0) {
            divisor = 0;
        }

        var sum = periodTable.slice(b, periodLength).reduce(function(value, sum) {
            return (sum + value) % 10;
        }, 0);

        if (divisor) {
            var fullSum = periodTable.reduce(function(value, sum) {
                return (sum + value) % 10;
            }, 0);

            fullSum = (fullSum * divisor) % 10;
            sum += fullSum;
        }

        sum = periodTable.slice(0, modulo+1).reduce(function(value, sum) {
            return (sum + value) % 10;
        }, sum);

        return sum % 10;
    } else {
        var sum = periodTable.slice(b, aInt+1).reduce(function(value, sum) {
            return sum + value;
        }, 0);
        return sum % 10;
    }
}

function readLine (line) {
    if (line !== "\n") {
        if (typeof n == "undefined") {
            line = line.toString().split(" ");
            a = line[1];
            aInt = parseInt(a, 10);
            b = parseInt(line[0]);
            console.log(fibonacciPeriod(10, a, aInt, b));
            process.exit();
        }
    }
}
