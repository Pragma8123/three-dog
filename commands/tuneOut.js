require('dotenv').config(); // Load env variables from .env
const logger = require('../logger');

module.exports = async (bot, msg) => {
  // Remove voice channel from shared stream if it exists
  const connection = bot.sharedStream.voiceConnections.find(
    con => con.channelID === msg.member.voiceState.channelID
  );
  if (connection) {
    try {
      bot.sharedStream.remove(connection);
      bot.leaveVoiceChannel(connection.channelID);
    } catch (err) {
      logger.error('Voice channel error', err);
    }
  }
};
