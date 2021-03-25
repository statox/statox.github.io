/*
 * Allow to click on images to make them fullscreen
 */
function toggleFullscreen(event) {
    isFullscreen = !isFullscreen;
    if (!isFullscreen) {
        const fullscreenElements = document.getElementsByClassName('focus');
        for (const element of fullscreenElements) {
            element.classList.remove('focus');
        }
        document.body.removeChild(backgroundDiv);
        document.body.classList.remove('noscroll');
        return;
    }

    const image = event.target;

    image.classList.add('focus');
    document.body.append(backgroundDiv);
    document.body.classList.add('noscroll');
}

function addImagesFullscreenFeature() {
    const elements = document.getElementsByTagName('img');

    for (const element of elements) {
        element.addEventListener('click', toggleFullscreen);
    }
}
let isFullscreen = false;
let backgroundDiv = document.createElement('div');
backgroundDiv.classList.add('img_background');
backgroundDiv.addEventListener('click', toggleFullscreen);
domReady(addImagesFullscreenFeature);
