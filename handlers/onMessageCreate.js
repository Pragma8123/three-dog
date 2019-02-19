require('dotenv').config();
const { help, vote, evalCmd, meme, tuneIn, tuneOut } = require('../commands');
const logger = require('../logger');

module.exports = async (ctx, msg) => {
  if (msg.author.bot) return; // Ignore bots
  if (!msg.content.toLowerCase().startsWith(process.env.CMD_PREFIX)) return; // Ignore regular chat

  // Cleanup user input
  const command = msg.content
    .slice(process.env.CMD_PREFIX.length)
    .trim()
    .split(/\s+/g)[0]
    .toLowerCase();

  logger.verbose('Command Processed', {
    messageId: msg.id,
    userId: msg.author.id,
    channelId: msg.channel.id,
    command,
  });

  // Process command
  try {
    switch (command) {
      case 'meme': {
        await meme(ctx, msg);
        break;
      }
      case 'tunein': {
        await tuneIn(ctx, msg);
        break;
      }
      case 'tuneout': {
        await tuneOut(ctx, msg);
        break;
      }
      case 'eval': {
        await evalCmd(ctx, msg);
        break;
      }
      case 'vote': {
        await vote(ctx, msg);
        break;
      }
      case 'help': {
        await help(ctx, msg);
        break;
      }
    }
  } catch (err) {
    logger.error(null, err);
  }
};
