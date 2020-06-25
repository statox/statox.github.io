/*
 * Eleventy configuration file
 */

const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

const moment = require('moment');
moment.locale('en');
 

module.exports = function(eleventyConfig) {
    /*
     * Posts collections by category
     * TODO: I'll probably need to update that to have dynamical lists based on a list of categories
     */
    eleventyConfig.addCollection("posts_vim", function(collectionApi) {
        return collectionApi.getFilteredByTags("post", "vim");
    });

    eleventyConfig.addCollection("posts_p5", function(collectionApi) {
        return collectionApi.getFilteredByTags("post", "p5");
    });

    /*
     * Filter to reformat dates
     */
    eleventyConfig.addFilter('datePost', date => {
        return moment(date).utc().format('MMM YYYY');
    });


    /*
     * eleventy plugin to handle syntax highlighting in code blocks
     * https://www.11ty.dev/docs/plugins/syntaxhighlight/
     */
    eleventyConfig.addPlugin(syntaxHighlight);

    /*
     * Markdown parsing configuration
     */
    let markdownIt = require("markdown-it")

    let options = {
        html: true, // Enable HTML tags in source
        breaks: true, // Convert '\n' in paragraphs into <br>
        linkify: true, // Convert text looking like a link to a link
    }

    let markdownLib = markdownIt(options)
        // Open external links in new tabs
        .use(require('markdown-it-external-links'), {
            externalClassName: null,
            externalRel: 'noopener noreferrer',
            externalTarget: '_blank'
        });

    eleventyConfig.setLibrary("md", markdownLib);
};
