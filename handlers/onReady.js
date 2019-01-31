require('dotenv').config();
const { join } = require('path');
const logger = require('../logger');

module.exports = (bot, err) => {
  if (err) {
    logger.error(err);
  } else {
    // Set bot status as help text
    bot.editStatus('online', {
      name: process.env.CMD_PREFIX,
      type: 2, // Listening
    });
    // Start up radio track
    bot.sharedStream.play(join(__dirname, '../gnr.ogg'));
    bot.sharedStream.on('end', () => {
      // We should restart the stream when it ends
      bot.sharedStream.play(join(__dirname, '../gnr.ogg'));
    });
  }
};
