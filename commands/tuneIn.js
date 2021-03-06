require('dotenv').config(); // Load env variables from .env

module.exports = async (ctx, msg) => {
  const { bot } = ctx;
  // Make sure message is not a DM
  if (!msg.channel.guild) {
    try {
      await bot.createMessage(
        msg.channel.id,
        'This command can only be run in a server.'
      );
    } catch (err) {
      throw err;
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
      throw err;
    }
    return;
  }

  // Try to join user's voice channel
  try {
    const connection = await bot.joinVoiceChannel(
      msg.member.voiceState.channelID
    );

    // Deafen self if successful
    connection.updateVoiceState(false, true);

    // Add voice connection to shared radio stream
    if (!ctx.sharedStream.voiceConnections.find(con => con === connection))
      ctx.sharedStream.add(connection);
  } catch (err) {
    try {
      await bot.createMessage(
        msg.channel.id,
        'There was an error joining your voice channel! Make sure I have permission to join.'
      );
    } catch (err) {
      throw err;
    }
    throw err;
  }
};
