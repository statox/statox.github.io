const LIMIT_SIZE = 50;

function Bird(id, pos, vel) {
    this.id = id;
    this.pos = pos;
    this.vel = vel;
    this.r = 10;
    this.marked = false;

    // Turn around when on a wall
    this.avoidBorders = () => {
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
        /*
         * if (this.pos.x < 0 || this.pos.x > width) {
         *     this.vel.x *= -1;
         * }
         * if (this.pos.y < 0 || this.pos.y >= height) {
         *     this.vel.y *= -1;
         * }
         */
    };

    // Uses this.pos to split the crowd in several squares on influence
    this.getCurrentSquare = () => {
        const relativeX = parseInt(map(this.pos.x, 0, width, 0, SQUARES-1));
        const relativeY = parseInt(map(this.pos.y, 0, height, 0, SQUARES-1));
        return relativeX + relativeY * SQUARES;
    };

    // Steer in the same direction as the local flock
    this.alignment = () => {
        if (!enableAlignment) {
            return;
        }
        const squareId = this.getCurrentSquare();
        let nbAngles = 0;
        let totalAngle = 0;
        repartition[squareId]
            .map(id => birds[id])
            .forEach(other => {
                totalAngle += this.vel.angleBetween(other.vel);
                nbAngles++;
            });
        const averageAngle = totalAngle/ nbAngles;
        this.vel.rotate(averageAngle);
    };

    this.separation = () => {
        if (!enableSeparation) {
            return;
        }

        const squareId = this.getCurrentSquare();
        let neighborsSquares = [];
        const {i, j} = squareIdToIJ(squareId);

        if (j > 0) {
            if (i>0) {
                neighborsSquares.push(squareIJToIndex(i-1, j-1));
            }
            neighborsSquares.push(squareIJToIndex(i, j-1));
            if (i<SQUARES-1) {
                neighborsSquares.push(squareIJToIndex(i+1, j-1));
            }
        }
        if (i>0) {
            neighborsSquares.push(squareIJToIndex(i-1, j));
        }
        if (i<SQUARES-1) {
            neighborsSquares.push(squareIJToIndex(i+1, j));
        }
        if (j < SQUARES-1) {
            if (i>0) {
                neighborsSquares.push(squareIJToIndex(i-1, j+1));
            }
            neighborsSquares.push(squareIJToIndex(i, j+1));
            if (i<SQUARES-1) {
                neighborsSquares.push(squareIJToIndex(i+1, j+1));
            }
        }

        const neighborsPopulation = {};
        neighborsSquares.forEach((id) => {
            const population = repartition[id]?.length || 0;
            if (!neighborsPopulation[population]) {
                neighborsPopulation[population] = [];
            }
            neighborsPopulation[population].push(id);
        });

        const minPopulation = Math.min(...Object.keys(neighborsPopulation));
        const chosenIndex = parseInt(random(0, neighborsPopulation[minPopulation].length));
        const chosenNeighbor = neighborsPopulation[minPopulation][chosenIndex];

        const chosenNeighborCoordinates = squareIdToXY(chosenNeighbor);
        const direction = new p5.Vector(chosenNeighborCoordinates.x, chosenNeighborCoordinates.y);
        const angle = this.vel.angleBetween(direction);

        this.vel.rotate(angle);
    };

    // Steer in a random position
    this.wiggle = () => {
        if (!enableWiggle) {
            return;
        }
        // const angle = map(noise(this.pos.x, this.pos.y), 0, 1, -HALF_PI/5, HALF_PI/5);
        const angle = map(random(), 0, 1, -HALF_PI/5, HALF_PI/5);
        this.vel.rotate(angle);
    };

    this.move = () => {
        this.wiggle();
        this.alignment();
        this.separation();

        this.avoidBorders();

        this.vel.add(this.acc);
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
