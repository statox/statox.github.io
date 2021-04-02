// Notes sorted alphabetically by their title
function notesAlphabetical(collection) {
    return collection.getFilteredByGlob('src/notes/*.md').sort((a, b) => {
        if (a.data.title > b.data.title) return 1;
        else if (a.data.title < b.data.title) return -1;
        else return 0;
    });
}

module.exports = {
    notesAlphabetical
};
