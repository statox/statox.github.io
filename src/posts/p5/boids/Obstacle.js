function Obstacle(id, pos, r) {
    this.id = id;
    this.pos = pos;
    this.r = r;


    this.show = () => {
        noStroke();
        fill('red');
        circle(this.pos.x, this.pos.y, this.r);
    }
}
