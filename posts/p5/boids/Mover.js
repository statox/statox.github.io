function Mover(pos, vel, acc) {
    this.pos = pos;
    this.vel = vel;
    this.acc = acc;
    this.forceFunctions = [];
    this.MAX_SPEED = max_speed;
    this.MAX_ACC = max_acc;

    // Take a steering force and apply it to the current acceleration
    this.applyForce = (force) => {
        if (!force) {
            return;
        }

        force.limit(this.MAX_ACC);
        this.acc.add(force);
    };

    this.move = () => {
        // Reset the acceleration after moving to avoid stacking forces of each iteration
        this.acc.mult(0);
    };
}
