require('dotenv').config();
const { join } = require('path');
const Eris = require('eris');
const { AutoPoster } = require('topgg-autoposter');
const { onError, onWarn, onMessageCreate } = require('./handlers');
const logger = require('./logger');

class ThreeDog {
  constructor(token) {
    this.bot = new Eris(token);
    this.sharedStream = new Eris.SharedStream();
  }

  launch() {
    // Register event handlers
    this.bot.on('error', (err, shardId) => onError(this, err, shardId));
    this.bot.on('warn', (message, shardId) => onWarn(this, message, shardId));
    this.bot.on('messageCreate', msg => onMessageCreate(this, msg));

    // Set bot status as help text
    this.bot.editStatus('online', {
      name: `${process.env.CMD_PREFIX} help`,
      type: 2, // Listening
    });

    // Start up radio track
    // TODO: Generate a unique playlist for each run
    this.sharedStream.play(join(__dirname, 'gnr.ogg'));
    this.sharedStream.on('end', () => {
      // We should restart the track when it ends
      this.sharedStream.play(join(__dirname, 'gnr.ogg'));
    });

    // Actually connect to discord services
    this.bot.connect();

    // Top.gg stats hook
    if (process.env.NODE_ENV == 'production') {
      const ap = AutoPoster(process.env.TGG_TOKEN, this.bot);

      ap.on('posted', (stats) => {
        logger.info(`Posted stats to Top.gg | ${stats.serverCount} servers!`);
      });
    }
  }
}

module.exports = ThreeDog;
