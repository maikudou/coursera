const fs = require("fs");
const path = require("path");
const solutionPath = process.argv[2];
const startTest = process.argv[3];

const {execSync} = require("child_process");

if (!solutionPath) {
    process.exit(1);
}

const testsPath = path.join(path.dirname(path.resolve(solutionPath)), "tests");
//console.log(testsPath);

const tests = fs.readdirSync(testsPath);
var testCount = 0;
var errorCount = 0;

var time = Date.now();
var maxTime = -Infinity;
var minTime = Infinity;
for (var i = 0; i < tests.length; i++) {
    var testTime = Date.now();
    if (tests[i].indexOf(".a") == -1 && (!startTest || tests[i] == startTest)) {
        testCount++;
        var testUrl = path.join(testsPath, tests[i]);
        var rightAnswer = fs.readFileSync(testUrl + ".a").toString().replace(/^\s+|\s+$/g, "").replace(/(\r|\n)+/g, "\n");
        var answer = execSync(`node "${path.resolve(solutionPath)}" < "${testUrl}"`);
        answer = answer.toString().replace(/^\s+|\s+$/g, "").replace(/(\r|\n)+/g, "\n");

        // console.log(answer);
        // console.log(rightAnswer);

        if (String(answer) !== String(rightAnswer)) {
            errorCount++;
            console.error(`Test failed: ${tests[i]}.\nExpected: ${rightAnswer}\nActual:   ${answer}`);
        }
        maxTime = Math.max(maxTime, Date.now() - testTime);
        minTime = Math.min(minTime, Date.now() - testTime);
    }
}

console.log(`Tests:  ${testCount}\nErrors: ${errorCount}\nTime: ${Date.now()-time}\nMax time: ${maxTime}\nMin time: ${minTime}`);
