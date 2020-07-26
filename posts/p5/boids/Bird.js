const LIMIT_SIZE = 50;

function Bird(id, pos, vel) {
    this.id = id;
    this.pos = pos;
    this.vel = vel;
    this.acc = new p5.Vector(0, 0);
    this.r = 10;
    this.marked = false;

    // Turn around when on a wall
    this.avoidBorders = () => {
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
        } else {
            if (this.pos.x < 5) {
                this.vel.x = Math.abs(this.vel.x);
                this.pos.x = 5;
            }
            if (this.pos.x > width - 5) {
                this.vel.x = -Math.abs(this.vel.x);
                this.pos.x = width - 5;
            }
            if (this.pos.y < 5) {
                this.vel.y = Math.abs(this.vel.y);
                this.pos.y = 5;
            }
            if (this.pos.y > height - 5) {
                this.vel.y = -Math.abs(this.vel.y);
                this.pos.y = height - 5;
            }
        }
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

        const squareId = this.getCurrentSquare();
        const alignmentSteer = repartition[squareId]
            .map(id => birds[id].acc)
            .reduce((F, acc) => {
                return F.add(acc);
            }, new p5.Vector(0,0));
        return alignmentSteer;
    };

    // Compute steering force away from neighbors
    this.getSeparationAcceleration = () => {
        if (!enableSeparation) {
            return;
        }

        const squareId = this.getCurrentSquare();
        const localPosition = repartition[squareId]
            .map(id => birds[id].pos)
            .reduce((F, pos) => {
                const f = this.pos.copy().sub(pos);
                f.limit(MAX_ACC/10);
                this.applyForce(f);
                return F.add(pos);
            }, new p5.Vector(0,0));
        localPosition.sub(this.pos);
        return;
    };

    // Compute steering in a random position
    this.getWiggleAcceleration = () => {
        if (!enableWiggle) {
            return;
        }

        const wiggleSteer = new p5.Vector(random(-width, width), random(-height, height));
        return wiggleSteer;
    };

    this.move = () => {
        // Reset the acceleration after moving to avoid stacking forces of each iteration
        this.acc.mult(0);

        const wiggleSteer = this.getWiggleAcceleration();
        this.applyForce(wiggleSteer);
        const mouseSteer = this.getMouseAcceleration();
        this.applyForce(mouseSteer);
        const alignmentSteer = this.getAlignmentAcceleration();
        this.applyForce(alignmentSteer);
        const separationSteer = this.getSeparationAcceleration();
        this.applyForce(separationSteer);

        this.avoidBorders();

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
