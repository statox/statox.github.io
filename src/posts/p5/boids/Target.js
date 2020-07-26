const TARGET_BORDER_LIMIT = 40;

function Target(id) {
    const x = random(0, width);
    const y = random(0, height);
    const pos = new p5.Vector(x, y);

    const dx = random(-1, 1);
    const dy = random(-1, 1);
    // Constant initial velocity
    const vel = new p5.Vector(dx, dy).normalize().mult(TARGET_MAX_SPEED);

    this.id = id;
    this.pos = pos;
    this.vel = vel;
    this.acc = new p5.Vector(0, 0);
    this.r = 5;

    // Either wrap around edges or return an acceleration repealling from edges
    this.getBorderAvoidingAcceleration = () => {
        const steering = new p5.Vector(0, 0);
        if (enableWrapEdges) {
            if (this.pos.x < 0 ) {
                this.pos.x = width;
            }
            if (this.pos.x > width) {
                this.pos.x = 0;
            }
            if (this.pos.y < 0 ) {
                this.pos.y = height;
            }
            if (this.pos.y > height) {
                this.pos.y = 0;
            }
            return steering;
        }

        if (this.pos.x < TARGET_BORDER_LIMIT) {
            steering.x = TARGET_MAX_ACC;
        }
        if (this.pos.x > width - TARGET_BORDER_LIMIT) {
            steering.x = -TARGET_MAX_ACC;
        }
        if (this.pos.y < TARGET_BORDER_LIMIT) {
            steering.y = TARGET_MAX_ACC;
        }
        if (this.pos.y > height - TARGET_BORDER_LIMIT) {
            steering.y = -TARGET_MAX_ACC;
        }
        return steering;
    };

    // Compute steering in a random position
    this.getWiggleAcceleration = () => {
        if (!enableWiggle) {
            return;
        }

        const wiggleSteer = new p5.Vector(random(-10, 10), random(-10, 10));
        return wiggleSteer;

        // const wiggleAngle = map(random(), 0, 1, -this.MAX_WIGGLE_ANGLE, this.MAX_WIGGLE_ANGLE);
        // const wiggleSteer = this.vel.copy().rotate(wiggleAngle);
        // return wiggleSteer;
    };

    // Take a steering force and apply it to the current acceleration
    this.applyForce = (force) => {
        if (!force) {
            return;
        }

        force.limit(TARGET_MAX_ACC);
        this.acc.add(force);
    };


    this.move = () => {
        const borderSteer = this.getBorderAvoidingAcceleration();
        this.applyForce(borderSteer);
        const wiggleSteer = this.getWiggleAcceleration();
        this.applyForce(wiggleSteer);

        this.vel.add(this.acc);
        this.vel.limit(TARGET_MAX_SPEED);
        this.pos.add(this.vel);
    }

    this.show = () => {
        noStroke();
        fill('red');
        circle(this.pos.x, this.pos.y, this.r);
    }
}
