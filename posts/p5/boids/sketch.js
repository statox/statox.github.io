let TARGET_MAX_SPEED = 5;
let CROWD_SIZE = 50;
let TARGET_MAX_ACC = 2;
let birds;
let ORD;
let enableAlignment = false;
let enableSeparation = false;
let enableWiggle = true;
let enableFollowMouse = false;
let enableWrapEdges = false;
let enableFollowTarget = false;
let enableCohesion = false;
let enableLoop = true;
let SQUARES=10;
let repartition;

let target;

function resetBirds() {
    birds = [];

    target = new Target(0);

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
    initializeButtons();

    resetBirds();
    setFlockSize()
}

function draw() {
    background(0, 0, 0);

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
    }

    if (enableFollowTarget) {
        target.move();
        target.show();
    }
}

function windowResized() {
    customResizeCanvas();
}

function mousePressed() {
    if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) {
        return;
    }

    const pos = new p5.Vector(mouseX, mouseY);

    // const dx = random(-1, 1);
    // const dy = random(-1, 1);
    // // Constant initial velocity
    // const vel = new p5.Vector(dx, dy).normalize();
    const vel = new p5.Vector(1, 0).normalize();

    birds.push(new Bird(birds.length, pos, vel));
}
