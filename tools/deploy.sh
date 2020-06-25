#!/usr/bin/env sh

REPO='blog'
USERNAME='statox'

# abort on errors
set -e

# dependencies
npm ci

# build
rm -r docs/
npm run build

# navigate into the build output directory

# git init
git add docs
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:$USERNAME/$REPO.git master:master

git checkout -
