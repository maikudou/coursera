var readline = require('readline');

process.stdin.setEncoding('utf8');
var reader = readline.createInterface({
    input: process.stdin,
    terminal: false
});

var input;

reader.on('line', readLine);

const starters = new Set(["{", "[", "("]);
const enders = new Map();
enders.set("}", "{");
enders.set("]", "[");
enders.set(")", "(");

const check = function(input) {
    var stack = [];
    // console.log(input);
    var result = "Success";
    for (var i = 0; i < input.length; i++) {
        if (starters.has(input[i])) {
            // console.log(1);
            stack.push({
                index: i+1,
                bracket: input[i]
            });
        } else if (enders.has(input[i])) {
            if (stack.length == 0) {
                result = i+1;
                break;
            }
            var bracket = input[i];
            var lastBracket = stack[stack.length-1];
            // console.log(lastBracket, bracket, enders.get(bracket), i);
            if (enders.get(bracket) == lastBracket.bracket) {
                stack.pop();
            } else {
                result = i + 1;
                break;
            }
        }
    }

    if (result == "Success" && stack.length != 0) {
        result = stack[stack.length-1].index;
    }
    return result;
}


function readLine (line) {
    if (line !== "\n") {
        if (typeof input == "undefined") {
            input = line.toString();
            console.log(check(input));
            process.exit();
        }
    }
}
