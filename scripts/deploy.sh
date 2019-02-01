#!/bin/bash
eval "$(ssh-agent -s)" # start ssh agent
chmod 600 .travis/deploy.key # key should have push access
ssh-add .travis/deploy.key
ssh-keyscan dokku@192.241.145.31 >> ~/.ssh/known_hosts
git remote add deploy dokku@192.241.145.31:three-dog-bot
git config --global push.default simple
git push deploy master
