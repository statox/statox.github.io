---
layout: layouts/note.njk
tags: ['note', 'firefox']
title: Firefox shortcuts
---

### Built-in shortcuts
|   Action                     | Shortcut               |
|------------------------------|------------------------|
| Move tab left/right          | `<`/`>`                |
| Focus address bar            | `<C-j>`/`<C-k>`        |
| Backwards/Forward navigation | `<A-Left>`/`<A-Right>` |

### Vimium config

Custom key mappings

```
map l nextTab
map h previousTab
map d removeTab
```

### Custom search engine

To use search engines `site:` filter automatically:

- Create a bookmark with the the url and `%s` for the query string like this:
  `https://www.google.com/search?q=site%3Avi.stackexchange.com%20%s`
  `https://duckduckgo.com/?t=canonical&q=site%3Avi.stackexchange.com%20%s`
- Add a keyword to the bookmark e.g. `v`
- In the address bar search with `v my query`
