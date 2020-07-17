/*
 * Eleventy configuration file
 */

const pluginRss = require("@11ty/eleventy-plugin-rss");
const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const moment = require('moment');
moment.locale('en');

module.exports = function(eleventyConfig) {
    /*
     * Posts collections by category
     * TODO: I'll probably need to update that to have dynamical lists based on a list of categories
     */
    // Notes sorted alphabetically by their title
    eleventyConfig.addCollection("notesAlphabetical", (collection) =>
        collection.getFilteredByGlob("src/notes/*.md").sort((a, b) => {
            if (a.data.title > b.data.title) return 1;
            else if (a.data.title < b.data.title) return -1;
            else return 0;
        })
    );

    /*
     * Filters
     */
    // Posts dates in home page
    eleventyConfig.addFilter('datePost', date => {
        return moment(date).utc().format('MMM YYYY');
    });

    // Format tags of notes
    eleventyConfig.addFilter('noteTags', tags => {
        return tags.filter(t => t !== 'note').map(t => '[' + t + ']').join('');
    });

    /*
     * Plugins
     */
     // syntax highlighting in code blocks
    eleventyConfig.addPlugin(syntaxHighlight);
    // RSS feed plugin
    eleventyConfig.addPlugin(pluginRss);

    /*
     * Markdown parsing configuration
     */
    let markdownIt = require("markdown-it")
    let markdownItExternalLinks = require('markdown-it-external-links');
    let markdownItEmoji = require("markdown-it-emoji");

    let markdownItOptions = {
        html: true, // Enable HTML tags in source
        breaks: true, // Convert '\n' in paragraphs into <br>
        linkify: true, // Convert text looking like a link to a link
    };

    // Open external links in new tabs
    let markdownItExternalLinksOptions = {
        externalClassName: null,
        externalRel: 'noopener noreferrer',
        externalTarget: '_blank'
    };

    let markdownLib = markdownIt(markdownItOptions)
        .use(markdownItExternalLinks, markdownItExternalLinksOptions)
        .use(markdownItEmoji);

    eleventyConfig.setLibrary("md", markdownLib);

    /*
     * Specify which types of templates should be transformed.
     */
    eleventyConfig.setTemplateFormats(["html","liquid","njk","md","gif"]);

    /*
     * Passthroughs
     */
    // Copy ./css/ to docs/css/
    eleventyConfig.addPassthroughCopy("css");
};
