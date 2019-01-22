require('dotenv').config(); // Load env variables from .env
const Bundler = require('parcel-bundler');
const path = require('path');
const Eris = require('eris');
const app = require('express')();
const db = require('./knex');

// Load commands
const { help, meme, tuneIn, tuneOut } = require('./commands');

const bot = new Eris(process.env.BOT_TOKEN);
bot.sharedStream = new Eris.SharedStream();

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
    bot.sharedStream.play(path.join(__dirname, 'gnr_audio.ogg'));
    bot.sharedStream.on('end', () => {
      // We should restart the stream when it ends
      bot.sharedStream.play(path.join(__dirname, 'gnr_audio.ogg'));
    });
  }
});

bot.on('messageCreate', async msg => {
  if (msg.author.bot) return; // Ignore bots
  if (!msg.content.toLowerCase().startsWith(process.env.CMD_PREFIX)) return; // Ignore regular chat

  try {
    await db('users').insert({
      id: msg.author.id,
      guild_id: msg.channel.guild.id,
      username: msg.author.username,
    });
  } catch (err) {
    // Ignore unique constraint errors
    if (err.errno !== 19) console.log(err);
  }

  // Cleanup user input
  const command = msg.content
    .slice(process.env.CMD_PREFIX.length)
    .toLowerCase()
    .trim();

  // Process command
  switch (command) {
    case 'meme': {
      meme(bot, msg);
      break;
    }
    case 'tunein': {
      tuneIn(bot, msg);
      break;
    }
    case 'tuneout': {
      tuneOut(bot, msg);
      break;
    }
    default: {
      help(bot, msg);
      break;
    }
  }
});

bot.on('guildAvailable', async guild => {
  try {
    await db('guilds').insert({
      id: guild.id,
      name: guild.name,
      member_count: guild.memberCount,
      region: guild.region,
      created_at: guild.createdAt,
      joined_at: guild.joinedAt,
    });
  } catch (err) {
    // Ignore unique constraint errors
    if (err.errno !== 19) console.log(err);
  }
});

bot.on('guildUpdate', async guild => {
  await db('guilds')
    .where({ id: guild.id })
    .update({
      name: guild.name,
      member_count: guild.memberCount,
      region: guild.region,
      created_at: guild.createdAt,
      joined_at: guild.joinedAt,
    });
});

// Start bot
bot.connect();

// Define api
app.get('/api/guilds', (req, res) => {
  res.json(bot.guilds.filter(() => true).length);
});
app.get('/api/streams', (req, res) => {
  res.json(bot.sharedStream.voiceConnections.filter(() => true).length);
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
