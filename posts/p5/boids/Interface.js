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
    boidsSettings.CROWD_SIZE = Number(newSize);
    resetBirds();
}

function setFlockSize() {
    document.getElementById('flockSizeInput').value = boidsSettings.CROWD_SIZE;
}

function initializeInterfaceValues() {
}

function initializeButtons() {
    /*
     * Wiggle settings
     */
    document.getElementById('toggleWiggleButton').addEventListener('click', (e) => {
        boidsSettings.enableWiggle = !boidsSettings.enableWiggle;
        toggleEnabledButton(event.target || event.srcElement);
    })

    document.getElementById('wiggleAngleSlider').addEventListener('input', (e) => {
        const element = document.getElementById('wiggleAngleSlider')
        const val = Number(element.value);
        document.getElementById('wiggleAngleMarker').innerHTML = val;
        boidsSettings.MAX_WIGGLE_ANGLE = val;
    });

    document.getElementById('wiggleIntensitySlider').addEventListener('input', (e) => {
        const element = document.getElementById('wiggleIntensitySlider')
        const val = Number(element.value);
        document.getElementById('wiggleIntensityeMarker').innerHTML = val;
        boidsSettings.WIGGLE_ACC_INTENSITY = val;
    });

    document.getElementById('boidSpeedSlider').addEventListener('input', (e) => {
        const element = document.getElementById('boidSpeedSlider')
        const val = Number(element.value);
        document.getElementById('maxSpeedMarker').innerHTML = val;
        boidsSettings.MAX_SPEED = val;
    });


    /*
     * Alignmement settings
     */
    document.getElementById('toggleAlignmentButton').addEventListener('click', (e) => {
        boidsSettings.enableAlignment = !boidsSettings.enableAlignment;
        toggleEnabledButton(event.target || event.srcElement);
    })

    document.getElementById('alignementPerceptionDistanceSlider').addEventListener('input', (e) => {
        const element = document.getElementById('alignementPerceptionDistanceSlider')
        const val = Number(element.value);
        document.getElementById('alignmentPerceptionMarker').innerHTML = val;
        boidsSettings.ALIGNMENT_FRIENDS_RADIUS = val;
    });

    document.getElementById('alignementIntensitySlider').addEventListener('input', (e) => {
        const element = document.getElementById('alignementIntensitySlider')
        const val = Number(element.value);
        document.getElementById('alignmentIntensityMarker').innerHTML = val;
        boidsSettings.ALIGNMENT_ACC_INTENSITY = val;
    });

    /*
     * Separation settings
     */
    document.getElementById('toggleSeparationButton').addEventListener('click', (e) => {
        boidsSettings.enableSeparation = !boidsSettings.enableSeparation;
        toggleEnabledButton(event.target || event.srcElement);
    })

    document.getElementById('separationPerceptionDistanceSlider').addEventListener('input', (e) => {
        const element = document.getElementById('separationPerceptionDistanceSlider')
        const val = Number(element.value);
        document.getElementById('separationPerceptionMarker').innerHTML = val;
        boidsSettings.SEPARATION_FRIENDS_RADIUS = val;
    });

    document.getElementById('separationIntensitySlider').addEventListener('input', (e) => {
        const element = document.getElementById('separationIntensitySlider')
        const val = Number(element.value);
        document.getElementById('separationIntensityMarker').innerHTML = val;
        boidsSettings.SEPARATION_ACC_INTENSITY = val;
    });

    /*
     * Cohesion settings
     */
    document.getElementById('toggleCohesionButton').addEventListener('click', (e) => {
        boidsSettings.enableCohesion = !boidsSettings.enableCohesion;
        toggleEnabledButton(event.target || event.srcElement);
    })

    document.getElementById('cohesionPerceptionDistanceSlider').addEventListener('input', (e) => {
        const element = document.getElementById('cohesionPerceptionDistanceSlider')
        const val = Number(element.value);
        document.getElementById('cohesionPerceptionMarker').innerHTML = val;
        boidsSettings.COHESION_FRIENDS_RADIUS = val;
    });

    document.getElementById('cohesionIntensitySlider').addEventListener('input', (e) => {
        const element = document.getElementById('cohesionIntensitySlider')
        const val = Number(element.value);
        document.getElementById('cohesionIntensityMarker').innerHTML = val;
        boidsSettings.COHESION_ACC_INTENSITY = val;
    });

    /*
     * Other controls
     */
    document.getElementById('loopButton').addEventListener('click', (e) => {
        boidsSettings.enableLoop = !boidsSettings.enableLoop;
        toggleEnabledButton(event.target || event.srcElement);

        if (boidsSettings.enableLoop) {
            loop();
        } else {
            noLoop();
        }
    });

    document.getElementById('followMouseButton').addEventListener('click', (e) => {
        boidsSettings.enableFollowMouse = !boidsSettings.enableFollowMouse;
        toggleEnabledButton(event.target || event.srcElement);
    });

    document.getElementById('followTargetButton').addEventListener('click', (e) => {
        boidsSettings.enableFollowTarget = !boidsSettings.enableFollowTarget;
        toggleEnabledButton(event.target || event.srcElement);
    });

    document.getElementById('wrapEdgesButton').addEventListener('click', (e) => {
        boidsSettings.enableWrapEdges = !boidsSettings.enableWrapEdges;
        toggleEnabledButton(event.target || event.srcElement);
    });

    document.getElementById('showPerceptionCirclesButton').addEventListener('click', (e) => {
        boidsSettings.enableShowPerception = !boidsSettings.enableShowPerception;
        toggleEnabledButton(event.target || event.srcElement);
    });
}
