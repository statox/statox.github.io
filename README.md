# Blog [![Build Status](https://travis-ci.org/statox/blog.svg?branch=master)](https://travis-ci.org/statox/blog)

I'm trying to do a minimal blog hoping that having it very simple will motivate me to put new stuff regularly.
For now the rest of this readme will probably be my cheatsheet/todo list.

# Tools used

- The [newcss](https://newcss.net/) css framework.
- The [eleventy](https://www.11ty.dev/) static site generator.

# Commands

## Develop site locally.

The following command will watch the files, generate the site in the `docs/` directory and serve it locally.

    npm run dev

## Generate the site

    npm run build

Will build the site in `docs/` which is served by github pages. (This is actually done by the CI)

## Publishing the site

Github pages serves the `gh-pages` branch. The deployment is automated with travis-ci. (The job is [here](https://travis-ci.org/github/statox/blog))

In `.travis.yml` I use the github pages provider which does the following:

 - Install everything
 - Use `npm run build` to generate the site in the `docs/` directory
 - Checkout the result on the `gh-pages` branch

The job needs an access token generated like so:
 - On Github: Account > Settings > Developer settings > Personal access token
 - In the travis job settings I added its value

## Analytics

To do analytics I use [goatcounter](https://www.goatcounter.com/) because it respects user's privacy and that's important.
The dashboard is here https://statoxblog.goatcounter.com/

## Notes

`_includes/layouts` contains the structure which is used in templates like `index.html` or `posts.html`.

The template syntax is [nunjucks](https://www.11ty.dev/docs/languages/nunjucks/) because so far it seems to be the easieest but maybe I'll change that.

## References

- A blog made with the same tools https://github.com/11ty/eleventy-base-blog
- Eleventy docs https://www.11ty.dev/docs/
