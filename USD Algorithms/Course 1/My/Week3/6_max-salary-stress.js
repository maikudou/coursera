var n;
var nums;

function maxSalary() {
    nums.sort(function(a,b){
        if (a === b) {
            return 0;
        }
        var aDigits = a.split("");
        var bDigits = b.split("");

        var try1 = [a,b].join("");
        var try2 = [b,a].join("");

        if (try1 > try2) {
            return -1;
        } else if (try1 < try2){
            return 1
        }
        return 0;
    });
    return nums.join("");
}
var i = 0;
while (i < 100000000) {
    var a = String(parseInt(Math.random() * 1000)+1);
    var b = String(parseInt(Math.random() * 1000)+1);

    nums = [a, b];
    var try1 = [a,b].join("");
    var try2 = [b,a].join("");
    var max = String(Math.max(Number(try1), Number(try2)));
    var maxAlg =  maxSalary();
    if (max !== maxAlg) {
        console.log(a, b, max, maxAlg);
        break;
    }
    i++;
}


