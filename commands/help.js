require('dotenv').config(); // Load env variables from .env
const logger = require('../logger');

module.exports = async (bot, msg) => {
  const cmdPrefix = process.env.CMD_PREFIX;
  try {
    await bot.createMessage(msg.channel.id, {
      embed: {
        color: 0x1aff80, // Fallout 3 UI green
        fields: [
          {
            name: 'Tune In',
            value: `\`${cmdPrefix} tunein\``,
          },
          {
            name: 'Tune Out',
            value: `\`${cmdPrefix} tuneout\``,
          },
          {
            name: 'Fallout Meme',
            value: `\`${cmdPrefix} meme\``,
          },
          {
            name: 'Help',
            value: `\`${cmdPrefix}\``,
          },
          {
            name: 'Support Server',
            value:
              '*Need Help?* [**Join the support server**](https://discord.gg/QwfXED8)',
          },
        ],
      },
    });
  } catch (err) {
    logger.error(null, err);
  }
};
