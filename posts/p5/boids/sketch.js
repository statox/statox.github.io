let target;
let TARGET_MAX_SPEED = 5;
let TARGET_MAX_ACC = 2;

let birds;
let birdsQTree;
let obstacles;
let obstaclesQTree;
let obstaclesCreationTimer=0;

let ORD;

let app;

let boidsSettings = {
    enableWiggle: true,
    enableRoundShape: false,

    enableAlignment: true,
    enableSeparation: true,
    enableCohesion: true,

    enableFollowMouse: false,
    enableFollowTarget: false,

    enableWrapEdges: true,
    enableShowPerception: false,

    enableObstaclesDrawing: false,

    CROWD_SIZE: 100,
    MAX_WIGGLE_ANGLE: 50,

    ALIGNMENT_FRIENDS_RADIUS: 100,
    SEPARATION_FRIENDS_RADIUS: 30,
    COHESION_FRIENDS_RADIUS: 80,
    OBSTACLE_RADIUS: 50,

    WIGGLE_ACC_INTENSITY: 3,
    ALIGNMENT_ACC_INTENSITY: 3,
    SEPARATION_ACC_INTENSITY: 2,
    COHESION_ACC_INTENSITY: 3,
    TARGET_ACC_INTENSITY: 0.5,
    OBSTACLE_ACC_INTENSITY: 5,

    MAX_ACC: 1,
    MAX_SPEED: 6,
}

app = new Vue({
  el: '#boidsApp',
  data: boidsSettings
});


function resetObstacles() {
    obstacles = [];
}

function resetBirds() {
    birds = [];

    target = new Target(0);

    for (let i=0; i<boidsSettings.CROWD_SIZE; i++) {
        // Random initial position
        const x = random(0, width);
        const y = random(0, height);
        const pos = new p5.Vector(x, y);

        const dx = random(-1, 1);
        const dy = random(-1, 1);

        // Constant initial velocity
        // const vel = new p5.Vector(1, 0).normalize();
        // Random initial velocity
        const vel = new p5.Vector(dx, dy).normalize();

        birds.push(new Bird(i, pos, vel));
    }
}
function setup() {
    // Create the canvas and put it in its div
    const myCanvas = createCanvas(10, 10);
    customResizeCanvas();
    myCanvas.parent("canvasDiv");
    ORD = new p5.Vector(0, 1);

    initializeButtons();

    resetBirds();
    resetObstacles();
}

function draw() {
    background(0, 0, 0);

    const boundaries = new Rectangle(0, 0, width, height);
    const capacity = 4;
    birdsQTree = new QuadTree(boundaries, capacity);
    obstaclesQTree = new QuadTree(boundaries, capacity);

    if (boidsSettings.enableObstaclesDrawing) {
        obstaclesCreationTimer = (obstaclesCreationTimer + 1) % 10;
        if (obstaclesCreationTimer === 0) {
            const mousePosition = new p5.Vector(mouseX, mouseY);
            const obstacle = new Obstacle(obstacles.length, mousePosition, 30);
            obstacles.push(obstacle);
        }
    }

    obstacles.forEach(o => {
        // TODO: I think it's not needed to do that at each iteration
        obstaclesQTree.insert(new Point(o.pos.x, o.pos.y, o.id));
        o.show();
    });

    birds.forEach(b => {
        birdsQTree.insert(new Point(b.pos.x, b.pos.y, b.id));
    });

    // TODO:
    // I thought there was an issue when the compute and the move were done
    // at the same time but now I'm not sure I see a visible change when
    // the computation is done with the move
    birds.forEach(b => {
        b.computeMove();
    });

    birds.forEach(b => {
        b.move();
        b.show();
    });

    if (!boidsSettings.enableWrapEdges) {
        stroke('green');
        strokeWeight(10);
        line(0, 0, width, 0);
        line(0, 0, 0, height);
        line(width, 0, width, height);
        line(0, height, width, height);
    }

    if (boidsSettings.enableFollowTarget) {
        target.move();
        target.show();
    }
}
