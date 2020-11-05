class calculator {
    OPERATORS = ["*", "/", "+", "-"];
    ERROR_DIVIDE_BY_ZERO = "ERROR: DIVIDING BY ZERO";
    ERROR_SYNTAX = "SYNTAX ERROR";
    ERRORS = [this.ERROR_DIVIDE_BY_ZERO, this.ERROR_SYNTAX];
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

        let screenArray = this.firstFilter(string);

        if (this.checkError(screenArray)) {
            screenArray = this.checkError(screenArray);
            this.screenText = screenArray;
            return;
        }

        screenArray = this.secondFilter(screenArray);

        console.log(`Post Second: ${screenArray}`);

        if (this.checkError(screenArray)) {
            screenArray = this.checkError(screenArray);
            this.screenText = screenArray;
            return;
        }
    }

    firstFilter(string) {
        // Determine what steps are needed to calculate
        // via PEMDAS/MDAS and an array containing a
        // dictionary of "operation", "input1", "input2"
        // and "result".
        // This method will also take care of reading
        // the screen.
        // The other inputs within the array will contain
        // an index within the same array that uses
        // the "result" variable.

        let screenArray = [];

        let i = 0;
        for (let j = 0; j < string.length; j++) {
            if (j !== (string.length - 1)) {
                for (let k = 0; k < this.OPERATORS.length; k++) {
                    if (string[j] === this.OPERATORS[k]) {
                        screenArray = this.sliceScreen(string, 
                            screenArray, i, j, false);
                        i = j + 1;
                    }
                }
            } else {
                screenArray = this.sliceScreen(string, screenArray,
                    j, string.length, true);
            }
        }
        console.log(screenArray);
        return screenArray;
    }

    secondFilter(screenArray) {
        // Add the Ms, then Ds, then As, then Ss. Then
        // splice them. The replaced value should be the calculation

        this.multiplicationFilter(screenArray);
        this.divisionFilter(screenArray);

        if(this.checkError(screenArray)) {
            return screenArray;
        }

        return screenArray;
    }

    multiplicationFilter(screenArray) {
        for (let i = 0; i < screenArray.length; i+=0) {
            if (screenArray[i] === this.OPERATORS[0]) {
                let input1 = parseInt(screenArray[i - 1]);
                let input2 = parseInt(screenArray[i + 1]);
                let result = this.multiply(input1, input2);
                screenArray.splice((i - 1), 3, result);
                i = 0;
            } else {
                i++;
            }
        }
        console.log(screenArray);
        return screenArray;
    }

    divisionFilter(screenArray) {
        console.log(`Division starts: ${screenArray}`);
        if (this.checkError(screenArray)) {
            return screenArray;
        }
        for (let i = 0; i < screenArray.length; i+=0) {
            if (screenArray[i] === this.OPERATORS[1]) {
                let input1 = parseInt(screenArray[i - 1]);
                let input2 = parseInt(screenArray[i + 1]);
                let result = this.divide(input1, input2);
                screenArray.splice((i - 1), 3, result);
                i = 0;
            } else {
                i++;
            }
        }
        console.log(screenArray);
        return screenArray;
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

    checkError(screenArray) {
        console.log("Checking errors...");
        console.log(`Error: ${typeof screenArray}, ${screenArray}`);
        if (typeof screenArray != "string"){
            screenArray = this.checkDivideZero(screenArray);
        }
        
        for (let i = 0; i < this.ERRORS.length; i++) {
            if (screenArray === this.ERRORS[i]) {
                return screenArray;
            }
        }
    }

    checkDivideZero(screenArray) {
        console.log("Checking divide by zero errors...");
        console.log(`Zero Error: ${typeof screenArray}, ${screenArray}`);
        for (let i = 0; i < screenArray.length; i++) {
            if (screenArray[i] == 0 && 
                screenArray[i - 1] === this.OPERATORS[1]) {
                return this.ERROR_DIVIDE_BY_ZERO;
            }
        }
    }

    add(input1, input2) {

    }

    subtract(input1, input2) {

    }

    multiply(input1, input2) {
        return input1 * input2;
    }

    divide(input1, input2) {
        if (input1 === 0) {
            return 1;
        } else {
            return input1 / input2;
        }
    }
}

let calc = new calculator();