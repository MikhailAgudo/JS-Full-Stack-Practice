class calculator {
    screen = document.createElement("div");
    screenText = screen.textContent;

    constructor() {

    }

    buildNewButton(symbol, color, event) {
        let newButton = document.createElement("button");

        newButton.style.border = "none";
        newButton.style.backgroundColor = color;

        newButton.addEventListener("click", (e) => {
            event();
        });

        return newButton;
    }

    initializeScreen() {

    }

    writeToScreen(string) {
        this.screenText += string;
    }

    clearScreen() {
        this.screenText = "";
    }

    updateScreen() {
        // Method to update the screen, goes along with
        // other methods in a button's event listener.
        // Probably useless because screenText directly
        // writes to textContent.
    }

    calculate(string) {
        // Where all the calculation starts and happens.
        // First, determineSteps() then calculate everything
        // one by one.
    }

    determineSteps(string) {
        // Determine what steps are needed to calculate
        // via PEMDAS/MDAS and an array containing a
        // dictionary of "operation", "input1", "input2"
        // and "result".
        // This method will also take care of reading
        // the screen.
        // The other inputs within the array will contain
        // an index within the same array that uses
        // the "result" variable.

        let operators = ["+", "-", "*", "/"];
        let firstFilter = [];

        let i = 0;
        for (let j = 0; j < string.length; j++) {
            if (j !== (string.length - 1)) {
                for (let k = 0; k < operators.length; k++) {
                    if (string[j] === operators[k]) {
                        firstFilter = this.sliceScreen(string, 
                            firstFilter, i, j, false);
                        i = j;
                    }
                }
            } else {
                firstFilter = this.sliceScreen(string, firstFilter,
                    j, string.length, true);
            }
        }
        console.log(firstFilter);
    }

    sliceScreen(string, firstFilter, i, j, isEnd) {
        // This method reads the string to help
        // determineSteps().

        let filterInput = string.slice(i, j);
        firstFilter.push(filterInput);

        if (isEnd === false) {
            firstFilter.push(string.slice(j, j + 1));
        }
        return firstFilter;
    }

    add(input1, input2) {

    }

    subtract(input1, input2) {

    }

    multiply(input1, input2) {

    }

    divide(input1, input2) {

    }
}

let calc = new calculator();