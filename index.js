require('dotenv').config();
const { Master: Sharder } = require('eris-sharder');
const DBL = require('dblapi.js');
const DDBL = require('ddblapi.js');
const logger = require('./logger');

const master = new Sharder(process.env.BOT_TOKEN, '/ThreeDog.js', {
  name: 'Three Dog',
  stats: true,
  debug: process.env.NODE_ENV !== 'production',
  clientOptions: { compress: true, opusOnly: true, messageLimit: 0 },
  guildsPerShard: process.env.GUILDS_PER_SHARD || 1500,
  // shards: 3,
});

master.on('stats', async stats => {
  // Post updated bot stats to bot listings
  if (process.env.NODE_ENV === 'production') {
    const dbl = new DBL(process.env.DBL_TOKEN);
    const ddbl = new DDBL(process.env.DDBL_TOKEN);
    let shards = 0;
    stats.clusters.forEach(c => (shards += c.shards));
    try {
      await dbl.postStats(stats.guilds, null, shards);
      await ddbl.postStats('461602422192734228', stats.guilds);
    } catch (err) {
      logger.error(null, err);
    }
  }
});
