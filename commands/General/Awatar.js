const { EmbedBuilder } = require('discord.js');
const fs = require("fs")
const config = require('../../config.json');

const update = config.UPDATE

module.exports = {
    config: {
        name: "awatar",
    },
    permissions: ["SendMessages",],
    aliases: ['avatar','av','a','pfp','profile','pp'],
    owner: false,
    run: async (client, message, args, prefix, config,) => {
        const inputMember = args[0];
        const member = message.mentions.members.first();

        if (!inputMember) {
            const authorAvatar = message.author.avatarURL({ dynamic: true , size: 2048 , format: "png" })

            const Embed = new EmbedBuilder()
			.setTitle(`**Twój awatar**, **${message.author.username}**`)
			.setColor(`Blurple`)
			.setThumbnail(authorAvatar);

		    message.channel.send({embeds: [Embed] });

            return
        }
        if (!member) {
            message.reply("Nie znalazłem takiego użytkownika");
            return
        } else { 
            const mentionedAvatar = member.user.avatarURL({ dynamic: true , size: 2048 , format: "png" })

            const Embed = new EmbedBuilder()
			.setTitle(`**Awatar użytkownika:** **${member.user.username}**`)
			.setColor(`Blurple`)
			.setThumbnail(mentionedAvatar);

		    message.channel.send({embeds: [Embed]});


            return
        }
    }
}