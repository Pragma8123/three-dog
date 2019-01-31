require('dotenv').config(); // Load env variables from .env
const Eris = require('eris');
const dbl = require('./dbl');
const { onReady, onMessageCreate } = require('./handlers');
const logger = require('./logger');

const bot = new Eris(process.env.BOT_TOKEN);
bot.dbl = dbl(bot, process.env.DBL_TOKEN); // Discord Bot List API
bot.sharedStream = new Eris.SharedStream();

bot.on('ready', err => onReady(bot, err));
bot.on('messageCreate', msg => onMessageCreate(bot, msg));
bot.connect();
