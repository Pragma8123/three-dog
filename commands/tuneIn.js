require('dotenv').config(); // Load env variables from .env

module.exports = async (bot, msg) => {
  // Make sure message is not a DM
  if (!msg.channel.guild) {
    bot.createMessage(
      msg.channel.id,
      'This command can only be run in a server.'
    );
    return;
  }

  // Check if user is in a voice channel
  if (!msg.member.voiceState.channelID) {
    bot.createMessage(msg.channel.id, 'You are not in a voice channel.');
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
    bot.createMessage(
      msg.channel.id,
      'There was an error joining your voice channel!'
    );
    console.log(err);
  }
};
