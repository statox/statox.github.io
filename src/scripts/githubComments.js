/*
 * Script to inject comments based on github issues
 * Shamelessly taken from https://25.wf/posts/2020-06-21-comments.html
 */

function domReady(fn) {
    document.addEventListener('DOMContentLoaded', fn);
    if (document.readyState === 'interactive' || document.readyState === 'complete') {
        fn();
    }
}

function appendComments(comments) {
    const commentSection = document.querySelector('comments');
    if (!comments || !comments.forEach || comments.length === 0) {
        commentSection.insertAdjacentHTML('beforeend', '<p>No comments yet.</p>');
        return;
    }
    comments.forEach(function (comment) {
        commentSection.insertAdjacentHTML(
            'beforeend',
            '<div class="comment">' +
                '<div class="comment-header">' +
                    '<a href="' + comment.user.html_url + '" target="_blank">' + comment.user.login + '</a>' +
                    ' on' +
                    ' <a href="' + comment.html_url + '" target="_blank">' + formatCommentDate(new Date(comment.created_at)) + '</a>' +
                '</div>' +
                '<div class="comment-content">' +
                    comment.body_html +
                '</div>' +
            '</div>'
        );
    });
}

async function getComments(issueId) {
    const url = `https://api.github.com/repos/statox/blog-comments/issues/${issueId}/comments`;
    const response = await fetch(url, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        headers: {Accept: 'application/vnd.github.v3.html+json'}
    });
    return response.json();
}

function formatCommentDate(i) {
    const d = i.getDate();
    const M = i.getUTCMonth() + 1;
    const Y = i.getFullYear();

    return `${d}/${M}/${Y}`;
}

function setupCommentsInPage(commentIssueId) {
    domReady(() => {
        getComments(commentIssueId).then(appendComments);
    });
}
