---
layout: layouts/page.njk
title: About
eleventyNavigation:
  key: About
  order: 4
---

### Hello

I am Adrien (aka statox), a server software engineer at [Dashlane](https://www.dashlane.com/) in Paris, France.

<img class="profile-picture" src="{{ '/images/me.jpg' | url }}" alt="My face"/>

This website is just a place for me to talk a bit about my side projects and keep a few notes for myself. You will find stuff about the topics that I like (in no particular order): Vim, Linux and system administration, doing fun simulations and games in the browser, DIY projects, improving people's privacy on the internet and software development in general.

You can check [my social page]({{ '/social/' | url}}) to contact me.

### Technology on this site

#### Analytics

Because I want to be able to know how many people read my rambling I use an analytics platform on this website.

However I think the fight for a more privacy friendly internet is one of the most important to lead currently. That's why I use [goatcounter](https://www.goatcounter.com/): It is an amazing privacy friendly tool which does nothing else than counting how many time my pages are loaded. So no cookie :cookie: for you on this site, nor any other invasive tracking method.

#### Web

My professional experience is mainly focused on backend development: Maintaining and developing infrastructures at scale is a fascinating topic for me, however I'm less used to frontend development. So when I started creating a website I wanted it to be dead simple so that I get things done quickly and without friction. That's why I chose to use [eleventy](https://11ty.dev/) a simpler static site generator.

And as I'm not exactly a css expert and wanted something simpler than bootstrap I went with [newcss](https://newcss.net/) a very simple css framework.

The source code of the site is [on Github](https://github.com/statox/blog/) and uses [travis ci](https://travis-ci.com/) to automatically build and publish each update to Github Pages.

#### CI status

[travis job](https://travis-ci.com/github/statox/blog)
[![Build Status](https://travis-ci.com/statox/blog.svg?branch=master)](https://travis-ci.com/statox/blog)

