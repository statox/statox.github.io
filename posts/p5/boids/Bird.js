const LIMIT_SIZE = 100;
const BORDER_LIMIT = 20;

function Bird(id, pos, vel) {
    this.id = id;
    this.pos = pos;
    this.vel = vel;
    this.acc = new p5.Vector(0, 0);
    this.r = 6;
    this.marked = false;
    this.MAX_WIGGLE_ANGLE = HALF_PI;
    this.ALIGNMENT_FRIENDS_RADIUS = this.r * 5;
    this.SEPARATION_FRIENDS_RADIUS = this.r * 1.5;

    // Think timer to search for friends idea taken here
    // https://github.com/jackaperkins/boids

    this.thinkTimer = parseInt(random(10));
    this.alignmentFriends = [];
    this.separationFriends = []

    this.updateFriends = () => {
        const alignment = new Set();
        const separation = new Set();

        birds.forEach(other => {
            if (this.id !== other.id) {
                const distance = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y);
                if ( distance <= this.ALIGNMENT_FRIENDS_RADIUS ) {
                    alignment.add(other.id);
                }
                if ( distance <= this.SEPARATION_FRIENDS_RADIUS ) {
                    separation.add(other.id);
                }
            }
        });
        this.alignmentFriends = alignment;
        this.separationFriends = separation;
    };

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

        if (this.pos.x < BORDER_LIMIT) {
            steering.x = MAX_ACC;
        }
        if (this.pos.x > width - BORDER_LIMIT) {
            steering.x = -MAX_ACC;
        }
        if (this.pos.y < BORDER_LIMIT) {
            steering.y = MAX_ACC;
        }
        if (this.pos.y > height - BORDER_LIMIT) {
            steering.y = -MAX_ACC;
        }
        return steering;
    };

    // Uses this.pos to split the flock in several squares on influence
    this.getCurrentSquare = () => {
        const relativeX = parseInt(map(this.pos.x, 0, width, 0, SQUARES-1));
        const relativeY = parseInt(map(this.pos.y, 0, height, 0, SQUARES-1));
        return relativeX + relativeY * SQUARES;
    };

    // Take a steering force and apply it to the current acceleration
    this.applyForce = (force) => {
        if (!force) {
            return;
        }

        force.limit(MAX_ACC);
        this.acc.add(force);
    };

    // Compute steering force towards the mouse
    this.getMouseAcceleration = () => {
        if (!enableFollowMouse) {
            return;
        }

        const mouse = new p5.Vector(mouseX, mouseY);
        const mouseSteer = mouse.sub(this.pos);
        return mouseSteer;
    };

    // Compute steering force towards the same direction as the local flock
    this.getAlignmentAcceleration = () => {
        if (!enableAlignment) {
            return;
        }

        const alignmentSteer = new p5.Vector(0, 0);
        this.alignmentFriends.forEach(id => {
            const acc = birds[id].acc;
            alignmentSteer.add(acc);
        });
        return alignmentSteer;
    };

    // Compute steering force away from neighbors
    this.getSeparationAcceleration = () => {
        if (!enableSeparation) {
            return;
        }

        const separationSteer = new p5.Vector(0, 0);
        this.separationFriends.forEach(id => {
            const pos = birds[id].pos;
            const acc = this.pos.copy().sub(pos);
            acc.div(2);
            separationSteer.add(acc);
        });
        return separationSteer;
    };

    // Compute steering in a random position
    this.getWiggleAcceleration = () => {
        if (!enableWiggle) {
            return;
        }

        // const wiggleSteer = new p5.Vector(random(-width, width), random(-height, height));
        // return wiggleSteer;

        const wiggleAngle = map(random(), 0, 1, -this.MAX_WIGGLE_ANGLE, this.MAX_WIGGLE_ANGLE);
        const wiggleSteer = this.vel.copy().rotate(wiggleAngle);
        return wiggleSteer;
    };

    this.getTargetAcceleration = () => {
        if (!enableFollowTarget) {
            return;
        }
        const targetSteer = target.pos.copy().sub(this.pos);
        return targetSteer;
    };

    this.move = () => {
        // Reset the acceleration after moving to avoid stacking forces of each iteration
        this.acc.mult(0);

        this.thinkTimer = (this.thinkTimer + 1) % 5;
        if (this.thinkTimer === 0) {
            this.updateFriends();
        }

        const borderSteer = this.getBorderAvoidingAcceleration();
        this.applyForce(borderSteer);
        const wiggleSteer = this.getWiggleAcceleration();
        this.applyForce(wiggleSteer);
        const mouseSteer = this.getMouseAcceleration();
        this.applyForce(mouseSteer);
        const alignmentSteer = this.getAlignmentAcceleration();
        this.applyForce(alignmentSteer);
        const separationSteer = this.getSeparationAcceleration();
        this.applyForce(separationSteer);
        const targetSteer = this.getTargetAcceleration();
        this.applyForce(targetSteer);

        this.vel.add(this.acc);
        this.vel.limit(MAX_SPEED);
        this.pos.add(this.vel);
    };

    this.show = () => {
        const angle = ORD.angleBetween(this.vel);
        push();
        translate(this.pos.x, this.pos.y);
        rotate(angle);
        fill(250);
        if (this.marked) {
            fill('red');
        }
        triangle(0, this.r, -this.r/3, 0, this.r/3, 0);
        pop();
    };
}