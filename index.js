require('dotenv').config();
const { Master: Sharder } = require('eris-sharder');
const logger = require('./logger');

const master = new Sharder(process.env.BOT_TOKEN, '/ThreeDog.js', {
  name: 'Three Dog',
  stats: true,
  debug: process.env.NODE_ENV !== 'production',
  guildsPerShard: process.env.GUILDS_PER_SHARD || 1500,
});
