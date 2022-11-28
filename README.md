# **Three Dog 🎙️**
[![Discord Bots](https://discordbots.org/api/widget/status/461602422192734228.svg)](https://discordbots.org/bot/461602422192734228) [![Lint & Test](https://github.com/Pragma8123/three-dog/actions/workflows/test.yml/badge.svg)](https://github.com/Pragma8123/three-dog/actions/workflows/test.yml) [![Release](https://github.com/Pragma8123/three-dog/actions/workflows/release.yml/badge.svg)](https://github.com/Pragma8123/three-dog/actions/workflows/release.yml) [![Build and Push Docker Image](https://github.com/Pragma8123/three-dog/actions/workflows/build_and_push.yml/badge.svg)](https://github.com/Pragma8123/three-dog/actions/workflows/build_and_push.yml)
### _"Because one dog ain't enough, and two is too low, it's me, Three Dog!"_

## About
With Three Dog Bot, you can bring the _"beauty"_ and _"splendor"_ of the Capital Wasteland to your discord server

## Commands
* `/tunein` - Have Three Dog join your current voice channel for his live radio broadcast
* `/tuneout` - Remove Three Dog from your voice channel
* `/meme` - Post a fresh Fallout-related meme
* `/vote` - Post a link to vote for the bot on Top.gg
* `/help` - A help message displaying these commands and other helpful resources

## Requirements
* Node.js 16.9+
* Build tools for `node-gyp`. `libtool-bin` package from APT is recommended.
* A Discord bot token. You can create one [here!](https://discord.com/developers/applications/)

## Setup
1. `npm install`
2. Copy `.env.sample` to `.env` and edit the values accordingly. `BOT_TOKEN` is required
3. `npm run start:dev` for back-end/bot development
   * _Optional_ - run `npm run start:client` in a second terminal for client development
4. Build with `npm run build` and test production with `npm run start:prod`
