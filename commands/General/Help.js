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
        .setTitle(`**Available Commands**`)
        .addFields(
            {
              name: ":hammer_pick: Admin :hammer_pick:",
              value: "• Ban\n• Kick\n• Clear",
            },
            {
              name: ":moneybag: Economy :beginner: ",
              value: "• Bank \n• Shop\n• Buy\n• Account\n• Daily\n• Pay\n• Work\n• Spin\n• Coinflip\n• Leaderboard",
              inline: false
            },
            {
              name: ":sunglasses: General :sunglasses:",
              value: "• Awatar\n• Cat \n• Help\n• Hug\n• Kiss\n • 8Ball",
              inline: false
            },
          )
        .setColor(`Orange`)
        .setThumbnail(authorAvatar)

        message.channel.send({embeds: [HelpEmbed] });

        return

    }
}