const reverseString = function(string) {
    let output = '';
    let endingChar = string.length - 1;
    for (let i = endingChar; i >= 0; i--) {
        output += string.charAt(i);
    }
    return output;
}

module.exports = reverseString
