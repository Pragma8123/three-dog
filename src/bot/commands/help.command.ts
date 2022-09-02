import { Command, DiscordCommand } from '@discord-nestjs/core';
import { CommandInteraction } from 'discord.js';

@Command({
  name: 'help',
  description: 'Get a list of commands for Three Dog',
})
export class HelpCommand implements DiscordCommand {
  async handler(interaction: CommandInteraction): Promise<void> {
    await interaction.reply({
      ephemeral: true,
      embeds: [
        {
          color: 0x1aff80, // Fallout 3 UI green
          fields: [
            {
              name: 'Commands',
              value: `
                \`/tunein\` - Tune-in to GNR
                \`/tuneout\`
                \`/meme\` - Post a fresh Fallout meme
                \`/vote\` - Vote for Three Dog on Top.gg 🗳️
                \`/help\` - This command 😉
              `,
            },
            {
              name: 'Invite',
              value:
                '*Spread the good fight!* [**Invite Three Dog to your server!**](https://3dog.rocks)',
            },
            {
              name: 'Help',
              value:
                '*Need Help?* [**Join the support server**](https://discord.gg/QwfXED8)',
            },
            {
              name: 'Donate',
              value:
                '*If you like me around,* [**buy my creator a coffee!**](https://ko-fi.com/pragma8123)',
            },
          ],
        },
      ],
    });
  }
}
