const DBL = require('dblapi.js');
const logger = require('../logger');

module.exports = (bot, token) => {
  const dbl = new DBL(token, bot);

  // Register event handlers
  dbl.on('posted', () => logger.verbose('DBL: Server count posted'));
  dbl.on('error', err => logger.error('DBL Error', err));

  return dbl;
};
