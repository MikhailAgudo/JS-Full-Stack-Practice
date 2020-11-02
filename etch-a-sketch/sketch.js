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