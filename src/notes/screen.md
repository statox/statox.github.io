---
layout: layouts/note.njk
tags: ['note', 'screen']
title: Screen
---


### Basic usage

| Description                            |Command                                |
| ---------------------------------------|---------------------------------------|
| Start a new session with session name  |`screen -S <session_name>`             |
| List running sessions / screens        |`screen -ls`                           |
| Attach to a running session            |`screen -x`                            |
| Attach to a running session with name  |`screen -r <session_name>`             |
| Detach a running session               |`screen -d <session_name>`             |
