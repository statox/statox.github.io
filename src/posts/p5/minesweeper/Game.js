function Game(fillingRatio) {
    this.nbCells = COL * COL;
    this.lost = false;
    this.won = false;
    this.cells = [];
    this.bombs=0;
    this.openedCells=new Set();
    this.flaggedCells=new Set();
    this.fillingRatio = fillingRatio;

    for (let i=0; i<this.nbCells; i++) {
        const bomb = Math.random() < this.fillingRatio;
        if (bomb) {
            this.bombs++;
        }
        this.cells.push(new CellSquare(i, bomb));
    }

    this.show = () => {
        this.cells.forEach(c => c.show());
    };
}
