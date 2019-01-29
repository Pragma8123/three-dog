require('dotenv').config(); // Load env variables from .env
const Bundler = require('parcel-bundler');
const { join } = require('path');
const fs = require('fs');
const Eris = require('eris');
const app = require('express')();
const compression = require('compression');
const dbl = require('./dbl');
const api = require('./api');
const { onReady, onMessageCreate } = require('./handlers');
const logger = require('./logger');

const bot = new Eris(process.env.BOT_TOKEN);
bot.dbl = dbl(bot, process.env.DBL_TOKEN); // Discord Bot List API
bot.sharedStream = new Eris.SharedStream();

bot.on('ready', err => onReady(bot, err));
bot.on('messageCreate', msg => onMessageCreate(bot, msg));
bot.connect();

// Register bot with express so we can access it in API
app.set('bot', bot);
app.use('/api', api);
app.use(compression());

// Parcel bundler middleware
const bundler = new Bundler(join(__dirname, 'index.html'));
bundler.on('buildEnd', () => {
  // Copy threedog.png for Open Graph metadata
  fs.copyFileSync(
    join(__dirname, 'src/threedog.png'),
    join(__dirname, 'dist/threedog.png')
  );
});
app.use(bundler.middleware());

const port = process.env.PORT || 8080;
app.listen(port, err => {
  if (err) logger.error('Express error', err);
});
