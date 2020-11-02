class grid {
    WIDTH = 980;
    WIDTH_STR = `${this.WIDTH}px`;
    container = "";
    body = document.querySelector("body");

    constructor(size) {
        this.container = document.createElement("div");
        this.container.style.display = "grid";
        this.container.style.width = this.WIDTH_STR;

        this.initializeSquares(size);

        this.buttonControls = document.createElement("div");
        this.buttonControls.style.display = "flex";
        this.buttonControls.style.flexDirection = "row";

        this.clearButton = this.makeNewButton("Clear");
        this.clearButton.addEventListener("click", (e) => {
            this.clearColor();
        });
        this.buttonControls.appendChild(this.clearButton);

        this.sizeInput = document.createElement("input");
        this.sizeInput.type = "number";
        this.sizeInput.style.border = "1px solid rgba(100, 100, 100, 0.5)";
        this.buttonControls.appendChild(this.sizeInput);

        this.resizeButton = this.makeNewButton("Resize");
        this.resizeButton.addEventListener("click", (e) => {
            let newSize = this.sizeInput.value;
            this.removeSquares();
            this.initializeSquares(newSize);
        });
        this.buttonControls.appendChild(this.resizeButton);

        this.body.appendChild(this.buttonControls);
        this.body.appendChild(this.container);
    }
    initializeSquares(size) {
        if(size > 100) {
            size = 100;
        }

        this.container.style.gridTemplateColumns = this.gridSizer(size);
        this.container.style.gridTemplateRows = this.gridSizer(size);

        let totalSquares = size * size;
        for (let i = 0; i < totalSquares; i++) {
            const newSquare = new square();
            this.resizeSquare(newSquare, size);
            this.container.appendChild(newSquare.block);
        }
    }
    removeSquares() {
        while(this.container.firstChild) {
            this.container.removeChild(this.container.lastChild);
        }
    }
    resizeSquare(inputSquare, x) {
        let size = String(this.WIDTH / x) + "px";
        inputSquare.block.style.height = size;
    }
    makeNewButton(string) {
        let button = document.createElement("button");
        button.style.border = "1px solid black";
        button.style.padding = "1em";
        button.textContent = string;
        return button;
    }
    gridSizer(value) {
        return "repeat(" + value + ", auto)";
    }
    clearColor() {
        let allSquares = document.querySelectorAll(".square");
        allSquares.forEach(function(item) {
            item.style.background = "white";
        });
        console.log("Click!");
    }
}

class square {
    painted = false;
    block = "";
    alpha = 0;

    constructor() {
        this.block = document.createElement("div");
        this.block.classList.add("square");
        this.block.style.border = "1px solid rgb(150, 150, 150)"
        this.block.style.background = "white";
        //this.block.textContent = ".";
        this.block.addEventListener("mouseover", (e) => {
            if(this.alpha < 100) {
                this.alpha += 10;
            }
            this.changeColor(this.alpha);
        });
    }

    changeColor(alpha) {
        alpha = 255 - ((255 * alpha) / 100);
        let background = `rgb(${alpha}, ${alpha}, ${alpha})`;
        this.block.style.background = background;
    }
}

const newGrid = new grid(64, 64);