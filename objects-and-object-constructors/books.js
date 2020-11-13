function Book(title, author, pages, haveRead) {
    this.name = name;
    this.author = author;
    this.pages = pages;
    this.haveRead = haveRead;
    this.info = function() {
        let readStatus = "";
        if (haveRead === true) {
            readStatus = "has been read";
        } else {
            readStatus = "not read yet";
        }
        return `${title} by ${author}, ${pages}, ${readStatus}.`;
    }
}

function unitTest() {
    let warlockOfFiretop = new Book("The Warlock of Firetop Mountain",
        "Ian Livingstone and Steve Jackson", "188", true);
    let seasonOfStorms = new Book("The Season of Storms",
        "Andrej Sapkowski", "416", false);
    
    const WOF_TEST = "The Warlock of Firetop Mountain by Ian Livingstone and Steve Jacksone, 188 pages, has been read.";
    const SOS_TEST = "The Season of Storms by Andrej Sapkowski, 416 pages, not read yet.";

    if (warlockOfFiretop.info() === WOF_TEST) {
        console.log("WOF Test: Passed");
    } else {
        console.log("WOF Test: Failed");
    }

    if (seasonOfStorms.info() === SOS_TEST) {
        console.log("SOS Test: Passed");
    } else {
        console.log("SOS Test: Failed");
    }
}

unitTest();