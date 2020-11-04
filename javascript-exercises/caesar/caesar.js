function unicodeConverter(code, shift) {
    shift = shift % 26;
    if (code >= 65 && code <= 90) {
        code = code + shift;
        if (code < 65) {
            code += 26;
        } else if (code > 90) {
            code -= 26;
        }
    } else if (code >= 97 && code <= 122) {
        code = code + shift;
        if (code < 97) {
            code += 26;
        } else if (code > 122) {
            code -= 26;
        }
    }
    return code;
}

const caesar = function(string, shift) {
    let result = "";
    for (let i = 0; i < string.length; i++) {
        let uniChar = string.charCodeAt(i);
        let newChar = String.fromCharCode(unicodeConverter(uniChar, shift));
        result += newChar;
    }
    return result;
}

module.exports = caesar

console.log(String.fromCharCode(parseInt("A", 16)));