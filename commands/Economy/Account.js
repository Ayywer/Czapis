const { EmbedBuilder } = require('discord.js');
const fs = require("fs")
const config = require('../../config.json');

const update = config.UPDATE

module.exports = {
    config: {
        name: "account",
        description: "Shows your account, or account of mentioned user!",
        usage: "{prefix}account / {prefix}account @user"
    },
    permissions: ["SendMessages",],
    aliases: [],
    owner: false,
    requestaccount: true,
    run: async (client, message, args, prefix, config,) => {
        let user = JSON.parse(fs.readFileSync('././././DB/account.json'))

        let mentioned = message.mentions.members.first();
        if(!mentioned)
        {
            const authorAvatar = message.author.avatarURL({ dynamic: true , size: 2048 , format: "png" })

            let Embed = new EmbedBuilder();
            Embed.setTitle(`**Your Account**`);
            Embed.setDescription(`Level: ${user[message.author.id].level}\nXp: ${user[message.author.id].xp}<:Exp:931275538046267453>\nUpdate: ${user[message.author.id].update}`);
            Embed.setColor(`Blurple`);
            Embed.setThumbnail(authorAvatar)
            message.reply({ embeds: [Embed] })

        } else {

            if(!user[mentioned.id])
                {
                    let ErrorEmbed = new EmbedBuilder();
                    ErrorEmbed.setTitle("**ERROR**");
                    ErrorEmbed.setDescription("This user doesn't have an account");
                    ErrorEmbed.setColor(`Red`);
                    message.channel.send({ embeds: [ErrorEmbed]});
                    return;
                }
                if(user[mentioned.id].update < update )
                {
                    let ErrorEmbed = new EmbedBuilder();
                    ErrorEmbed.setTitle("**ERROR**");
                    ErrorEmbed.setDescription("This user's account is not updated!");
                    ErrorEmbed.setColor(`Red`);
                    message.channel.send({ embeds: [ErrorEmbed]});
                    return;
                }

            const menitonedAvatar = mentioned.user.avatarURL({ dynamic: true , size: 2048 , format: "png" })

            let SomeonesEmbed = new EmbedBuilder();
            SomeonesEmbed.setTitle(`**${mentioned.user.username}**'s Account:`);
            SomeonesEmbed.setDescription(`Level: ${user[mentioned.id].level}\nXp: ${user[mentioned.id].xp}<:Exp:931275538046267453>\nUpdate: ${user[mentioned.id].update}`);
            SomeonesEmbed.setColor(`Blurple`);
            SomeonesEmbed.setThumbnail(menitonedAvatar)
            message.reply({ embeds: [SomeonesEmbed] })

        }

    }
}