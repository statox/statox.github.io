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
    const cell = cells[j][i];
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

function resetGame() {
    gameLost = false;
    gameWon = false;
    cells = [];
    bombs=0;
    openedCells=new Set();
    flaggedCells=new Set();
    for (let j=0; j<COL; j++) {
        cells.push([]);
        for (let i=0; i<COL; i++) {
            const bomb = Math.random() < fillingRatio;
            if (bomb) {
                bombs++;
            }
            cells[j].push(new Cell(i, j, bomb));
        }
    }
}

function loseGame() {
    gameLost = true;
    setTimeout(resetGame, 2000);
}

function winGame() {
    gameWon = true;
    setTimeout(resetGame, 2000);
}

function clickCell(i, j, mode) {
    const cell = cells[j][i];

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

    if (flaggedCells.size === bombs && openedCells.size === COL*COL-bombs) {
        winGame();
    }
}
