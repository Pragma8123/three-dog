#!/bin/bash
openssl aes-256-cbc -K $encrypted_b7ccb24178b3_key -iv $encrypted_b7ccb24178b3_iv -in deploy.key.enc -out deploy.key -d
eval "$(ssh-agent -s)" # start ssh agent
ls -lah # debug
chmod 600 deploy.key # key should have push access
ssh-add deploy.key
ssh-keyscan 192.241.145.31 >> ~/.ssh/known_hosts
git remote add deploy dokku@192.241.145.31:three-dog-bot
git config --global push.default simple
git push deploy master
