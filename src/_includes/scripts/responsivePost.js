/*
 * Use a media query to change the content of the interface for smaller screens
 */
function adaptToScreenSize(x) {
    const postDate = new Date('{{page.date}}');

    let datePostContent = postDate.toLocaleDateString(undefined, {year: 'numeric', month: 'long', day: 'numeric'});
    let commentWordSpanContent = 'comments';

    if (x.matches) {
        // Small screens
        datePostContent = postDate.toLocaleDateString(undefined, {year: 'numeric', month: 'numeric', day: 'numeric'});
        commentWordSpanContent = '💬';
    }

    document.getElementById('post_date').textContent = datePostContent;
    document.getElementById('comment_word').textContent = commentWordSpanContent;
}

var x = window.matchMedia('(max-width: 500px)');
adaptToScreenSize(x); // Call listener function at run time
x.addListener(adaptToScreenSize); // Attach listener function on state changes

function domReady(fn) {
    document.addEventListener('DOMContentLoaded', fn);
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
        fn();
    }
}

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
