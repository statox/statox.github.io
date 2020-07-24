function customResizeCanvas() {
    const dim = Math.min(windowHeight, windowWidth) * 0.9;
    resizeCanvas(dim, dim);
}

function toggleAlignment() {
    enableAlignment = !enableAlignment;
}

function toggleSeparation() {
    enableSeparation = !enableSeparation;
}

function toggleWiggle() {
    enableWiggle = !enableWiggle;
}

function markRandom() {
    birds.forEach(b => b.marked = false);
    const randId = parseInt(random(0, birds.length-1));
    birds[randId].marked = true;
    console.log('marked', randId);
}

function updateFlockSize() {
    const newSize = document.getElementById('flockSizeInput').value;
    CROWD_SIZE = Number(newSize);
    resetBirds();
}

function setFlockSize() {
    document.getElementById('flockSizeInput').value = CROWD_SIZE;
}
