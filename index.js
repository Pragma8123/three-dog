require('dotenv').config(); // Load env variables from .env
const Bundler = require('parcel-bundler');
const path = require('path');
const Eris = require('eris');
const app = require('express')();

const bundler = new Bundler(
  path.join(__dirname, 'index.html'),
);

app.use(bundler.middleware());

const bot = new Eris(process.env.BOT_TOKEN);

bot.on('ready', (err) => {
  if (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  } else {
    const port = process.env.PORT || 8080;
    app.listen(port);
  }
});

bot.on('messageCreate', (msg) => {
  if (msg.content === '!ping') {
    bot.createMessage(msg.channel.id, 'Pong!');
  }
});

bot.connect();
