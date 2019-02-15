require('dotenv').config();
const logger = require('../logger');

module.exports = (ctx, err, shardId) => logger.error(null, err, shardId);
