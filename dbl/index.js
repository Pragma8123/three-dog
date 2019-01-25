const DBL = require('dblapi.js');

module.exports = (bot, token) => {
  const dbl = new DBL(token, bot);

  // Register event handlers
  dbl.on('error', err => console.log(`DBL: ${err}`));

  return dbl;
};
