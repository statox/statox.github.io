function Cell(i, j, bomb) {
    this.i = i;
    this.j = j;
    this.index = i + COL * j;
    this.bomb = bomb;
    this.isOpen = false;
    this.flagged = false;
    this.countBombNeighbors;
    this.neighbors;

    this.open = () => {
        this.isOpen = true;
        game.openedCells.add(this.index);
        if (!this.neighbors) {
            this.neighbors = this.getNeighbors();
            this.countBombNeighbors = this.neighbors.filter(n => n.bomb).length;
        }
    };

    this.flagToggle = () => {
        this.flagged = !this.flagged;
        if (this.flagged) {
            game.flaggedCells.add(this.index);
        } else {
            game.flaggedCells.delete(this.index);
        }
    };

    this.show = () => {
        const {x, y} = ijToxy(this.i, this.j);
        stroke(0);
        rect(x+2, y+2, CELL_SIZE-4);

        let cellColor = color(125, 125, 125);

        if (this.isOpen) {
            if (this.bomb) {
                cellColor = color(250, 10, 10);
            } else {
                cellColor = color(200, 200, 200);
            }
        }
        if (this.flagged) {
            cellColor = color(100, 250, 100);
        }
        fill(cellColor);
        rect(x, y, CELL_SIZE);

        if (this.isOpen && !this.bomb && this.countBombNeighbors > 0) {
            fill(color(NUMBER_COLORS[this.countBombNeighbors - 1]));
            textSize(D/COL);
            text(this.countBombNeighbors, x, y+D/COL);
        }
    }

    this.getNeighbors = () => {
        const neighbors = [];
        if (j > 0) {
            if (i > 0) {
                neighbors.push(game.cells[j-1][i-1])
            }
            neighbors.push(game.cells[j-1][i])
            if (i < COL-1) {
                neighbors.push(game.cells[j-1][i+1])
            }
        }

        if (i > 0) {
            neighbors.push(game.cells[j][i-1])
        }
        if (i < COL-1) {
            neighbors.push(game.cells[j][i+1])
        }

        if (j < COL-1) {
            if (i > 0) {
                neighbors.push(game.cells[j+1][i-1])
            }
            neighbors.push(game.cells[j+1][i])
            if (i < COL-1) {
                neighbors.push(game.cells[j+1][i+1])
            }
        }

        return neighbors;
    }
}
