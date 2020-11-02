class grid {
    container = "";
    body = document.querySelector("body");

    constructor(x, y) {
        this.container = document.createElement("div");
        this.container.style.display = "grid";

        let xSize = this.gridSizer(x);
        let ySize = this.gridSizer(y);
        this.container.style.gridTemplateColumns = xSize;
        this.container.style.gridTemplateRows = ySize;

        this.initializeSquares(x, y);
        this.body.appendChild(this.container);
    }
    initializeSquares(x, y) {
        let totalSquares = x * y;
        for (let i = 0; i < totalSquares; i++) {
            const newSquare = new square();
            this.container.appendChild(newSquare.block);
        }
    }
    gridSizer(amount) {
        let string = "";
        for (let i = 0; i < amount; i++) {
            string += "auto ";
        }
        return string;
    }
    clearColor() {
        allSquares = document.querySelector(".square");
        allSquares.style.background = "white";
    }
}

class square {
    painted = false;
    block = "";

    constructor() {
        this.block = document.createElement("div");
        this.block.classList.add("square");
        this.block.style.background = "white";
        this.block.textContent = ".";
        this.block.addEventListener("mouseover", this.changeColor("black"));
    }

    changeColor(color) {
        this.block.style.background = color;
    }
}

const newGrid = new grid(16, 16);