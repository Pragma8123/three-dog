require('dotenv').config();
const logger = require('../logger');

module.exports = (bot, message, shardId) => logger.warning(message, shardId);
