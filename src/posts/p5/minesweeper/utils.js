const ijToxy = (i, j) => {
    return {
        x: i*(D/COL),
        y: j*(D/COL)
    };
}

const xyToij = (x, y) => {
    return {
        i: Math.floor(x/CELL_SIZE),
        j: Math.floor(y/CELL_SIZE)
    }
}

const ijToIndex = (i, j) => {
    return i + COL * j;
}

function openCells(i, j, visited) {
    const cell = game.cells[j][i];
    cell.open();
    visited.add(cell.index);

    if (cell.countBombNeighbors > 0) {
        return;
    }

    cell.neighbors.forEach(n => {
        if (!visited.has(n.index)) {
            openCells(n.i, n.j, visited);
        }
    });
}

function loseGame() {
    game.lost = true;
    setTimeout(() => game = new Game(), 2000);
}

function winGame() {
    game.won = true;
    setTimeout(() => game = new Game(), 2000);
}

function clickCell(x, y) {
    // Don't accept inputs when user lost
    if (game.lost) {
        return;
    }


    const {i, j} = xyToij(x, y);
    const cell = game.cells[j][i];

    if (mouseButton === 'left') {
        // Don't click already clicked cells or the flagged ones
        if (cell.isOpen || cell.flagged) {
            return;
        }

        if (cell.bomb) {
            loseGame();
        }

        openCells(i, j, new Set());
    }

    if (mouseButton === 'right' && !cell.isOpen ) {
        cell.flagToggle();
    }

    if (game.flaggedCells.size === game.bombs && game.openedCells.size === COL*COL-game.bombs) {
        winGame();
    }
}
