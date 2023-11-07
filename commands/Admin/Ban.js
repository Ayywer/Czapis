const { EmbedBuilder } = require('discord.js');
const fs = require("fs")
const config = require('../../config.json');

module.exports = {
    config: {
        name: "ban",
    },
    permissions: ["SendMessages", "KickMembers", "ModerateMembers"],
    aliases: ['b','punish','zbanuj','zban'],
    owner: false,
    run: async (client, message, args, prefix, config,) => {

        const inputMember = args[0];
		let inputReason = args.slice(1).join(" ");

        const member = message.mentions.members.first();

		if (!inputMember) {
            let ErrorEmbed = new EmbedBuilder();
            ErrorEmbed.setTitle("**Error**");
            ErrorEmbed.setDescription("Nie podałeś użytkownika!");
            ErrorEmbed.setColor(`Red`);
            message.reply({ embeds: [ErrorEmbed] })
            return
        }
        if (!member) {
            let ErrorEmbed = new EmbedBuilder();
            ErrorEmbed.setTitle("**Error**");
            ErrorEmbed.setDescription("Nie znalazłem takiego użytkownika!");
            ErrorEmbed.setColor(`Red`);
            message.reply({ embeds: [ErrorEmbed] })
            return
        } 
        
        if(member.id == message.author.id) {
            let ErrorEmbed = new EmbedBuilder();
            ErrorEmbed.setTitle("**Error**");
            ErrorEmbed.setDescription("Nie możesz samego siebie zbanować 💀");
            ErrorEmbed.setColor(`Red`);
            message.reply({ embeds: [ErrorEmbed] })
            return 
        }

        if(member.id == "1034463864298950736") {
            let ErrorEmbed = new EmbedBuilder();
            ErrorEmbed.setTitle("**Error**");
            ErrorEmbed.setDescription("Nie możesz mnie zbanować 💀");
            ErrorEmbed.setColor(`Red`);
            message.reply({ embeds: [ErrorEmbed] })
            return 
        }


        const memberPosition = member.roles.highest.position;
		const authorPosition = message.member.roles.highest.position;

        let BanErrorEmbed = new EmbedBuilder();
        BanErrorEmbed.setTitle("**Error**");
        BanErrorEmbed.setDescription("Nie możesz zbanować tej osoby");
        BanErrorEmbed.setColor(`Red`); 

        if (authorPosition < memberPosition) return message.reply({ embeds: [BanErrorEmbed] });
		if (!member.kickable) return message.reply({ embeds: [BanErrorEmbed] });
		if (!inputReason) inputReason = "";

        const baned = await member.ban({
			"reason": inputReason
		});
		const authorUsername = message.author.username;
		const menitonedAvatar = baned.user.avatarURL({ dynamic: true , size: 2048 , format: "png" })
		const memberUsername = baned.user.username;

		if (!inputReason) inputReason = "Nie podano powodu";

		const banEmbed = new EmbedBuilder()
			.setTitle("Impostor! ඞ")
			.setDescription(`${memberUsername} was the impostor! ඞඞ\nReason: ${inputReason}\nBanned by: ${authorUsername}!`)
			.setColor(`Blurple`)
			.setThumbnail(menitonedAvatar);

		message.channel.send({embeds: [banEmbed]});

    }
}