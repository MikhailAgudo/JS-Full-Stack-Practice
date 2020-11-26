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
    localStorage["library"] = myLibrary;
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

    newCard.style.border = "solid 1px gray";
    newCard.style.borderRadius = "10px";
    newCard.style.margin = "1em";
    newCard.style.padding = "1em";
    newCard.style.backgroundColor = "white";
    newCard.style.display = "flex";
    newCard.style.flexDirection = "column";

    newCard.dataset.index = index;

    let cardInfo = document.createElement("div");
    let bookTitle = document.createElement("h2");
    let bookAuthor = document.createElement("h3");
    let pageAndRead = document.createElement("p");

    bookTitle.textContent = inputBook.title;
    bookAuthor.textContent = inputBook.author;
    switch (inputBook.hasRead) {
        case true:
            pageAndRead.textContent = `${inputBook.pageCount}, finished reading.`;
            break;
        case false:
            pageAndRead.textContent = `${inputBook.pageCount}, haven't started.`;
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
    cardButtons.style.marginTop = "auto";

    removeButton.textContent = "REMOVE";
    removeButton.style.backgroundColor = "red";
    removeButton.style.border = "none";
    removeButton.style.borderRadius = "10px";
    removeButton.style.marginRight = "0.5em";
    removeButton.addEventListener("click", (e) => {
        myLibrary.splice(newCard.dataset.index, 1);
        createGridCards();
    });

    statusButton.textContent = "READ";
    statusButton.style.backgroundColor = "gray";
    statusButton.style.border = "none";
    statusButton.style.borderRadius = "10px";
    statusButton.addEventListener("click", (e) => {
        changeReadStatus(newCard.dataset.index);
        createGridCards();
    });

    cardButtons.appendChild(removeButton);
    cardButtons.appendChild(statusButton);

    newCard.appendChild(cardInfo);
    newCard.appendChild(cardButtons);

    return newCard;
}

function createGridCards() {
    cardGrid.innerHTML = '';
    for (let i = 0; i < myLibrary.length; i++) {
        let newCard = createBookCard(i, myLibrary[i]);
        cardGrid.appendChild(newCard);
    }
}

function createPopUp() {
    let popUp = document.createElement("div");
    popUp.style.zIndex = "1";
    popUp.style.position = "fixed";
    popUp.style.display = "none";
    popUp.style.left = "0";
    popUp.style.top = "0";
    popUp.style.overflow = "auto";
    popUp.style.backgroundColor = "rgba(0,0,0,0.4)";
    popUp.style.width = "100%";
    popUp.style.height = "100%";

    let popUpContent = document.createElement("div");
    popUpContent.style.padding = "2em";
    popUpContent.style.backgroundColor = "white";
    popUpContent.style.display = "flex";
    popUpContent.style.flexDirection = "column";
    popUpContent.style.width = "20em";
    popUpContent.style.margin = "auto";

    let authorInput = document.createElement("input");
    authorInput.type = "text";
    authorInput.placeholder = "Andrej Sapkowski";
    popUpContent.appendChild(authorInput);

    let titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.placeholder = "Baptism of Fire";
    popUpContent.appendChild(titleInput);

    let pageInput = document.createElement("input");
    pageInput.type = "number";
    pageInput.placeholder = "100";
    popUpContent.appendChild(pageInput);

    let readInput = document.createElement("input");
    readInput.type = "checkbox";
    readInput.checked = true;
    popUpContent.appendChild(readInput);

    let submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    submitButton.addEventListener("click", (e) => {
        console.log("Click!");
        addBookToLibrary(authorInput.value, titleInput.value,
            pageInput.value, readInput.checked);
        createGridCards();
        popUp.style.display = "none";
    });
    popUpContent.appendChild(submitButton);

    popUp.appendChild(popUpContent);

    return popUp
}

function createButtonPop(popUp) {

}

function initializeUI() {
    let body = document.querySelector("body");
    body.style.backgroundColor = "rgb(50, 50, 50)";

    let popUp = createPopUp();

    let middleStrip = document.createElement("div");
    middleStrip.style.backgroundColor = "white";
    middleStrip.style.margin = "auto";
    middleStrip.style.width = "50%";

    let websiteTitle = document.createElement("h1");
    websiteTitle.textContent = "My Reading List";
    websiteTitle.style.textAlign = "center";

    let addBookButton = document.createElement("button");
    addBookButton.textContent = "+ Add Book";
    addBookButton.addEventListener("click", (e) => {
        popUp.style.display = "block";
    });

    cardGrid = document.createElement("div");
    cardGrid.style.display = "grid";
    cardGrid.style.gridTemplateColumns = "auto auto auto";

    createGridCards();

    middleStrip.appendChild(websiteTitle);
    middleStrip.appendChild(addBookButton);
    middleStrip.appendChild(cardGrid);
    body.appendChild(middleStrip);
    body.appendChild(popUp);
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
    addBookToLibrary("Jack Vance", "Tales of the Dying Earth", 300.0, false);
    addBookToLibrary("Mars Gravity", "Against the Gods", 10000.0, true);

    const SOS_RESULT = checkCorrectBookParameters(0, 
        "Andrej Sapkowski", 
        "Season of Storms", 415, false);
    const TOTDE_RESULT = checkCorrectBookParameters(1,
        "Jack Vance", 
        "Tales of the Dying Earth", 300.0, true);
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