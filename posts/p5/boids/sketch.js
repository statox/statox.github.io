let MAX_SPEED = 5;
let CROWD_SIZE = 500;
let MAX_ACC = 1;
let birds;
let time=0;
let ORD;
let enableAlignment = false;
let enableSeparation = false;
let enableWiggle = true;
let enableFollowMouse = false;
let enableWrapEdges = true;
let SQUARES=10;
let repartition;

function resetBirds() {
    birds = [];
    for (let i=0; i<CROWD_SIZE; i++) {
        // Random initial position
        const x = random(0, width);
        const y = random(0, height);
        const pos = new p5.Vector(x, y);

        const dx = random(-1, 1);
        const dy = random(-1, 1);

        // Constant initial velocity
        const vel = new p5.Vector(dx, dy).normalize();
        // Random initial velocity
        // const vel = new p5.Vector(dx, dy).normalize().mult(random()*MAX_SPEED);

        birds.push(new Bird(i, pos, vel));
    }
}
function setup() {
    // Create the canvas and put it in its div
    const myCanvas = createCanvas(10, 10);
    customResizeCanvas();
    myCanvas.parent("canvasDiv");
    ORD = new p5.Vector(0, 1);

    noiseSeed(99);

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

    if (!enableWrapEdges) {
        stroke('green');
        strokeWeight(10);
        line(0, 0, width, 0);
        line(0, 0, 0, height);
        line(width, 0, width, height);
        line(0, height, width, height);
        noStroke();
    }

    textSize(20);
    fill(enableWiggle ? 'green' : 'red');
    text('wiggle ', 100, 100);
    fill(enableAlignment ? 'green' : 'red');
    text('alignment ', 100, 150);
    fill(enableSeparation ? 'green' : 'red');
    text('separation ', 100, 200);
    fill(enableFollowMouse ? 'green' : 'red');
    text('mouse ', 100, 250);
    noFill();
}

function windowResized() {
    customResizeCanvas();
}
