const { EmbedBuilder } = require('discord.js');
const fs = require("fs")
const config = require('../../config.json');
const punishments = require('../../schemas/modSchema')
const mongoose = require('mongoose');

const update = config.UPDATE

module.exports = {
    config: {
        name: "warn",
    },
    permissions: ["SendMessages", "KickMembers", "ModerateMembers"],
    aliases: ['w','ostrzeżenie','warning','ostrzerzenie','ostżerzenie','ostżeżenie'],
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
            ErrorEmbed.setDescription("Nie możesz dać samemu sobie warna 💀");
            ErrorEmbed.setColor(`Red`);
            message.reply({ embeds: [ErrorEmbed] })
            return 
        }

        if(member.id == "1034463864298950736") {
            let ErrorEmbed = new EmbedBuilder();
            ErrorEmbed.setTitle("**Error**");
            ErrorEmbed.setDescription("OKEJ OKEJ, postaram się być grzeczny, tylko nie bij pls :c");
            ErrorEmbed.setColor(`Red`);
            message.reply({ embeds: [ErrorEmbed] })
            return 
        }

        const memberPosition = member.roles.highest.position;
		const authorPosition = message.member.roles.highest.position;

        let BanErrorEmbed = new EmbedBuilder();
        BanErrorEmbed.setTitle("**Error**");
        BanErrorEmbed.setDescription("Nie możesz dać warna tej osobie");
        BanErrorEmbed.setColor(`Red`); 

        if (authorPosition < memberPosition) return message.reply({ embeds: [BanErrorEmbed] });
		//if (!member.kickable) return message.reply({ embeds: [BanErrorEmbed] });
		if (!inputReason) inputReason = "";

		const authorUsername = message.author.username;
		const menitonedAvatar = member.user.avatarURL({ dynamic: true , size: 2048 , format: "png" })
		const memberUsername = member.user.username;

		if (!inputReason) inputReason = "Nie podano powodu";

        let data = await punishments.findOne({
            GuildID: message.guild.id,
            UserID: member.id
        })

        //var iloscwarnow = data.Value

        if(data)
        {
            data.Value += 1;
            await data.save();

            data.Punishments.unshift({
                PunishType: 'Warn',
                Moderator: message.author.id,
                Reason: inputReason,
            })

            await data.save()

            const warnEmbed = new EmbedBuilder()
			.setTitle("⚠️Ostrzeżenie⚠️")
			.setDescription(`Ostrzeżenie dla **${memberUsername}** \nPowód: ${inputReason}\nWykonawca: ${authorUsername}\nIlość warnów: ${data.Value}`)
			.setColor(`Blurple`)
			.setThumbnail(menitonedAvatar);

		message.channel.send({
			embeds: [warnEmbed]
		});
            
        } else {
            let newData = new punishments({
                //_id: mongoose.Types.ObjectId(),
                GuildID: message.guild.id,
                UserID: member.id,
                Punishments: [{
                    PunishType: 'Warn',
                    Moderator: message.author.id,
                    reason: inputReason,
                }, ],
                Value: 1,
            })

            await newData.save()

            const warnEmbed = new EmbedBuilder()
			.setTitle("⚠️Ostrzeżenie⚠️")
			.setDescription(`Ostrzeżenie dla **${memberUsername}**\nPowód: ${inputReason}\nWykonawca: ${authorUsername}\nTo jest pierwszy warn tego użytkownika`)
			.setColor(`Blurple`)
			.setThumbnail(menitonedAvatar);

		message.channel.send({embeds: [warnEmbed]
		});

        }

    }
}