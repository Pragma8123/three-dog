require('dotenv').config();
const { help, meme, tuneIn, tuneOut } = require('../commands');
const logger = require('../logger');

module.exports = (bot, msg) => {
  if (msg.author.bot) return; // Ignore bots
  if (!msg.content.toLowerCase().startsWith(process.env.CMD_PREFIX)) return; // Ignore regular chat

  // Cleanup user input
  const command = msg.content
    .slice(process.env.CMD_PREFIX.length)
    .toLowerCase()
    .trim();

  logger.verbose('Command Processed', {
    messageId: msg.id,
    userId: msg.author.id,
    channelId: msg.channel.id,
    command,
  });

  // Process command
  switch (command) {
    case 'meme': {
      meme(bot, msg);
      break;
    }
    case 'tunein': {
      tuneIn(bot, msg);
      break;
    }
    case 'tuneout': {
      tuneOut(bot, msg);
      break;
    }
    default: {
      help(bot, msg);
      break;
    }
  }
};
