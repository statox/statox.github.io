const LIMIT_SIZE = 100;
const BORDER_LIMIT = 20;

function Bird(id, pos, vel) {
    this.id = id;
    this.pos = pos;
    this.vel = vel;
    this.acc = new p5.Vector(0, 0);
    this.nextAcc = new p5.Vector(0, 0);
    this.r = 20;
    this.color = random(255);
    this.marked = false;
    this.MAX_WIGGLE_ANGLE = radians(10);

    this.ALIGNMENT_FRIENDS_RADIUS = 100;
    this.SEPARATION_FRIENDS_RADIUS = 30;
    this.COHESION_FRIENDS_RADIUS = 80;
    this.OBSTACLE_RADIUS = 50;

    this.WIGGLE_ACC_INTENSITY = 3;
    this.ALIGNMENT_ACC_INTENSITY = 3;
    this.SEPARATION_ACC_INTENSITY = 2;
    this.COHESION_ACC_INTENSITY = 3;
    this.TARGET_ACC_INTENSITY = 0.5;

    this.OBSTACLE_ACC_INTENSITY = 5;

    this.alignmentFriends = [];
    this.separationFriends = [];
    this.cohesionFriends = [];
    this.nearObstacles = [];

    this.MAX_ACC = 1;
    this.MAX_SPEED = 6;

    // Populate the arrays of friends for each force to do the computations efficiently
    this.updateFriends = () => {
        const alignment = [];
        const separation = [];
        const cohesion = [];
        const myobstacles = []; // The name obstacles is already a global variable

        const alignmentCircle = new Circle(this.pos.x, this.pos.y, this.ALIGNMENT_FRIENDS_RADIUS);
        birdsQTree.query(alignmentCircle, alignment);
        const separationCircle = new Circle(this.pos.x, this.pos.y, this.SEPARATION_FRIENDS_RADIUS);
        birdsQTree.query(separationCircle, separation);
        const cohesionCircle = new Circle(this.pos.x, this.pos.y, this.COHESION_FRIENDS_RADIUS);
        birdsQTree.query(cohesionCircle, cohesion);
        const obstaclesCircle = new Circle(this.pos.x, this.pos.y, this.OBSTACLE_RADIUS);
        obstaclesQTree.query(obstaclesCircle, myobstacles);

        this.alignmentFriends = alignment.map(i => i.userData);
        this.separationFriends = separation.map(i => i.userData);
        this.cohesionFriends = cohesion.map(i => i.userData);
        this.nearObstacles = myobstacles.map(i => i.userData);
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

        const maxPullbackAcc = 100;
        if (this.pos.x < BORDER_LIMIT) {
            this.vel.x = abs(this.vel.x);
        }
        if (this.pos.x > width - BORDER_LIMIT) {
            this.vel.x = -abs(this.vel.x);
        }
        if (this.pos.y < BORDER_LIMIT) {
            this.vel.y = abs(this.vel.y);
        }
        if (this.pos.y > height - BORDER_LIMIT) {
            this.vel.y = -abs(this.vel.y);
        }
        return steering;
    };

    // Compute steering force towards the mouse
    this.getMouseAcceleration = () => {
        if (!enableFollowMouse) {
            return;
        }

        if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) {
            return;
        }

        const mouse = new p5.Vector(mouseX, mouseY);
        const mouseSteer = mouse.sub(this.pos);
        mouseSteer.setMag(this.TARGET_ACC_INTENSITY);
        return mouseSteer;
    };

    // Compute steering force towards the same direction as the local flock
    this.getAlignmentAcceleration = () => {
        if (!enableAlignment) {
            return;
        }

        const alignmentSteer = new p5.Vector(0, 0);
        this.alignmentFriends.forEach(id => {
            if (id === this.id) {
                return;
            }
            const acc = birds[id].acc;
            alignmentSteer.add(acc);
        });

        if (this.alignmentFriends.length > 1) {
            alignmentSteer.div(this.alignmentFriends.length);
            alignmentSteer.setMag(this.ALIGNMENT_ACC_INTENSITY);
            alignmentSteer.sub(this.vel);
            alignmentSteer.limit(this.MAX_ACC);
        }
        return alignmentSteer;
    };

    // Compute steering force away from neighbors
    this.getSeparationAcceleration = () => {
        if (!enableSeparation) {
            return;
        }

        const separationSteer = new p5.Vector(0, 0);
        this.separationFriends.forEach(id => {
            if (id === this.id) {
                return;
            }
            const pos = birds[id].pos;
            const acc = this.pos.copy().sub(pos);
            const d = dist(this.pos.x, this.pos.y, pos.x, pos.y);
            acc.div(d);
            separationSteer.add(acc);
        });
        separationSteer.setMag(this.SEPARATION_ACC_INTENSITY);
        return separationSteer;
    };

    // Compute steering force towards local center of mass
    this.getCohesionAcceleration = () => {
        if (!enableCohesion) {
            return
        }

        const cohesionSteer = new p5.Vector(0, 0);
        this.cohesionFriends.forEach(id => {
            if (id === this.id) {
                return;
            }
            const pos = birds[id].pos;
            const steer = pos.copy().sub(this.pos);
            cohesionSteer.add(steer);
        });

        if (this.cohesionFriends.length > 1) {
            cohesionSteer.div(this.cohesionFriends.length);
            cohesionSteer.setMag(this.COHESION_ACC_INTENSITY);
            cohesionSteer.limit(this.MAX_ACC);
        }
        return cohesionSteer;
    };

    // Compute steering in a random position
    this.getWiggleAcceleration = () => {
        if (!enableWiggle) {
            return;
        }

        const wiggleAngle = map(random(), 0, 1, -this.MAX_WIGGLE_ANGLE, this.MAX_WIGGLE_ANGLE);
        const wiggleSteer = this.vel.copy().rotate(wiggleAngle);
        wiggleSteer.setMag(this.WIGGLE_ACC_INTENSITY);
        return wiggleSteer;
    };

    // Compute steering towards the target object
    this.getTargetAcceleration = () => {
        if (!enableFollowTarget) {
            return;
        }
        const targetSteer = target.pos.copy().sub(this.pos);
        targetSteer.setMag(this.TARGET_ACC_INTENSITY);
        return targetSteer;
    };

    // Compute steering rejecting from obstacles
    this.getObstaclesAvoidingAcceleration = () => {
        const obstacleSteer = new p5.Vector(0, 0);

        this.nearObstacles.forEach(id => {
            const o = obstacles[id];
            const steer = p5.Vector.sub(this.pos, o.pos);
            obstacleSteer.add(steer);
        });

        obstacleSteer.setMag(this.OBSTACLE_ACC_INTENSITY);
        return obstacleSteer;
    }

    this.computeMove = () => {
        this.updateFriends();

        const forcesToApply = [
            this.getBorderAvoidingAcceleration(),
            this.getWiggleAcceleration(),
            this.getMouseAcceleration(),
            this.getTargetAcceleration(),
            this.getAlignmentAcceleration(),
            this.getSeparationAcceleration(),
            this.getCohesionAcceleration(),
            this.getObstaclesAvoidingAcceleration(),
        ]

        const netAcceleration = new p5.Vector(0, 0);
        forcesToApply.forEach(f => netAcceleration.add(f));
        this.nextAcc = netAcceleration;
    };

    this.move = () => {
        // Reset the acceleration after moving to avoid stacking forces of each iteration
        this.acc.mult(0);
        this.acc = this.nextAcc;
        this.vel.add(this.acc);
        this.vel.limit(this.MAX_SPEED);
        this.pos.add(this.vel);
    };

    this.show = () => {
        const angle = ORD.angleBetween(this.vel);
        noStroke();
        push();
        translate(this.pos.x, this.pos.y);
        noFill();

        if (this.id === birds[0].id) {
            birds.forEach(b => b.marked = false);
            if (enableShowPerception) {
                if (enableAlignment) {
                    this.alignmentFriends.forEach(id => birds[id].marked = true);
                    console.log(this.alignmentFriends.length);
                    strokeWeight(3);
                    stroke('green');
                    circle(0, 0, this.ALIGNMENT_FRIENDS_RADIUS);
                }
                if (enableSeparation) {
                    this.separationFriends.forEach(id => birds[id].marked = true);
                    strokeWeight(2);
                    stroke('red');
                    circle(0, 0, this.SEPARATION_FRIENDS_RADIUS);
                }
                if (enableCohesion) {
                    this.cohesionFriends.forEach(id => birds[id].marked = true);
                    strokeWeight(1);
                    stroke('blue');
                    circle(0, 0, this.COHESION_FRIENDS_RADIUS);
                }
            }
        }

        noStroke();
        rotate(angle);
        fill(255);
        if (this.marked) {
            fill('red');
        }
        triangle(0, this.r, -this.r/3, 0, this.r/3, 0);
        pop();
    };
}
