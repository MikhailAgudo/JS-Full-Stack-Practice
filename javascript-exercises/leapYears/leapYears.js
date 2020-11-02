const leapYears = function(year) {
    let checks = [];
    if (year % 4 === 0) {
        checks.push(true);
    } else {
        checks.push(false);
    }
    if (year % 400 === 0) {
        checks.push(true);
    } else {
        checks.push(false);
    }
    if (year % 100 === 0) {
        checks.push(false);
    } else {
        checks.push(true);
    }
    console.log(checks);

    if ((checks[0] === true && checks[2] === true) || checks[1] === true) {
        return true;
    } else {
        return false;
    }
}

module.exports = leapYears
