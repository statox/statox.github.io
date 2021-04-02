// Posts dates in home page
function datePost(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[month]} ${year}`;
}

// Format note tags for notes/ page and for individual note pages
function noteTags(tags) {
    return tags
        .filter(t => t !== 'note')
        .map(t => '[' + t + ']')
        .join('');
}

// Filter to get posts related to the current one
// TODO: To be refactored to better use eleventy collections
function relatedPosts(collection, currentPost) {
    const currentPostIndex = collection.findIndex(p => p.url === currentPost.url);
    const relatedPosts = [];
    const transformPost = post => {
        return {
            date: post.date,
            url: post.url,
            title: post.data.title
        };
    };

    if (currentPostIndex > 0) {
        const prevPost = collection[currentPostIndex - 1];
        relatedPosts.push(transformPost(prevPost));
    }
    if (currentPostIndex < collection.length - 1) {
        const nextPost = collection[currentPostIndex + 1];
        if (!nextPost.data.tags.includes('draft')) {
            relatedPosts.push(transformPost(nextPost));
        }
    }
    return relatedPosts;
}

// Change the tab title to the tittle of the post or the tittle of the site
function pageTitle(title) {
    return title || 'The stuff I do';
}

module.exports = {
    datePost,
    noteTags,
    relatedPosts,
    pageTitle
};
