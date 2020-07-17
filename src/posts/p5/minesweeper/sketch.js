const D = 800;
const COL = 20;
const CELL_SIZE = D/COL;
const NUMBER_COLORS = [
    [10,   10, 230],
    [ 10, 230,  10],
    [230,  10,  10],
    [230, 230,  10],

    [ 10,  10, 115],
    [ 10, 115,  10],
    [115,  10,  10],
    [115, 115,  10],
];

let fillingRatio = 0.2;
let cells;
let gameLost;
let gameWon;
let bombs;
let openedCells;
let flaggedCells;

function setup() {
    // Create the canvas and put it in its div
    var myCanvas = createCanvas(D, D);
    myCanvas.parent("canvasDiv");

    resetGame();
}

function draw() {
    background(220);

    for (let j=0; j<COL; j++) {
        for (let i=0; i<COL; i++) {
            cells[j][i].show();
        }
    }

    if (gameLost) {
        fill(250, 0, 0);
        textSize(40);
        text("GAME OVER", 150, D/2);
    };
    if (gameWon) {
        fill(0, 250, 0);
        textSize(40);
        text("YOU WIN", 150, D/2);
    }
}

function mousePressed() {
    // Don't handle clicks out of canvas
    if (mouseX < 0 || mouseX > D || mouseY < 0 || mouseY > D) {
        return;
    }

    // Don't accept inputs when user lost
    if (gameLost) {
        return;
    }

    const {i, j} = xyToij(mouseX, mouseY);
    clickCell(i, j, mouseButton)
}

// Cheat keys
function keyPressed() {
    if (keyCode === UP_ARROW) {
        for (let j=0; j<COL; j++) {
            for (let i=0; i<COL; i++) {
                cells[j][i].open();
            }
        }
    }

    if (keyCode === DOWN_ARROW) {
        resetGame();
    }
}
