---
layout: layouts/note.njk
tags: ['note', 'bash', 'grep']
title: Grep
---

### Exclude multiple directories
```bash
grep --exclude-dir={node_modules,src}
```

### Have grep colors in less
```bash
grep --color=always | less -r
```
