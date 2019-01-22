require('dotenv').config(); // Load env variables from .env

module.exports = async (bot, msg) => {
  const cmdPrefix = process.env.CMD_PREFIX;
  bot.createMessage(msg.channel.id, {
    embed: {
      title: 'Commands',
      author: {
        name: bot.user.username,
        icon_url: bot.user.avatarURL,
      },
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
            '*Need Help?* [**Join the support server**](https://discord.gg/srJB3Y8)',
        },
      ],
    },
  });
};
