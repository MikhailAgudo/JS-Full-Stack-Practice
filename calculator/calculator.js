class calculator {
    OPERATORS = ["*", "/", "+", "-"];
    ERROR_DIVIDE_BY_ZERO = "ERROR: DIVIDING BY ZERO";
    ERROR_SYNTAX = "SYNTAX ERROR";
    BORDER_RADIUS = "50px";
    ERRORS = [this.ERROR_DIVIDE_BY_ZERO, this.ERROR_SYNTAX];
    screen = document.createElement("div");
    screenText = screen.textContent;

    constructor() {
        let calcuContainer = document.createElement("div");
        calcuContainer.style.border = "none";
        calcuContainer.style.borderRadius = this.BORDER_RADIUS;
        calcuContainer.style.backgroundColor = "gray";
        calcuContainer.style.display = "flex";
        calcuContainer.style.flexDirection = "column";

        screen.backgroundColor = "white";
        screen.borderRadius = this.BORDER_RADIUS;

        let buttonGrid = document.createElement("div");
        buttonGrid.style.borderRadius = this.BORDER_RADIUS;
        buttonGrid.style.display = "grid";
        buttonGrid.style.gridTemplateRows = " auto auto auto auto auto";
        buttonGrid.style.gridTemplateColumns = "auto auto auto auto";

        let operatorButtons = this.OPERATORS;
        for (let i = 7; i < 10; i+=0) {
            if (i < 0) {
                let symbol = "0";
                let color = "white";
                let newButton = this.buildNewButton(symbol, color,
                    this.writeToScreen(symbol));
                buttonGrid.appendChild(newButton);

                symbol = ".";
                newButton = this.buildNewButton(symbol, color,
                    this.writeToScreen(symbol));
                buttonGrid.appendChild(newButton);

                symbol = "=";
                color = "orange";
                newButton = this.buildNewButton(symbol, color,
                    this.calculate(this.screenText));
                buttonGrid.appendChild(newButton);

                symbol = operatorButtons.shift();
                newButton = this.buildNewButton(symbol, color,
                    this.writeToScreen(symbol));
                buttonGrid.appendChild(newButton);

                symbol = "DEL";
                newButton = this.buildNewButton(symbol, color,
                    this.deleteScreen());
                buttonGrid.appendChild(newButton);

                symbol = "C";
                newButton = this.buildNewButton(symbol, color,
                    this.clearScreen());
                buttonGrid.appendChild(newButton);

                i = 10;
                break;
            } else if (i % 3 === 0) {
                symbol = String(i);
                color = "white";
                newButton = this.buildNewButton(symbol, color,
                    this.writeToScreen(symbol));
                buttonGrid.appendChild(newButton);

                let symbol = operatorButtons.shift();
                let color = "orange";
                let newButton = this.buildNewButton(symbol, color,
                    this.writeToScreen(symbol));
                buttonGrid.appendChild(newButton);

                i -= 5;
            } else {
                let symbol = String(i);
                let color = "white";
                let newButton = this.buildNewButton(symbol, color,
                    this.writeToScreen(symbol));
                buttonGrid.appendChild(newButton);

                i++;
            }  
        }

        calcuContainer.appendChild(this.screen);
        calcuContainer.appendChild(buttonGrid);
        document.appendChild(calcuContainer);
    }

    buildNewButton(symbol, color, event) {
        let newButton = document.createElement("button");

        newButton.style.border = "none";
        newButton.style.borderRadius = this.BORDER_RADIUS;
        newButton.style.backgroundColor = color;
        newButton.style.textJustify = "center";
        newButton.textContent = symbol;

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

    deleteScreen() {
        let string = this.screenText;
        this.screenText = string.slice(0, (string.length - 1));
    }

    updateScreen() {
        // Method to update the screen, goes along with
        // other methods in a button's event listener.
        // Probably useless because screenText directly
        // writes to textContent.
    }

    calculate(string) {
        // Where all the calculation starts and happens.
        // firstFilter() turns the input string into
        // a readable input, which secondFilter() then
        // calculates. Check for errors in between the
        // filters, because firstFilter() has created
        // a readable input.

        let screenArray = this.firstFilter(string);

        // if checkError() returns something meaningful
        // execute the code. checkError() only returns
        // if there's an actual error.
        if (this.checkError(screenArray)) {
            screenArray = this.checkError(screenArray);
            this.screenText = screenArray;
            return screenArray;
        }

        screenArray = this.secondFilter(screenArray);

        // Then, modify screenText to contain the answer.
        // Return it, for unit test purposes.
        this.screenText = screenArray[0];

        return screenArray[0];
    }

    firstFilter(string) {
        // Initialize screenArray, which will be used
        // throughout the calculation and error-checking
        // process.
        let screenArray = [];

        // i serves as a starting point for slicing the
        // the string, while j is the end point.
        // The for loop allows us to append values
        // onto the screenArray, for reading of later
        // functions. 
        let i = 0;
        for (let j = 0; j < string.length; j+=0) {
            // checkedChar lets us evaluate a true/false
            // value from checkOperators(), making
            // checking if it's an operator much simpler.
            let checkedChar = this.checkOperators(string[j]);

            // If it's an operator, slice the string from
            // i to j; which will happen from the start of
            // a number to the end. And because isEnd is
            // false, also slice j to j+1 which is the
            // operator. sliceScreen() does all of that
            // in one function.
            if (checkedChar === true) {
                screenArray = this.sliceScreen(string, 
                    screenArray, i, j, false);
                
                // The main reason why the counter is
                // j+=0 is because of this. Add j++ directly
                // which makes j go from the start of the
                // operator ("|+") to the end ("+|").
                // Then set i as that, so the next slice
                // starts at the number, not the operator.
                j++;
                i = j;
            } else if (j === (string.length - 1)) {
                // At the end, slice from i to the
                // end of the string. isEnd is true because
                // we do not want to slice a non-existing
                // operator.
                screenArray = this.sliceScreen(string, 
                    screenArray, i, string.length, true);

                j++;
            } else {
                // Otherwise, just increment j to move on.
                j++;
            }
        }
        // removeDuds() is important, because of how
        // the above algorithm works it will sometimes
        // add "" to screenArray. This mostly occurs
        // with double operators. It prevents any
        // unnecessary NaN from happening.
        screenArray = this.removeDuds(screenArray);

        return screenArray;
    }

    checkOperators(char) {
        // Loop around OPERATORS to see if char
        // is one of them. This function is used by
        // firstFilter() and many other error-checking
        // functions.
        for (let i = 0; i < this.OPERATORS.length; i++) {
            if (char === this.OPERATORS[i]) {
                return true;
            }
        }

        return false;
    }

    removeDuds(screenArray) {
        // As explained in firstFilter(), removeDuds()
        // removes "" for us, created by the firstFilter()
        // algorithm. It's a work-around, and truthfully
        // firstFilter() should be written better, but
        // this works.
        for (let i = 0; i < screenArray.length; i++) {
            if (screenArray[i] === "") {
                screenArray.splice(i, 1);

                // We want to decrement because splice
                // removes an element. If we don't, the
                // loop will skip an element.
                i--;
            }
        }

        return screenArray;
    }

    secondFilter(screenArray) {
        // Calculate screenArray, from left-to-right
        // and doing MD first then AS in MDAS.

        this.MDFilter(screenArray);
        this.ASFilter(screenArray);

        return screenArray;
    }

    MDFilter(screenArray) {
        // Loop, and check if the element is an operator.
        // If it is, do an operation with the element
        // before it and after it. Afterwards, splice
        // with the result. Set i = 0 to do the
        // left-to-right thing in MDAS, properly.
        // We don't check if it's dividing by zero here
        // because error checking has already happened
        // after screenArray was created by firstFilter().
        for (let i = 0; i < screenArray.length; i++) {
            if (screenArray[i] === this.OPERATORS[0]) {
                let input1 = parseFloat(screenArray[i - 1]);
                let input2 = parseFloat(screenArray[i + 1]);
                let result = this.multiply(input1, input2);

                screenArray.splice((i - 1), 3, result);

                i = 0;
            } else if (screenArray[i] === this.OPERATORS[1]) { 
                let input1 = parseFloat(screenArray[i - 1]);
                let input2 = parseFloat(screenArray[i + 1]);
                let result = this.divide(input1, input2);

                screenArray.splice((i - 1), 3, result);

                i = 0;
            }
        }

        return screenArray;
    }

    ASFilter(screenArray) {
        // Same as MDFilter() but with addition and 
        // subtraction.
        for (let i = 0; i < screenArray.length; i++) {
            if (screenArray[i] === this.OPERATORS[2]) {
                let input1 = parseFloat(screenArray[i - 1]);
                let input2 = parseFloat(screenArray[i + 1]);
                let result = this.add(input1, input2);

                screenArray.splice((i - 1), 3, result);

                i = 0;
            } else if (screenArray[i] === this.OPERATORS[3]) {
                let input1 = parseFloat(screenArray[i - 1]);
                let input2 = parseFloat(screenArray[i + 1]);
                let result = this.subtract(input1, input2);

                screenArray.splice((i - 1), 3, result);

                i = 0;
            }
        }

        return screenArray;
    }

    sliceScreen(string, screenArray, i, j, isEnd) {
        // Slices the string and appends it to
        // screenArray.

        // filterInput is the slice from i to j, which
        // is usually the number.
        let filterInput = string.slice(i, j);
        screenArray.push(filterInput);

        // If it's not at the end of the string,
        // also slice the operator via j to j+1.
        if (isEnd === false) {
            screenArray.push(string.slice(j, j + 1));
        }

        return screenArray;
    }

    checkError(screenArray) {
        // Contains all of the error checking in
        // one function so we don't have to call
        // all of them each time. Also makes it cleaner.

        // Check if it's a string, because if it is
        // that means screenArray has already encountered
        // an error in a previous error-check. If it isn't
        // a string, do all of the error checking.
        if (typeof screenArray != "string"){
            screenArray = this.checkDivideZero(screenArray);
            screenArray = this.checkDoubleOperator(screenArray);
            screenArray = this.checkEndingOperator(screenArray);
            screenArray = this.checkMultipleDecimals(screenArray);
        }
        
        // Check if it's already one of the errors.
        // If it is, return it, which will trigger
        // "if (this.checkError(screenArray)) {}"
        for (let i = 0; i < this.ERRORS.length; i++) {
            if (screenArray === this.ERRORS[i]) {
                return screenArray;
            }
        }
    }

    checkDivideZero(screenArray) {
        // Check if it's 0 and "/", which is
        // dividing by zero. Simplifies the error
        // checking for zero.
        for (let i = 0; i < screenArray.length; i++) {
            if (screenArray[i] == 0 && 
                screenArray[i - 1] === this.OPERATORS[1]) {
                return this.ERROR_DIVIDE_BY_ZERO;
            }
        }

        return screenArray;
    }

    checkDoubleOperator(screenArray) {
        // Check if something is a double operator
        // like "+-". isOperator lets us see if there's
        // already a previous operator before it. Otherwise
        // if the current element is not an operator then
        // make isOperator false.
        let isOperator = false;
        for (let i = 0; i < screenArray.length; i++) {
            if (this.checkOperators(screenArray[i]) === true && isOperator === true){
                return this.ERROR_SYNTAX;
            } else if (this.checkOperators(screenArray[i])) {
                isOperator = true;
            } else {
                isOperator = false;
            }
        }

        return screenArray;
    }

    checkEndingOperator(screenArray) {
        // Check the first and final elements if they're
        // operators. This checks if the string has
        // incomplete input with operators.
        let endIndex = screenArray.length - 1
        if (this.checkOperators(screenArray[endIndex]) === true) {
            return this.ERROR_SYNTAX;
        }
        if (this.checkOperators(screenArray[0]) === true) {
            return this.ERROR_SYNTAX;
        }

        return screenArray;
    }

    checkMultipleDecimals(screenArray) {
        // Check if a number has multiple decimals.
        // On the for loop with j, we check the entire
        // element. If there has already been a decimal,
        // make hasDecimal = true. After the loop, when
        // we're done with the element, make
        // hasDecimal = false. This is important because
        // we only need one decimal.
        //
        // In an earlier version of the function,
        // it used to turn hasDecimal = false inside
        // the loop. This is a no-no because that means
        // the loop resets hasDecimal immediately after
        // checking the character.
        let hasDecimal = false;
        for (let i = 0; i < screenArray.length; i++) {
            let input = String(screenArray[i]);

            for (let j = 0; j < input.length; j++) {
                if (input[j] === "." && hasDecimal === true) {
                    return this.ERROR_SYNTAX
                } else if (input[j] === ".") {
                    hasDecimal = true;
                }
            }

            hasDecimal = false;
        }

        return screenArray;
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
        return input1 / input2;
    }
}

function unitTest(calc) {
    // unitTest() lets us test the calculator to see
    // if it's actually correct with its functions.
    // Though this could have been written better,
    // it was made with haste and this works anyway.
    // unitTest will never be touched again, now that
    // all the intended functions have been implemented.

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

    if (calc.calculate("99+2*5/5*0") === (99 + 2 * 5 / 5 * 0)) {
        // Test zero error, but "disguised"
        console.log("Fourth test: Pass");
    } else {
        console.log(`Fourth test: Fail, answer: ${99+2*5/5*0}`);
    }

    if (calc.calculate("6+-2") === calc.ERROR_SYNTAX) {
        // Test double operator error.
        console.log("Fifth test: Pass");
    } else {
        console.log(`Fifth test: Fail, answer: ${calc.ERROR_SYNTAX}`);
    }

    if (calc.calculate("6+2*") === calc.ERROR_SYNTAX) {
        // Test no operand error.
        console.log("Sixth test: Pass");
    } else {
        console.log(`Sixth test: Fail, answer: ${calc.ERROR_SYNTAX}`);
    }

    if (calc.calculate("-45+78/") === calc.ERROR_SYNTAX) {
        // Test no operand error on both sides.
        console.log("Seventh test: Pass");
    } else {
        console.log(`Seventh test: Fail, answer: ${calc.ERROR_SYNTAX}`);
    }

    if (calc.calculate("100.1 * 34.983 + 67.12 / 5.6") === (100.1 * 34.983 + 67.12 / 5.6)) {
        // Test operations with float numbers.
        console.log("Eighth test: Pass");
    } else {
        console.log(`Eighth test: Fail, answer: ${100.1 * 34.983 + 67.12 / 5.6}`);
    }

    if (calc.calculate("10.0.1 * 34.983 + 67.12 / 5.6") === calc.ERROR_SYNTAX) {
        // Test multiple decimal error.
        console.log("Ninth test: Pass");
    } else {
        console.log(`Ninth test: Fail, answer: ${calc.ERROR_SYNTAX}`);
    }
}

let calc = new calculator();
unitTest(calc);