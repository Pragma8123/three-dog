require('dotenv').config();
const { help, meme, tuneIn, tuneOut } = require('../commands');

module.exports = (bot, msg) => {
  if (msg.author.bot) return; // Ignore bots
  if (!msg.content.toLowerCase().startsWith(process.env.CMD_PREFIX)) return; // Ignore regular chat

  // Cleanup user input
  const command = msg.content
    .slice(process.env.CMD_PREFIX.length)
    .toLowerCase()
    .trim();

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
