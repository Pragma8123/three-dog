require('dotenv').config(); // Load env variables from .env

module.exports = async (ctx, msg) => {
  const { bot } = ctx;
  // Remove voice channel from shared stream if it exists
  const connection = ctx.sharedStream.voiceConnections.find(
    (con) => con.channelID === msg.member.voiceState.channelID,
  );
  if (connection) {
    ctx.sharedStream.remove(connection);
    await bot.leaveVoiceChannel(connection.channelID);
  }
};
