function Game() {
    this.lost = false;
    this.won = false;
    this.cells = [];
    this.bombs=0;
    this.openedCells=new Set();
    this.flaggedCells=new Set();

    for (let j=0; j<COL; j++) {
        this.cells.push([]);
        for (let i=0; i<COL; i++) {
            const bomb = Math.random() < fillingRatio;
            if (bomb) {
                this.bombs++;
            }
            this.cells[j].push(new Cell(i, j, bomb));
        }
    }

    this.show = () => {
        for (let j=0; j<COL; j++) {
            for (let i=0; i<COL; i++) {
                this.cells[j][i].show();
            }
        }
    };
}
