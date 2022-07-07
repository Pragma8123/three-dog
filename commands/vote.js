module.exports = async (ctx, msg) => {
  const { bot } = ctx;
  await bot.createMessage(
    msg.channel.id,
    `Thanks for voting, ${msg.author.mention}!\nhttps://top.gg/bot/461602422192734228/vote`,
  );
};
