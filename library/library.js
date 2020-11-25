// A class for the UI and makes books for $myLibrary.

let myLibrary = [];
let cardGrid = null;

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

function createBookCard(index, inputBook) {
    let newCard = document.createElement("div");

    newCard.style.border = "none";
    newCard.style.borderRadius = "10px";
    newCard.style.padding = "1em";
    newCard.style.backgroundColor = "white";
    newCard.style.display = "flex";
    newCard.style.flexDirection = "column";

    newCard.dataset.index = index;

    let cardInfo = document.createElement("div");
    let bookTitle = document.createElement("h1");
    let bookAuthor = document.createElement("h2");
    let pageAndRead = document.createElement("p");

    bookTitle.textContent = inputBook.title;
    bookAuthor.textContent = inputBook.author;
    switch (inputBook.hasRead) {
        case true:
            pageAndRead.textContent = `${inputBook.pageCount}
                , finished reading.`;
            break;
        case false:
            pageAndRead.textContent = `${inputBook.pageCount}
                , haven't started.`;
            break;
    }
    
    cardInfo.appendChild(bookTitle);
    cardInfo.appendChild(bookAuthor);
    cardInfo.appendChild(pageAndRead);

    let cardButtons = document.createElement("div");
    let removeButton = document.createElement("button");
    let statusButton = document.createElement("button");

    cardButtons.style.display = "flex";
    cardButtons.style.flexDirection = "row";

    removeButton.textContent = "REMOVE";
    removeButton.style.backgroundColor = "red";
    removeButton.style.border = "none";
    removeButton.style.borderRadius = "10px";
    removeButton.addEventListener("click", (e) => {
        myLibrary.splice(newCard.dataset.index, 1);
    });

    statusButton.textContent = "READ IT";
    statusButton.style.backgroundColor = "gray";
    statusButton.style.border = "none";
    statusButton.style.borderRadius = "10px";
    statusButton.addEventListener("click", (e) => {
        changeReadStatus(newCard.dataset.index);
    });

    cardButtons.appendChild(removeButton);
    cardButtons.appendChild(statusButton);

    newCard.appendChild(cardInfo);
    newCard.appendChild(cardButtons);

    return newCard;
}

function createGridCards() {
    for (let i = 0; i < myLibrary.length; i++) {
        let newCard = createBookCard(i, myLibrary[i]);
        cardGrid.appendChild(newCard);
    }
}

function initializeUI() {
    cardGrid = document.createElement("div");
    cardGrid.style.margin = "auto";
    cardGrid.style.display = "grid";
    cardGrid.style.gridTemplateColumns = "auto auto auto auto";
    cardGrid.style.width = "50%";

    createGridCards();

    let body = document.querySelector("body");
    body.style.backgroundColor = "rgb(50, 50, 50)";

    body.appendChild(cardGrid);
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
initializeUI();