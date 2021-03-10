---
layout: layouts/post.njk
tags: ['draft', 'vim']
date: 2021-03-10
title: The golden rule to create vim mappings
commentIssueId: 0
---

### Intro

- Vim is powerful and let users customize it to there needs
- The issue is that being free with your customizations can make you shoot yourself in the foot
- I've been using Vim as a daily driver for about 6 years now and helped people on vi.stackexchange
- One of the most common cause of troubles is mappings
- I want to show the rules I try to apply when I create a mapping to minimize the potential issues
- This is an opinionated post: Some might disagree and some might do differently without issues
  But still this should avoid some troubles to new vimmers

### Definitions

https://vi.stackexchange.com/q/10249/1841

- Command: Distinction between ex commands and normal mode commands
- Key Mapping (Mapping for short): Change the meaning of typed keys
 - lhs, rhs
- Keycode: Name for keys as used in the documentation and :map commands

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

### Conclusion

<!-- vim: set spell: -->
