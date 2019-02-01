require('dotenv').config();
const logger = require('../logger');

module.exports = (bot, err, shardId) => {
  logger.error('', err, shardId);
};
