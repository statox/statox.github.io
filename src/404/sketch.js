let cells=[];
let COLS=50;
let CELL_SIZE;
let backgroundColor;
let cellColor;

function setup() {
    // Create the canvas and put it in its div
    const myCanvas = createCanvas(windowWidth, windowHeight);
    myCanvas.position(0, 0);
    myCanvas.id('not-found-canvas');
    myCanvas.parent("canvasDiv");


    const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (userPrefersDark) {
        backgroundColor = color(0, 0, 0);
        cellColor = color(10, 10, 10, 150);
    } else {
        backgroundColor = color(250, 250, 250);
        cellColor = color(245, 245, 245, 150);
    }

    resetGOL();
    setInterval(iterate, 150);
}

function draw() {
    background(0);
    cells.forEach(c => {c.show()});
}

function windowResized() {
    const divWidth = document.getElementById("canvasDiv").offsetWidth
    resizeCanvas(windowWidth, windowHeight);
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
        const countN = c.countNeighbors();
        c.nextAlive = false;
        if (!c.alive && countN === 3) {
            c.nextAlive = true;
        }
        if (c.alive && (countN === 2 || countN === 3)) {
            c.nextAlive = true;
        }
    });

    cells.forEach(c => {
        c.alive = c.nextAlive;
    });
}
