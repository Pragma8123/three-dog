require('dotenv').config(); // Load env variables from .env
const db = require('../knex');

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
      console.log(err);
    }
  }

  try {
    await db('command_log').insert({
      guild_id: msg.channel.guild.id,
      user_id: msg.author.id,
      channel_id: msg.channel.id,
      command: 'tuneout',
    });
  } catch (err) {
    console.log(err);
  }
};
