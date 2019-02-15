require('dotenv').config(); // Load env variables from .env

module.exports = async (ctx, msg) => {
  const { bot } = ctx;
  const cmdPrefix = process.env.CMD_PREFIX;
  try {
    await bot.createMessage(msg.channel.id, {
      embed: {
        color: 0x1aff80, // Fallout 3 UI green
        fields: [
          {
            name: 'Commands',
            value: `
            \`${cmdPrefix} tunein\` - Tune-in to GNR
            \`${cmdPrefix} tuneout\`
            \`${cmdPrefix} meme\` - Post a fresh Fallout meme
            \`${cmdPrefix} vote\` - Vote for Three Dog on discord bot list
            \`${cmdPrefix} help\` - This message`,
          },
          {
            name: 'Support Server',
            value:
              '*Need Help?* [**Join the support server**](https://discord.gg/QwfXED8)',
          },
          {
            name: 'Donate',
            value:
              '*If you like me around,* [**buy my creator a coffee!**](https://paypal.me/pragma8123)',
          },
        ],
      },
    });
  } catch (err) {
    throw err;
  }
};
