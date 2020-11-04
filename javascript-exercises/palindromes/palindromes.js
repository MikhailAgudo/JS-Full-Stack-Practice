function checkLegality(char) {
    illegalChar = ["!", " ", ",", "."];

    for(let i = 0; i < illegalChar.length; i++) {
        if (char === illegalChar[i]) {
            return false;
        }
    }
    return true;

    // This will not work, because the return only returns
    // on the function inside the forEach() method; not
    // the checkLegality() method.
    //
    //illegalChar.forEach(function(item) {
    //    console.log(`checking ${char} and ${item}`);
    //    if (char === item) {
    //        return false;
    //        console.log("get!");
    //    }
    //});
}

const palindromes = function(string) {
    let word = "";
    for (let i = 0; i < string.length; i++) {
        let char = string.charAt(i);
        if (checkLegality(char) === true) {
            word += char.toUpperCase();
        }
    }
    
    let reversedWord = "";
    for (let i = (word.length - 1); i >= 0; i--) {
        reversedWord += word[i];
    }

    if (word === reversedWord) {
        return true;
    } else {
        return false;
    }
}

module.exports = palindromes
