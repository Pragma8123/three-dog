require('dotenv').config();
const logger = require('../logger');

module.exports = (ctx, message, shardId) => logger.warn(message, shardId);
