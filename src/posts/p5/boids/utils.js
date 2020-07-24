function squareIdToIJ(index) {
    return {
        i: index % SQUARES,
        j: Math.floor(index / SQUARES)
    };
}

const squareIJToIndex = (i, j) => {
    return i + SQUARES * j;
}

const squareIdToXY = (index) => {
    const {i, j} = squareIdToIJ(index);
    return {
        x: i * SQUARES,
        y: j * SQUARES
    }
}
