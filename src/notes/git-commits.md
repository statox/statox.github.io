---
layout: layouts/note.njk
tags: ['note', 'git', 'commit']
title: Fixing commits in git
---

This link is dope https://sethrobertson.github.io/GitFixUm/fixup.html

TODO: Extract the ones I need but can never remember

### Remove commit from history

_Reminder on zsh escape `^` in `HEAD^` with `HEAD\^`_

Remove the last commit of the history completely **and discard changes**

    git reset --hard HEAD^

Remove the last commit from history but keep the working tree

    git reset HEAD^
