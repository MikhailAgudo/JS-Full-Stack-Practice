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
            return screenArray;
        }

        screenArray = this.secondFilter(screenArray);

        //console.log(`Post Second: ${screenArray}`);

        if (this.checkError(screenArray)) {
            screenArray = this.checkError(screenArray);
            this.screenText = screenArray;
            return screenArray;
        }

        this.screenText = screenArray[0];
        console.log(screenArray[0]);
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

        this.MDFilter(screenArray);

        if(this.checkError(screenArray)) {
            console.log("Returning on second filter!");
            return screenArray;
        }

        this.ASFilter(screenArray);

        return screenArray;
    }

    MDFilter(screenArray) {
        for (let i = 0; i < screenArray.length; i+=0) {
            if (screenArray[i] === this.OPERATORS[0]) {
                let input1 = parseFloat(screenArray[i - 1]);
                let input2 = parseFloat(screenArray[i + 1]);
                let result = this.multiply(input1, input2);
                screenArray.splice((i - 1), 3, result);
                i = 0;
                console.log(screenArray);
            } else if (screenArray[i] === this.OPERATORS[1]) { 
                if (this.checkError(screenArray)) {
                    return screenArray;
                }
                let input1 = parseFloat(screenArray[i - 1]);
                let input2 = parseFloat(screenArray[i + 1]);
                let result = this.divide(input1, input2);
                screenArray.splice((i - 1), 3, result);
                i = 0;
                console.log(screenArray);
            } else {
                i++;
            }
        }
        return screenArray;
    }

    ASFilter(screenArray) {
        for (let i = 0; i < screenArray.length; i+=0) {
            if (screenArray[i] === this.OPERATORS[2]) {
                let input1 = parseFloat(screenArray[i - 1]);
                let input2 = parseFloat(screenArray[i + 1]);
                let result = this.add(input1, input2);
                screenArray.splice((i - 1), 3, result);
                i = 0;
                console.log(screenArray);
            } else if (screenArray[i] === this.OPERATORS[3]) {
                let input1 = parseFloat(screenArray[i - 1]);
                let input2 = parseFloat(screenArray[i + 1]);
                let result = this.subtract(input1, input2);
                screenArray.splice((i - 1), 3, result);
                i = 0;
                console.log(screenArray);
            } else {
                i++;
            }
        }
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
        //console.log("Checking errors...");
        //console.log(`Error: ${typeof screenArray}, ${screenArray}`);
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
        //console.log("Checking divide by zero errors...");
        //console.log(`Zero Error: ${typeof screenArray}, ${screenArray}`);
        for (let i = 0; i < screenArray.length; i++) {
            if (screenArray[i] == 0 && 
                screenArray[i - 1] === this.OPERATORS[1]) {
                return this.ERROR_DIVIDE_BY_ZERO;
            }
        }
    }

    add(input1, input2) {
        return input1 + input2;
    }

    subtract(input1, input2) {
        return input1 - input2;
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

function unitTest(calc) {
    if (calc.calculate("6*5-3/4+2") === (6 * 5 - 3 / 4 + 2)) {
        // Test MDAS.
        console.log("First test: Pass");
    } else {
        console.log(`First test: Fail, answer: ${6 * 5 - 3 / 4 + 2 }`);
    }

    if (calc.calculate("5912 - 5491 + 9829 * 56 / 87 + 9102") === (5912 - 5491 + 9829 * 56 / 87 + 9102)) {
        // Test big numbers.
        console.log("Second test: Pass");
    } else {
        console.log(`Second test: Fail, answer: ${5912 - 5491 + 9829 * 56 / 87 + 9102}`);
    }

    if (calc.calculate("99+2*5/0") === calc.ERROR_DIVIDE_BY_ZERO) {
        // Test zero error.
        console.log("Third test: Pass");
    } else {
        console.log(`Third test: Fail, answer: ${calc.ERROR_DIVIDE_BY_ZERO}`);
    }

    if (calc.calculate("99+2*5/5*0") === calc.ERROR_DIVIDE_BY_ZERO) {
        // Test zero error, but "disguised"
        console.log("Fourth test: Pass");
    } else {
        console.log(`Fourth test: Fail, answer: ${calc.ERROR_DIVIDE_BY_ZERO}`);
    }
}

let calc = new calculator();
unitTest(calc);