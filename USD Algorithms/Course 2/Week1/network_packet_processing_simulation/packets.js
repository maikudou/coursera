var readline = require('readline');

process.stdin.setEncoding('utf8');
var reader = readline.createInterface({
    input: process.stdin,
    terminal: false
});

var S, n;
var i = 0;
var bufferLength = 0;
var outputQueue = [];
var head, tail;
var lastProcessStartTime = 0;

reader.on('line', readLine);

const processPacket = function(index, arrivalTime, processingTime) {
    cleanupPackets(arrivalTime);
    var packet = {
        index,
        arrivalTime,
        processingTime,
        processedTime: arrivalTime + processingTime
    };
    if (bufferLength < S) {
        bufferLength++;
    } else {
        packet.processedTime = -1;
    }
    if (!head) {
        head = packet;
    }
    if (!tail) {
        tail = packet;
    } else {
        tail.next = packet;
        tail = packet;
    }
    // outputQueue.push(packet);
}

const cleanupPackets = function(time) {
    // console.log(">>", time, outputQueue);

    while (head
        && (Math.max(lastProcessStartTime, head.arrivalTime) + head.processingTime) <= time) {
        if (head.processedTime == -1) {
            console.log(-1);
        } else {
            startTime = Math.max(lastProcessStartTime, head.arrivalTime);
            console.log(startTime);
            lastProcessStartTime = startTime + head.processingTime;
        }
        head = head.next;
        bufferLength--;
    }
    // console.log("<<",outputQueue, lastProcessStartTime);
}

function readLine (line) {
    if (line !== "\n") {
        if (typeof n == "undefined") {
            line = line.toString().split(" ");
            S = parseInt(line[0], 10);
            n = parseInt(line[1], 10);
        } else if (i < n) {
            line = line.toString().split(" ");
            processPacket(i++, parseInt(line[0], 10), parseInt(line[1], 10));
            if (i == n) {
                cleanupPackets(Infinity);
                process.exit();
            }
        }
    }
}
