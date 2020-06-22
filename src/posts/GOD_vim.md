---
layout: layouts/post.njk
tags: ['post', 'vim']
date: 2017-02-01
title: GOD.vim - Quote the help
---

### I love to Quote the doc

I often participate on the [vi.stackexchange](https://vi.stackexchange.com) website because this community really helped me to get going with Vim when I first started using it and because it feels great to be able to help new vimmers.

When I write an answer I always try to think about how I can not only help the user to achieve what they want to do, but more importantly how I can help them to answer their own question next time they have one. And the best way to do that is to help them getting comfortable with the help.

Indeed Vim has an amazing built-in help system accessible directly from the editor itself using the command `:h`. So whenever I write my answers I do my best to add these help topics. And I also like to add a link to one of the several online version of the help

 - http://vimdoc.sourceforge.net/ That I used at first but the anchoring of the topics were not always deterministic so it was to practical to use.
 - https://vimhelp.org/ Which I currently use.
 - And even https://neovim.io/doc for neovim users.

### But it's painful
For a long time I just wrote the help command like `:h autocmd-events` in my answers but this was not convenient:

 - First I have to do my own research, like any vimmer would do.
 - Then I'd have to copy the help topic to my clipboard
 - In the web interface I have to type my redundant `:h ` and add the help topic.
 - Then because I think new users are more inclined to read the doc if it is available under their mouth I look for the topic on an online version of the help
 - Finally I can update my markdown with the right link

After doing that for a few months and feeling the pain I started creating a short hack in my `.vimrc` to improve this workflow, until the day I read [How can I quickly convert a Vim help tag to a vimhelp.appspot.com link?](https://vi.stackexchange.com/q/4346/1841). This question confirmed that this action was a pain point for other people and that pushed me to create a proper plugin.

### So let's create a plugin!
So I created [GOD.vim](https://github.com/statox/GOD.vim) this is a very simple plugin which goal is to easily get a markdown expression describing a help topic and linking to its online version. The plugin does the following:

 - Create a new command `:GOD` which takes the exact same parameter as `:h`. The behavior is completely duplicated thanks to [`:h :command-nargs`](http://vimhelp.appspot.com/map.txt.html#%3Acommand-nargs) and [`:h :command-complete`](http://vimhelp.appspot.com/map.txt.html#%3Acommand-complete), see [how I create the command](https://github.com/statox/GOD.vim/blob/bed2a6fe9458284760d6fb5f08495e6579ce69dd/plugin/GOD.vim#L16)
 - On the help page, parse the help topics and get the first one and use that to build a URL to the relevant help website.
 - Use this URL to generate a markdown template
 - Copy this template to the clipboard.

I also added some additional features:
 - Being able to link either to the vim help or the neovim help using respectively `:GOD` and `:NGOD`
 - Being able to have a nicely formatted markdown list if several help topics are given as parameters to the command.

I think the most part about writing this plugin was to create a pure vimscript encoding function to handle the URLs with the help of great developers from the [vi.stackexchange](https://vi.stackexchange.com) community, namely [Luc Hermitte](https://github.com/LucHermitte) and [Martin Tournoij](https://www.arp242.net/)

And of course it is always a great satisfaction to create a tool that you still continue to use several years after you first needed it. The sources of the plugin and its documentation are [on Github](https://github.com/statox/GOD.vim)
