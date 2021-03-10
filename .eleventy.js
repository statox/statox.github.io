/*
 * Eleventy configuration file
 */

const cleanCSS = require('clean-css');
const eleventyNavigation = require('@11ty/eleventy-navigation');
const embedSpotify = require('eleventy-plugin-embed-spotify');
const markdownIt = require('markdown-it');
const markdownItEmoji = require('markdown-it-emoji');
const markdownItExternalLinks = require('markdown-it-external-links');
const pluginRss = require('@11ty/eleventy-plugin-rss');
const pluginSEO = require('eleventy-plugin-seo');
const seoConfig = require('./src/_data/seo.json');
const sitemap = require('@quasibit/eleventy-plugin-sitemap');
const syntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight');
const wordCount = require('eleventy-plugin-wordcount').wordCount;

const formatPostDate = date => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[month]} ${year}`;
};

module.exports = function (eleventyConfig) {
    const env = process.env.ELEVENTY_ENV;

    /*
     * Posts collections by category
     * TODO: I'll probably need to update that to have dynamical lists based on a list of categories
     */
    // Notes sorted alphabetically by their title
    eleventyConfig.addCollection('notesAlphabetical', collection =>
        collection.getFilteredByGlob('src/notes/*.md').sort((a, b) => {
            if (a.data.title > b.data.title) return 1;
            else if (a.data.title < b.data.title) return -1;
            else return 0;
        })
    );

    /*
     * Filters
     */
    // Posts dates in home page
    eleventyConfig.addFilter('datePost', formatPostDate);

    // Format tags of notes
    eleventyConfig.addFilter('noteTags', tags => {
        return tags
            .filter(t => t !== 'note')
            .map(t => '[' + t + ']')
            .join('');
    });

    // Change the tab title to the tittle of the post or the tittle of the site
    eleventyConfig.addFilter('pageTitle', tittle => tittle || 'The stuff I do');

    // CSS minifier filter
    eleventyConfig.addFilter('cssmin', function (code) {
        return new cleanCSS({}).minify(code).styles;
    });

    /*
     * Plugins
     */
    // syntax highlighting in code blocks
    eleventyConfig.addPlugin(syntaxHighlight);
    // RSS feed plugin
    eleventyConfig.addPlugin(pluginRss);
    // Word count plugin
    eleventyConfig.addPlugin(wordCount);
    // Spotify plugin
    eleventyConfig.addPlugin(embedSpotify);
    // SEO plugin
    eleventyConfig.addPlugin(pluginSEO, seoConfig);
    // Sitemap plugin
    eleventyConfig.addPlugin(sitemap, {
        sitemap: {
            hostname: 'https://www.statox.fr'
        }
    });
    // Navigation
    eleventyConfig.addPlugin(eleventyNavigation);

    /*
     * Markdown parsing configuration
     */
    let markdownItOptions = {
        html: true, // Enable HTML tags in source
        breaks: true, // Convert '\n' in paragraphs into <br>
        linkify: true // Convert text looking like a link to a link
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

    eleventyConfig.setLibrary('md', markdownLib);

    /*
     * Specify which types of templates should be transformed.
     */
    eleventyConfig.setTemplateFormats(['html', 'liquid', 'njk', 'md', 'gif', 'js', 'png', 'txt']);

    /*
     * Passthroughs: Copy ./dir/ to docs/dir/
     */
    eleventyConfig.addPassthroughCopy('fonts');
    eleventyConfig.addPassthroughCopy({'./assets/images': '/images'});

    if (env === 'prod') {
        eleventyConfig.addPassthroughCopy({'./assets/favicons_prod': '/favicon'});
    } else {
        eleventyConfig.addPassthroughCopy({'./assets/favicons_dev': '/favicon'});
    }
};
