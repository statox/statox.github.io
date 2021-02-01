// Global data file, used to expose some data to our templates
// the env variable is available in the templates via site.env (cf. base.njk)
module.exports = {
    env: process.env.ELEVENTY_ENV
};
