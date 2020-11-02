function countUp(start, end) {
    let sum = 0;
    for(start; start <= end; start++) {
        sum += start;
    }
    return sum;
}

function countDown(start, end) {
    let sum = 0;
    for(start; start >= end; start--) {
        sum += start;
    }
    return sum;
}

const sumAll = function(start, end) {
    if (start < 0 || end < 0) {
        return "ERROR";
    }
    if (typeof start != "number" || typeof end != "number") {
        return "ERROR";
    }
    if (end < start) {
        return countDown(start, end);
    } else {
        return countUp(start, end);
    }
}

module.exports = sumAll
