require('dotenv').config(); // Load env variables from .env
const Eris = require('eris');
const dbl = require('./dbl');
const { onError, onWarn, onReady, onMessageCreate } = require('./handlers');

const bot = new Eris(process.env.BOT_TOKEN, {
  compress: true,
  opusOnly: true,
});
bot.dbl = dbl(bot, process.env.DBL_TOKEN); // Discord Bot List API
bot.sharedStream = new Eris.SharedStream();

bot.on('error', (err, id) => onError(bot, err, id));
bot.on('warn', (message, id) => onWarn(bot, message, id));
bot.on('ready', err => onReady(bot, err));
bot.on('messageCreate', msg => onMessageCreate(bot, msg));
bot.connect();
