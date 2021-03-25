// domReady function used by githubComments and responsiveImages
// to do stuff when the DOM is loaded
function domReady(fn) {
    document.addEventListener('DOMContentLoaded', fn);
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
        fn();
    }
}
