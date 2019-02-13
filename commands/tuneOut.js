require('dotenv').config(); // Load env variables from .env

module.exports = async (bot, msg) => {
  // Remove voice channel from shared stream if it exists
  const connection = bot.sharedStream.voiceConnections.find(
    con => con.channelID === msg.member.voiceState.channelID
  );
  if (connection) {
    try {
      bot.sharedStream.remove(connection);
      await bot.leaveVoiceChannel(connection.channelID);
    } catch (err) {
      throw err;
    }
  }
};
