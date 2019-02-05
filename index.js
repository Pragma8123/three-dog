require('dotenv').config();
const Eris = require('eris');
const { onError, onWarn, onReady, onMessageCreate } = require('./handlers');

const bot = new Eris(process.env.BOT_TOKEN, { compress: true, opusOnly: true });
bot.sharedStream = new Eris.SharedStream();

bot.on('error', (err, id) => onError(bot, err, id));
bot.on('warn', (message, id) => onWarn(bot, message, id));
bot.on('ready', err => onReady(bot, err));
bot.on('messageCreate', msg => onMessageCreate(bot, msg));

bot.connect();
