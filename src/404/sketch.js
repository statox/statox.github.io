let cells=[];
let COLS=50;
let CELL_SIZE;

function setup() {
    // Create the canvas and put it in its div
    const divWidth = document.getElementById("canvasDiv").offsetWidth
    const myCanvas = createCanvas(divWidth, divWidth);
    myCanvas.parent("canvasDiv");

    resetGOL();
    setInterval(iterate, 150);
}

function draw() {
    background(0);
    cells.forEach(c => {c.show()});
}

function windowResized() {
    const divWidth = document.getElementById("canvasDiv").offsetWidth
    resizeCanvas(divWidth, divWidth);
    resetGOL();
}

function resetGOL() {
    CELL_SIZE = width / COLS;
    for (let j=0; j<COLS; j++) {
        for (let i=0; i<COLS; i++) {
            cells.push(new Cell(i, j));
        }
    }
    for (let i=0; i<cells.length; i++) {
        cells[i].setupNeighbors();
    }
}

function iterate() {
    cells.forEach(c => {
        c.alive = c.nextAlive;
        c.nextAlive = false;
        const countN = c.countNeighbors();
        if (!c.alive && countN === 3) {
            c.nextAlive = true;
        }
        if (c.alive && (countN < 3 || countN > 4)) {
            c.nextAlive = true;
        }
    });
}
