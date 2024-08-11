const { EmbedBuilder } = require('discord.js');
const fs = require("fs")
const config = require('../../config.json');

module.exports = {
    config: {
        name: "ban",
        description: "You can ban people with this command!",
        usage: "{prefix}ban @user {reason}"
    },
    permissions: ["SendMessages", "KickMembers", "ModerateMembers"],
    aliases: [],
    owner: false,
    requestaccount: false,
    run: async (client, message, args, prefix, config,) => {

        const inputMember = args[0];
		let inputReason = args.slice(1).join(" ");

        const member = message.mentions.members.first();

        let ErrorEmbed = new EmbedBuilder();
        ErrorEmbed.setTitle("**Error**");
        ErrorEmbed.setColor(`Red`);


		if (!inputMember) {
            ErrorEmbed.setDescription("You didn't mention an user!");
            message.reply({ embeds: [ErrorEmbed] })
            return
        }
        if (!member) {
            ErrorEmbed.setDescription("I didn't found that user!");
            message.reply({ embeds: [ErrorEmbed] })
            return
        } 
        
        if(member.id == message.author.id) {

            ErrorEmbed.setDescription("You can't ban yourself 💀");
            message.reply({ embeds: [ErrorEmbed] })
            return 
        }

        if(member.id == "1034463864298950736") {

            ErrorEmbed.setDescription("You can't ban me lol 💀");
            message.reply({ embeds: [ErrorEmbed] })
            return 
        }


        const memberPosition = member.roles.highest.position;
		const authorPosition = message.member.roles.highest.position;

        let BanErrorEmbed = new EmbedBuilder();
        BanErrorEmbed.setTitle("**Error**");
        BanErrorEmbed.setDescription("You can't ban this user");
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

		if (!inputReason) inputReason = "No reason provided";

		const banEmbed = new EmbedBuilder()
			.setTitle("Impostor! ඞ")
			.setDescription(`${memberUsername} was the impostor! ඞඞ\nReason: ${inputReason}\nBanned by: ${authorUsername}!`)
			.setColor(`Blurple`)
			.setThumbnail(menitonedAvatar);

		message.channel.send({embeds: [banEmbed]});

    }
}