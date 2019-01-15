require('dotenv').config(); // Load env variables from .env
const Bundler = require('parcel-bundler');
const path = require('path');
const Eris = require('eris');
const app = require('express')();

const bot = new Eris(process.env.BOT_TOKEN);
const sharedStream = new Eris.SharedStream();

bot.on('ready', err => {
  if (err) {
    console.error(err);
  } else {
    // Set bot status as help text
    bot.editStatus('online', {
      name: process.env.CMD_PREFIX,
      type: 2, // Listening
    });
    // Start up radio track
    sharedStream.play(path.join(__dirname, 'gnr_audio.ogg'));
    sharedStream.on('end', () => {
      // We should restart the stream when it ends
      sharedStream.play(path.join(__dirname, 'gnr_audio.ogg'));
    });
  }
});

bot.on('messageCreate', async msg => {
  if (msg.author.bot) return; // Ignore bots
  if (!msg.content.startsWith(process.env.CMD_PREFIX)) return; // Ignore regular chat

  const command = msg.content.slice(process.env.CMD_PREFIX.length).trim();
  switch (command) {
    case 'tunein': {
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
        if (!sharedStream.voiceConnections.find(con => con === connection))
          sharedStream.add(connection);
      } catch (err) {
        bot.createMessage(
          msg.channel.id,
          'There was an error joining your voice channel!'
        );
        console.log(err);
      }
      break;
    }
    case 'tuneout': {
      // Remove voice channel from shared stream if it exists
      const connection = sharedStream.voiceConnections.find(
        con => con.channelID === msg.member.voiceState.channelID
      );
      if (connection) sharedStream.remove(connection);
      break;
    }
    default: {
      // Help
      const cmdPrefix = process.env.CMD_PREFIX;
      bot.createMessage(msg.channel.id, {
        embed: {
          title: 'Commands',
          author: {
            name: bot.user.username,
            icon_url: bot.user.avatarURL,
          },
          color: 0x1aff80, // Fallout 3 UI green
          fields: [
            {
              name: 'Tune In',
              value: `\`${cmdPrefix} tunein\``,
            },
            {
              name: 'Tune Out',
              value: `\`${cmdPrefix} tuneout\``,
            },
            {
              name: 'Help',
              value: `\`${cmdPrefix}\``,
            },
            {
              name: 'Support Server',
              value:
                '*Need Help?* [**Join the support server**](https://discord.gg/cH3dmX)',
            },
          ],
        },
      });
      break;
    }
  }
});

// Start bot
bot.connect();

// Define api
app.get('/api/guilds', (req, res) => {
  res.json(bot.guilds.filter(() => true).length);
});
app.get('/api/streams', (req, res) => {
  res.json(sharedStream.voiceConnections.filter(() => true).length);
});
app.get('/api/uptime', (req, res) => res.json(bot.uptime));

// Use parcel bundler middleware
const bundler = new Bundler(path.join(__dirname, 'index.html'));
app.use(bundler.middleware());

// Start web admin console
const port = process.env.PORT || 8080;
app.listen(port, err => {
  if (err) console.error(err);
});
