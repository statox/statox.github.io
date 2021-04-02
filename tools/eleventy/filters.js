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
// TODO: To be refactored to better use eleventy collections to avoid hack for drafts
function relatedPosts(_collection, currentPost) {
    // Exclude drafts from collection
    const collection = _collection.filter(p => !p.url.includes('drafts'));
    const currentPostIndex = collection.findIndex(p => p.url === currentPost.url);
    const relatedPosts = [];
    const transformPost = post => {
        return {
            date: post.date,
            url: post.url,
            title: post.data.title
        };
    };

    // For every post excepted the first one add the previous post
    if (currentPostIndex > 0) {
        const prevPost = collection[currentPostIndex - 1];
        relatedPosts.push(transformPost(prevPost));
    }
    // For the last post add the penultimate post too if it exists
    if (currentPostIndex === collection.length - 1 && currentPostIndex - 2 >= 0) {
        const penultimatePost = collection[currentPostIndex - 2];
        relatedPosts.push(transformPost(penultimatePost));
    }
    // For every post excepted the last one add the next post
    if (currentPostIndex < collection.length - 1) {
        const nextPost = collection[currentPostIndex + 1];
        relatedPosts.push(transformPost(nextPost));
    }
    // For the first post add one more post if it exists
    if (currentPostIndex === 0 && currentPostIndex + 2 <= collection.length - 1) {
        const nextNextPost = collection[currentPostIndex + 2];
        relatedPosts.push(transformPost(nextNextPost));
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
