---
layout: layouts/post.njk
tags: ['draft', 'vim']
date: 2021-03-10
title: The golden rule to create vim mappings
commentIssueId: 0
---

### Never struggle with a mapping again

Vim is a very powerful tool which lets its users customize it to there needs. While this freedom makes it an amazing tool it also makes it extremely easy for the user to shoot themselves in the foot. I've been using Vim as a daily driver for about 6 years now and helped people quite often on [vi.stackexchange](https://vi.stackexchange.com) and one particular area which causes a lot of troubles -especially to newcommers- is key mappings. This is not surprising as Vim mappings features is extremely powerful and that is not something people coming from the IDE world are used to.

In this article I want to show the rules I try to apply when I add a new mapping to my configuration. These rules aims to minimize the potential issues and side effects that my mappings can create.

Of course this is an opinionated post: Some might disagree with what will follow and some might do differently and not have particular issues. As anything you read on the internet you should apply critical thinking to what you will read. However I believe that the pieces of advices you are about to read are good to have in mind if you are a new Vimmer discovering the power of mappings. Once you are comfortable with this feature and know exactly what you are doing maybe you'll find situations where these rules can be broken. But in the meantime they should avoid you some headache and unpleasant debugging sessions.

### Definitions

Before diving into the dos and don'ts of Vim mappings it is useful to have in mind a few definitions to make sure we all understand what we are talking about.

https://vi.stackexchange.com/q/10249/1841
https://vim.fandom.com/wiki/Mapping_fast_keycodes_in_terminal_Vim

**Scancode**
**Key sequence**

Vim [`:h 'ttimeoutlen'`](http://vimhelp.appspot.com/options.txt.html#%27ttimeoutlen%27)

    The time in milliseconds that is waited for a key code or mapped key
    sequence to complete.

NVim [`:h 'ttimeoutlen'`](https://neovim.io/doc/user/options.html#%27ttimeoutlen%27)

    Time in milliseconds to wait for a key code sequence to complete.

**Keycode**

A keycode is the name Vim gives to a key. You can find the list of the keycodes Vim knows in the doc [`:h keycodes`](http://vimhelp.appspot.com/intro.txt.html#keycodes). Note that some keycodes refer to several keys being pressed together: For example `<C-a>` is the key code for pressing <kbd>Ctrl</kbd> and <kbd>a</kbd> at the same time.

Here are some example keycodes commonly found in `vimrc` files around the internet:

| Keycode          | Key                                |
|------------------|------------------------------------|
| `a`              | <kbd>a</kbd>                       |
| `<C-a>`          | <kbd>Ctrl</kbd>+<kbd>a</kbd>       |
| `<S-a>`          | <kbd>Shift</kbd>+<kbd>a</kbd>      |
| `<CR>`           | <kbd>Enter</kbd>                   |
| `<Left>`         | <kbd>←</kbd> (the left arrow key)  |


**Mapping**
- Key Mapping (Mapping for short): Change the meaning of typed keys

**lhs/rhs**

**Command**
Distinction between ex commands and normal mode commands

### Rules

- The golden rule: Never remap a built-in command
  - How to check if a key sequence is a built-in command
  - A word about expanding a built-in command (example `<C-l>`, `h/l`, `*`, `<C-J>`)
- Always create mode specific mappings
  - Find a post on vi.se about that
- Be careful about recursive mappings
- Something about `<leader>`
- Something about how to find keys to remap
- Something about `timeoulen` and `ttimeoutlen`
- Learn to debug your mappings/Be aware of the pitfalls
  - https://vi.stackexchange.com/q/7722/1841


Now that we agree on the vocabulary let's get to the interesting part: How to make good mappings!

The first and most important thing to remember is this:

Never remap a built-in command

Simple enough right? But what does that mean exactly and how do you make sure you don't do it?

In normal mode remapping a built-in command has great chances of creating nasty side effects:

- Built-in commands are useful and well thought-out
 - Maybe you deem one as useless because you didn't manage to integrate it to your workflow

### Conclusion

<!-- vim: set spell: -->
