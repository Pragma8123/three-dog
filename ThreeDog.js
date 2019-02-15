require('dotenv').config();
const { join } = require('path');
const { Base } = require('eris-sharder');
const { SharedStream } = require('eris');
const { onError, onWarn, onMessageCreate } = require('./handlers');

class ThreeDog extends Base {
  constructor(bot) {
    super(bot);
    this.sharedStream = new SharedStream();
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
  }
}

module.exports = ThreeDog;
