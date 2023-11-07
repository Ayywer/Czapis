const { EmbedBuilder } = require('discord.js');
const fs = require("fs")
const config = require('../../config.json');

const update = config.UPDATE

module.exports = {
    config: {
        name: "help",
    },
    permissions: ["SendMessages",],
    aliases: ['komendy','h','pomoc','ayuda','info'],
    owner: false,
    run: async (client, message, args, prefix, config,) => {

        const authorAvatar = message.author.avatarURL({ dynamic: true , size: 2048 , format: "png" })

        let HelpEmbed = new EmbedBuilder()
        .setTitle(`**Dostępne Komendy**`)
        .addFields(
            {
              name: ":hammer_pick: ADMIN :hammer_pick:",
              value: "• Ban\n• Kick\n• Warn\n• Clear",
            },
            {
              name: ":moneybag: Ekonomia i Konto :beginner: ",
              value: "• Bank \n• Withdraw | Deposit\n• Shop\n• Buy\n• Konto\n• Daily\n• Pay\n• Work\n• Spin\n• Coinflip\n• Leaderboard",
              inline: false
            },
            {
              name: "<:Pumpkin:926856485198254101> Pumpkin <:Pumpkin:926856485198254101>",
              value: "• Hunt\n• Catch",
              inline: false
            },
            {
              name: ":sunglasses: Generalne :sunglasses:",
              value: "• Awatar\n• Cat \n• Help\n• Hug\n• Kiss",
              inline: false
            },
          )
        .setColor(`Orange`)
        .setThumbnail(authorAvatar)

        message.channel.send({embeds: [HelpEmbed] });

        return

    }
}