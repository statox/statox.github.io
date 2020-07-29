function customResizeCanvas() {
    const dim = Math.min(windowHeight, windowWidth) * 0.9;
    resizeCanvas(dim, dim);
}

function toggleEnabledButton(btn) {
    if (btn.classList.contains('active')){
        btn.classList.remove('active');
        btn.classList.add('inactive');
    } else {
        btn.classList.add('active');
        btn.classList.remove('inactive');
    }
}

function updateFlockSize() {
    const newSize = document.getElementById('flockSizeInput').value;
    CROWD_SIZE = Number(newSize);
    resetBirds();
}

function setFlockSize() {
    document.getElementById('flockSizeInput').value = CROWD_SIZE;
}


function initializeButtons() {
    /*
     * Wiggle settings
     */
    document.getElementById('toggleWiggleButton').addEventListener('click', (e) => {
        enableWiggle = !enableWiggle;
        toggleEnabledButton(event.target || event.srcElement);
    })

    document.getElementById('wiggleAngleSlider').addEventListener('input', (e) => {
        const element = document.getElementById('wiggleAngleSlider')
        const val = Number(element.value);
        const rad = radians(val);
        document.getElementById('wiggleAngleMarker').innerHTML = val;
        birds.forEach(b => b.MAX_WIGGLE_ANGLE = rad);
    });

    document.getElementById('wiggleIntensitySlider').addEventListener('input', (e) => {
        const element = document.getElementById('wiggleIntensitySlider')
        const val = Number(element.value);
        document.getElementById('wiggleIntensityeMarker').innerHTML = val;
        birds.forEach(b => b.WIGGLE_ACC_INTENSITY = val);
    });

    document.getElementById('boidSpeedSlider').addEventListener('input', (e) => {
        const element = document.getElementById('boidSpeedSlider')
        const val = Number(element.value);
        document.getElementById('maxSpeedMarker').innerHTML = val;
        birds.forEach(b => b.MAX_SPEED = val);
    });


    /*
     * Alignmement settings
     */
    document.getElementById('toggleAlignmentButton').addEventListener('click', (e) => {
        enableAlignment = !enableAlignment;
        toggleEnabledButton(event.target || event.srcElement);
    })

    document.getElementById('alignementPerceptionDistanceSlider').addEventListener('input', (e) => {
        const element = document.getElementById('alignementPerceptionDistanceSlider')
        const val = Number(element.value);
        document.getElementById('alignmentPerceptionMarker').innerHTML = val;
        birds.forEach(b => b.ALIGNMENT_FRIENDS_RADIUS = val);
    });

    document.getElementById('alignementIntensitySlider').addEventListener('input', (e) => {
        const element = document.getElementById('alignementIntensitySlider')
        const val = Number(element.value);
        document.getElementById('alignmentIntensityMarker').innerHTML = val;
        birds.forEach(b => b.ALIGNMENT_ACC_INTENSITY = val);
    });

    /*
     * Separation settings
     */
    document.getElementById('toggleSeparationButton').addEventListener('click', (e) => {
        enableSeparation = !enableSeparation;
        toggleEnabledButton(event.target || event.srcElement);
    })

    document.getElementById('separationPerceptionDistanceSlider').addEventListener('input', (e) => {
        const element = document.getElementById('separationPerceptionDistanceSlider')
        const val = Number(element.value);
        document.getElementById('separationPerceptionMarker').innerHTML = val;
        birds.forEach(b => b.SEPARATION_FRIENDS_RADIUS = val);
    });

    document.getElementById('separationIntensitySlider').addEventListener('input', (e) => {
        const element = document.getElementById('separationIntensitySlider')
        const val = Number(element.value);
        document.getElementById('separationIntensityMarker').innerHTML = val;
        birds.forEach(b => b.SEPARATION_ACC_INTENSITY = val);
    });

    /*
     * Cohesion settings
     */
    document.getElementById('toggleCohesionButton').addEventListener('click', (e) => {
        enableCohesion = !enableCohesion;
        toggleEnabledButton(event.target || event.srcElement);
    })

    document.getElementById('cohesionPerceptionDistanceSlider').addEventListener('input', (e) => {
        const element = document.getElementById('cohesionPerceptionDistanceSlider')
        const val = Number(element.value);
        document.getElementById('cohesionPerceptionMarker').innerHTML = val;
        birds.forEach(b => b.COHESION_FRIENDS_RADIUS = val);
    });

    document.getElementById('cohesionIntensitySlider').addEventListener('input', (e) => {
        const element = document.getElementById('cohesionIntensitySlider')
        const val = Number(element.value);
        document.getElementById('cohesionIntensityMarker').innerHTML = val;
        birds.forEach(b => b.COHESION_ACC_INTENSITY = val);
    });

    /*
     * Other controls
     */
    document.getElementById('loopButton').addEventListener('click', (e) => {
        enableLoop = !enableLoop;
        toggleEnabledButton(event.target || event.srcElement);

        if (enableLoop) {
            loop();
        } else {
            noLoop();
        }
    });

    document.getElementById('followMouseButton').addEventListener('click', (e) => {
        enableFollowMouse = !enableFollowMouse;
        toggleEnabledButton(event.target || event.srcElement);
    });

    document.getElementById('followTargetButton').addEventListener('click', (e) => {
        enableFollowTarget = !enableFollowTarget;
        toggleEnabledButton(event.target || event.srcElement);
    });

    document.getElementById('wrapEdgesButton').addEventListener('click', (e) => {
        enableWrapEdges = !enableWrapEdges;
        toggleEnabledButton(event.target || event.srcElement);
    });

    document.getElementById('showPerceptionCirclesButton').addEventListener('click', (e) => {
        enableShowPerception = !enableShowPerception;
        toggleEnabledButton(event.target || event.srcElement);
    });

    document.getElementById('markButton').addEventListener('click', (e) => {
        birds.forEach(b => b.marked = false);
        const randId = parseInt(random(0, birds.length-1));
        birds[randId].marked = true;
        ( event.target || event.srcElement ).classList.add('active');
    });
}
