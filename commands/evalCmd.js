require('dotenv').config();

module.exports = async (bot, msg) => {
  if (msg.author.id !== process.env.ADMIN_ID) return;
  const js = msg.content
    .slice(process.env.CMD_PREFIX.length)
    .trim()
    .slice('eval'.length);
  try {
    await bot.createMessage(msg.channel.id, JSON.stringify(eval(js)));
  } catch (err) {
    await bot.createMessage(msg.channel.id, JSON.stringify(err));
  }
};
