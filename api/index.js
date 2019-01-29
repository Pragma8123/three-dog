const express = require('express');
const logger = require('../logger');
const router = express.Router();

// Logger middleware
router.use((req, res, next) => {
  logger.verbose('API Request', {
    ip: req.ip,
    path: req.path,
    params: req.params,
  });
  next();
});

router.get('/guilds', (req, res) => {
  const bot = req.app.get('bot');
  res.json(bot.guilds.filter(() => true).length);
});

router.get('/streams', (req, res) => {
  const bot = req.app.get('bot');
  res.json(bot.sharedStream.voiceConnections.filter(() => true).length);
});

router.get('/uptime', (req, res) => {
  const bot = req.app.get('bot');
  res.json(bot.uptime);
});

module.exports = router;
