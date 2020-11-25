// A class for the UI and makes books for $myLibrary.

let myLibrary = [];

function Book(author, title, pageCount, hasRead) {
    // The constructor...
    this.author = String(author);
    this.title = String(title);
    this.pageCount = parseInt(pageCount);
    this.hasRead = hasRead;
}

function addBookToLibrary(author, title, pageCount, hasRead) {
    // Do stuff here
    const newBook = new Book(author, title, pageCount, hasRead);
    myLibrary.push(newBook);
}

function changeReadStatus(index) {
    let targetBook = myLibrary[index];
    if (targetBook.hasRead === true) {
        targetBook.hasRead = false;
    } else {
        targetBook.hasRead = true;
    }
}

function unitTest() {
    addBookToLibrary("Andrej Sapkowski", "Season of Storms", 415, false);
    addBookToLibrary("Tales of the Dying Earth", "Jack Vance", 300.0, true);

}

unitTest();