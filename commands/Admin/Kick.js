const { EmbedBuilder } = require('discord.js');
const fs = require("fs")
const config = require('../../config.json');

module.exports = {
    config: {
        name: "kick",
        description: "You can kick someone out of server with this command!",
        usage: "{prefix}kick @user {reason}"
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

            ErrorEmbed.setDescription("You can't kick yourself 💀");
            message.reply({ embeds: [ErrorEmbed] })
            return 
        }

        if(member.id == "1034463864298950736") {

            ErrorEmbed.setDescription("You can't kick me lol 💀");
            message.reply({ embeds: [ErrorEmbed] })
            return 
        }


        const memberPosition = member.roles.highest.position;
		const authorPosition = message.member.roles.highest.position;

        let KickErrorEmbed = new EmbedBuilder();
        KickErrorEmbed.setTitle("**Error**");
        KickErrorEmbed.setDescription("You can't kick this user!");
        KickErrorEmbed.setColor(`Red`); 

        if (authorPosition < memberPosition) return message.reply({ embeds: [KickErrorEmbed] });
		if (!member.kickable) return message.reply({ embeds: [KickErrorEmbed] });
		if (!inputReason) inputReason = "";

        const kickd = await member.kick({
			"reason": inputReason
		});
		const authorUsername = message.author.username;
		const menitonedAvatar = kickd.user.avatarURL({ dynamic: true , size: 2048 , format: "png" })
		const memberUsername = kickd.user.username;

		if (!inputReason) inputReason = "No reason provided";

		const KickEmbed = new EmbedBuilder()
			.setTitle("Impostor! ඞ")
			.setDescription(`${memberUsername} was the impostor! ඞඞ\nReason: ${inputReason}\nKicked by: ${authorUsername}!`)
			.setColor(`Blurple`)
			.setThumbnail(menitonedAvatar);

		message.channel.send({embeds: [KickEmbed]});

    }
}