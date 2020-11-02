const repeatString = function(string, amount) {
    if (amount < 0) {
        return 'ERROR';
    }
    let output = '';
    for (let i = 0; i < amount; i++) {
        output += string;
    }
    return output;
}

module.exports = repeatString
