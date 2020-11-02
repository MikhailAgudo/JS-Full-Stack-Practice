class grid {
    WIDTH_STR = "980px";
    WIDTH = 980;
    container = "";
    body = document.querySelector("body");

    constructor(size) {
        this.container = document.createElement("div");
        this.container.style.display = "grid";
        this.container.style.width = this.WIDTH_STR;

        this.container.style.gridTemplateColumns = this.gridSizer(size);
        this.container.style.gridTemplateRows = this.gridSizer(size);

        this.initializeSquares(size);

        this.buttonControls = document.createElement("div");
        this.buttonControls.style.display = "flex";
        this.buttonControls.style.flexDirection = "row";

        this.clearButton = document.createElement("button");
        this.clearButton.style.border = "1px solid black";
        this.clearButton.style.padding = "1em";
        this.clearButton.textContent = "Clear";
        this.clearButton.addEventListener("click", (e) => {
            this.clearColor();
        });
        this.buttonControls.appendChild(this.clearButton);

        this.sizeInput = document.createElement("input");
        this.sizeInput.type = "number";
        this.sizeInput.style.border = "1px solid rgba(100, 100, 100, 0.5)";
        this.buttonControls.appendChild(this.sizeInput);

        this.body.appendChild(this.buttonControls);
        this.body.appendChild(this.container);
    }
    initializeSquares(size) {
        let totalSquares = size * size;
        for (let i = 0; i < totalSquares; i++) {
            const newSquare = new square();
            this.resizeSquare(newSquare, size);
            this.container.appendChild(newSquare.block);
        }
    }
    resizeSquare(inputSquare, x) {
        let size = String(this.WIDTH / x) + "px";
        inputSquare.block.style.height = size;
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

    constructor() {
        this.block = document.createElement("div");
        this.block.classList.add("square");
        this.block.style.border = "1px solid rgb(150, 150, 150)"
        this.block.style.background = "white";
        //this.block.textContent = ".";
        this.block.addEventListener("mouseover", (e) => {
            this.changeColor("black");
        });
    }

    changeColor(color) {
        this.block.style.background = color;
    }
}

const newGrid = new grid(64, 64);