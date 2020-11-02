class grid {
    // This class creates a grid of n by n squares
    // to group up the squares in one area. It contains
    // all the functions needed to manipulate the grid.
    WIDTH = 980;
    WIDTH_STR = `${this.WIDTH}px`;

    // The $container variable will turn into a div
    // element, and we'll need $body to append children
    // nodes to.
    container = "";
    body = document.querySelector("body");

    constructor(size) {
        // Initialize $container, and make it into a
        // grid display to make it easier to view in
        // a grid (compared to other approaches).
        // The specified width is 980, which WIDTH_STR
        // converts into a proper input for HTML.
        this.container = document.createElement("div");
        this.container.style.display = "grid";
        this.container.style.width = this.WIDTH_STR;

        // Then, call the function that will add
        // new children into the grid.
        this.initializeSquares(size);

        // Initialize a new div where all the buttons
        // and inputs will be at.
        this.buttonControls = document.createElement("div");
        this.buttonControls.style.display = "flex";
        this.buttonControls.style.flexDirection = "row";

        // The Clear button will help us clear the
        // sketch via clearColor(). This allows a new
        // canvas to draw on.
        this.clearButton = this.makeNewButton("Clear");
        this.clearButton.addEventListener("click", (e) => {
            this.clearColor();
        });
        this.buttonControls.appendChild(this.clearButton);

        // Make an input element in number type, because
        // we'll only need numbers (the size).
        this.sizeInput = document.createElement("input");
        this.sizeInput.type = "number";
        this.sizeInput.style.border = "1px solid rgba(100, 100, 100, 0.5)";
        this.buttonControls.appendChild(this.sizeInput);

        // The Resize button will change the size of the
        // grid for us.
        this.resizeButton = this.makeNewButton("Resize");
        this.resizeButton.addEventListener("click", (e) => {
            let newSize = this.sizeInput.value;
            this.removeSquares();
            this.initializeSquares(newSize);
        });
        this.buttonControls.appendChild(this.resizeButton);

        // Then, append the buttons & inputs, and the
        // grid div. So the body actually displays them.
        this.body.appendChild(this.buttonControls);
        this.body.appendChild(this.container);
    }
    initializeSquares(size) {
        // If the size input is greater than 100,
        // turn it into 100; because great values will
        // consume too much resources.
        if(size > 100) {
            size = 100;
        }

        // Using the gridSizer() function we'll tell
        // HTML how many columns and rows we want.
        this.container.style.gridTemplateColumns = this.gridSizer(size);
        this.container.style.gridTemplateRows = this.gridSizer(size);

        // Then we'll have to do this for loop
        // to help us make new square() objects
        // then append them to the grid.
        // The resizeSquare() function is also important
        // to adjust the height of the square.
        let totalSquares = size * size;
        for (let i = 0; i < totalSquares; i++) {
            const newSquare = new square();
            this.resizeSquare(newSquare, size);
            this.container.appendChild(newSquare.block);
        }
    }
    removeSquares() {
        // Helped by https://stackoverflow.com/questions/3955229/remove-all-child-elements-of-a-dom-node-in-javascript
        // Explanation: while there is still a first
        // child, keep deleting the last child.
        while(this.container.firstChild) {
            this.container.removeChild(this.container.lastChild);
        }
    }
    resizeSquare(inputSquare, x) {
        // Divide the size from the needed grid width
        // to help us calculate the height, turning
        // the grid into a square.
        let size = `${this.WIDTH / x}px`
        inputSquare.block.style.height = size;
    }
    makeNewButton(string) {
        // We're creating two buttons with the same
        // process so this function will make it easier to
        // make a new one, and cleaner.
        let button = document.createElement("button");
        button.style.border = "1px solid black";
        button.style.padding = "1em";
        button.textContent = string;
        return button;
    }
    gridSizer(value) {
        // Turn the grid size into a proper HTML input
        // for the grid sizes. "auto" is there
        // because we already set the width to
        // 980. We don't need to manually set it
        // ourselves.
        return `repeat(${value}, auto)`;
    }
    clearColor() {
        // Select all square() objects then turn
        // each of them into a white color; the default.
        // Clears the canvas, via the Clear button.
        let allSquares = document.querySelectorAll(".square");
        allSquares.forEach(function(item) {
            item.style.background = "white";
        });
    }
}

class square {
    // $block will be initialized as a div, then
    // $alpha keeps track of the rgb values, which
    // will later be converted from 0 to 100% to
    // 0 to 255.
    block = "";
    alpha = 0;

    constructor() {
        this.block = document.createElement("div");

        // We need to add it to a class list of "square"
        // to help us find all of the squares later then
        // delete them.
        this.block.classList.add("square");
        this.block.style.border = "1px solid rgb(150, 150, 150)"
        this.block.style.background = "white";
        
        // Then on hover, we need to add alpha
        // then changeColor(), for the actual
        // sketching to happen.
        this.block.addEventListener("mouseover", (e) => {
            if(this.alpha < 100) {
                this.alpha += 10;
            }
            this.changeColor(this.alpha);
        });
    }

    changeColor(alpha) {
        // 255 is white, so we subtract the second
        // operand to make it darker.
        alpha = 255 - ((255 * alpha) / 100);
        let background = `rgb(${alpha}, ${alpha}, ${alpha})`;
        this.block.style.background = background;
    }
}

const newGrid = new grid(64, 64);