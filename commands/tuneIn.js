require('dotenv').config(); // Load env variables from .env
const logger = require('../logger');

module.exports = async (bot, msg) => {
  // Make sure message is not a DM
  if (!msg.channel.guild) {
    try {
      await bot.createMessage(
        msg.channel.id,
        'This command can only be run in a server.'
      );
    } catch (err) {
      logger.error(null, err);
    }
    return;
  }

  // Check if user is in a voice channel
  if (!msg.member.voiceState.channelID) {
    try {
      await bot.createMessage(
        msg.channel.id,
        'You are not in a voice channel.'
      );
    } catch (err) {
      logger.error(null, err);
    }
    return;
  }

  // Try to join user's voice channel
  try {
    const connection = await bot.joinVoiceChannel(
      msg.member.voiceState.channelID
    );
    if (!bot.sharedStream.voiceConnections.find(con => con === connection))
      bot.sharedStream.add(connection);
  } catch (err) {
    logger.error(null, err);
    try {
      await bot.createMessage(
        msg.channel.id,
        'There was an error joining your voice channel! Make sure I have permission to join.'
      );
    } catch (err) {
      logger.error(null, err);
    }
  }
};
