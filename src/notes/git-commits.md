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

### Sign an older commit in your branch

This will do an interactive rebase, playing `git commit --amend --no-edit -n -S`
after each commit

_(Check if `-n` is useful I can't find it in the man)_

    git rebase --exec 'git commit --amend --no-edit -n -S' -i my-branch
