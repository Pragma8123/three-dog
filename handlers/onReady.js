require('dotenv').config();
const { join } = require('path');
const DBL = require('dblapi.js');
const DDBL = require('ddblapi.js');
const logger = require('../logger');

module.exports = (bot, err) => {
  if (err) {
    logger.error(err);
  } else {
    // Set bot status as help text
    bot.editStatus('online', {
      name: `${process.env.CMD_PREFIX} help`,
      type: 2, // Listening
    });
    // Start up radio track
    bot.sharedStream.play(join(__dirname, '..', 'gnr.ogg'));
    bot.sharedStream.on('end', () => {
      // We should restart the stream when it ends
      bot.sharedStream.play(join(__dirname, '..', 'gnr.ogg'));
    });

    // === Connect to bot list APIs ===
    if (process.env.NODE_ENV === 'production') {
      // Discord bot list
      const dbl = new DBL(process.env.DBL_TOKEN, bot);
      dbl.on('posted', () => logger.verbose('DBL: Server count posted'));
      dbl.on('error', err => logger.error(null, err));
      bot.dbl = dbl;

      // Devine discord bot list
      const ddbl = new DDBL(process.env.DDBL_TOKEN);
      ddbl.postStats(bot.user.id, bot.guilds.size);
      bot.ddbl = ddbl;
    }
  }
};
