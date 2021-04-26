---
layout: layouts/note.njk
tags: ['note', 'bash', 'loop']
title: Bash loop command
---

One liner to do loops

_Don't forget there is no `;` between `do` and the first command_

```bash
while true; do ls -lh file; sleep 1; done
```
