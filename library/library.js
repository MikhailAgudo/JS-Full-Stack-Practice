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
    const NEW_BOOK = new Book(author, title, pageCount, hasRead);
    myLibrary.push(NEW_BOOK);
}

function changeReadStatus(index) {
    let targetBook = myLibrary[index];
    if (targetBook.hasRead === true) {
        targetBook.hasRead = false;
    } else {
        targetBook.hasRead = true;
    }
}

function checkCorrectBookParameters(index, author, title, pageCount, hasRead) {
    let targetBook = myLibrary[index];
    const FAIL_STRING = "Failed.";
    const PASS_STRING = "Passed.";
    if (targetBook.author !== author) {
        return FAIL_STRING;
    }
    if (targetBook.title !== title) {
        return FAIL_STRING;
    }
    if (targetBook.pageCount !== pageCount) {
        return FAIL_STRING;
    }
    if (targetBook.hasRead !== hasRead) {
        return FAIL_STRING;
    }
    return PASS_STRING;
}

function unitTest() {
    addBookToLibrary("Andrej Sapkowski", "Season of Storms", 415, false);
    addBookToLibrary("Tales of the Dying Earth", "Jack Vance", 300.0, true);

    const SOS_RESULT = checkCorrectBookParameters(0, 
        "Andrej Sapkowski", 
        "Season of Storms", 415, false);
    const TOTDE_RESULT = checkCorrectBookParameters(1,
        "Tales of the Dying Earth", 
        "Jack Vance", 300.0, true);
    console.log(`First: ${SOS_RESULT}`);
    console.log(`Second: ${TOTDE_RESULT}`);

    changeReadStatus(0);
    if (myLibrary[0].hasRead === true) {
        console.log("Third: Passed.");
    } else {
        console.log("Third: Failed.");
    }
}

unitTest();