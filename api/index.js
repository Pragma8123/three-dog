const express = require('express');
const router = express.Router();

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
