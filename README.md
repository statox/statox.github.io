# Blog

I'm trying to do a minimal blog hoping that having it very simple will motivate me to put new stuff regularly.
For now the rest of this readme will probably be my cheatsheet/todo list.

# Tools used

- The [newcss](https://newcss.net/) css framework.
- The [eleventy](https://www.11ty.dev/) statix site generator.

# Commands

##Develop site locally.

The following command will watch the files, generate the site in the `/docs/` directory and serve it.

    npm run dev


## Generate the site

    npm run build

Will build the site in `/docs/` which is served by github pages.

## Publishing the site

For now github pages server the `/docs/` directory of the master branch. To publish changes:

    - run `npm run build`
    - commit `/docs/` to the master branch

In the future I need to add some CI.

## Notes

`_includes/layouts` contains the structure which is used in templates like `index.html` or `posts.html`.

The template syntax is [nunjucks](https://www.11ty.dev/docs/languages/nunjucks/) because so far it seems to be the easier but maybe I'll change that.
