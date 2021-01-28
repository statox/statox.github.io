---
layout: layouts/note.njk
tags: ['note', 'bash', 'scp']
title: Scp
---

Basically the same syntax as `cp` (i.e. `scp [source] [dest]`)

```bash
# Local to remote
scp ./local/path user@remote-host:/home/user

# Remote to local
scp user@remote-host:/home/user ./local/path 
```

### Useful options

| Option | Usage |
|--------|-------|
| `-r`     | Copy directories |
| `-i`     | Provide identity file |
| `-P`     | Specify port |
