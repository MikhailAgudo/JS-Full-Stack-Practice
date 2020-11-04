const getTheTitles = function(books) {
    let result = [];
    for (let i = 0; i < books.length; i++) {
        result.push(books[i].title);
    }
    return result;
}

module.exports = getTheTitles;
