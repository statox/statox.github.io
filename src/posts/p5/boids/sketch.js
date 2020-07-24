let MAX_SPEED = 5;
let CROWD_SIZE = 1;
let MAX_ACC = 1;
let birds;
let time=0;
let ORD;
let enableAlignment = false;
let enableSeparation = false;
let enableWiggle = false;
let SQUARES=10;
let repartition;

function resetBirds() {
    birds = [];
    for (let i=0; i<CROWD_SIZE; i++) {
        // Random initial position
        const x = random(0, width);
        const y = random(0, height);
        const pos = new p5.Vector(x, y);

        // Random initial velocity
        const dx = random(-MAX_SPEED, MAX_SPEED);
        const dy = random(-MAX_SPEED, MAX_SPEED);
        const vel = new p5.Vector(dx, dy);

        birds.push(new Bird(i, pos, vel));
    }
}
function setup() {
    // Create the canvas and put it in its div
    const myCanvas = createCanvas(10, 10);
    customResizeCanvas();
    myCanvas.parent("canvasDiv");
    ORD = new p5.Vector(0, 1);

    resetBirds();
    setFlockSize()
}

function draw() {
    time++;
    background(0, 0, 0);

    // Group the birds by squares of influence (birds in the same section of the screen)
    // to ease the calculation of orientation influences
    repartition = {};
    birds.forEach(b => {
        const squareId = b.getCurrentSquare();
        if (!repartition[squareId]) {
            repartition[squareId] = []
        }
        repartition[squareId].push(b.id);
    });

    birds.forEach(b => {
        b.move();
        b.show();
    });

    textSize(20);
    fill(enableAlignment ? 'green' : 'red');
    text('alignment ', 100, 100);
    fill(enableSeparation ? 'green' : 'red');
    text('separation ', 100, 150);
    noFill();
}

function windowResized() {
    customResizeCanvas();
}
