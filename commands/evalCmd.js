require('dotenv').config();
const logger = require('../logger');

module.exports = async (bot, msg) => {
  if (msg.author.id !== process.env.ADMIN_ID) return;
  const js = msg.content
    .slice(process.env.CMD_PREFIX.length)
    .trim()
    .slice('eval'.length);
  try {
    await bot.createMessage(msg.channel.id, JSON.stringify(eval(js)));
  } catch (err) {
    logger.error(null, err);
    await bot.createMessage(msg.channel.id, JSON.stringify(err));
  }
};
