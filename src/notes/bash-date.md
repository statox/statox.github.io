---
layout: layouts/note.njk
tags: ['note', 'bash', 'date']
title: Bash dates
---

_All of these notes are about `date` from GNU coreutils on Linux. I believe some parameters are diferent on MacOS._

Everything in there is basically a rehash of `man date`.

### Timestamp / Date conversions

```bash
date +"%s"  # Get current date as timestamp

alias ts2date='timestamp2date' # Parse timestamp as date
function timestamp2date {
    echo $(date -d @$1)
}
```
