require('dotenv').config();
const logger = require('../logger');

module.exports = (bot, err, shardId) => logger.error(null, err, shardId);
