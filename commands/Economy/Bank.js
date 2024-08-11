const { EmbedBuilder } = require('discord.js');
const fs = require("fs")
const config = require('../../config.json');

const update = config.UPDATE

module.exports = {
    config: {
        name: "bank",
        description: "Your virtual wallet. Shows how much money you have.",
        usage: "{prefix}bank / {prefix}bank @user"
    },
    permissions: ["SendMessages",],
    aliases: ['bal', 'money'],
    owner: false,
    requestaccount: true,
    run: async (client, message, args, prefix, config,) => {
        let user = JSON.parse(fs.readFileSync('././././DB/account.json'))
        let bank = JSON.parse(fs.readFileSync('././././DB/economy.json'))

        let mentioned = message.mentions.members.first();
        if(!mentioned)
        {
            const authorAvatar = message.author.avatarURL({ dynamic: true , size: 2048 , format: "png" })

            let BankEmbed = new EmbedBuilder();
            BankEmbed.setTitle(`**Your bank**`);
            BankEmbed.setDescription(`Money: ${bank[message.author.id].money}$\nTokens: ${bank[message.author.id].token}:flower_playing_cards:`);
            BankEmbed.setColor(`Blurple`);
            BankEmbed.setThumbnail(authorAvatar)
            message.reply({ embeds: [BankEmbed] })

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

            let BankEmbed = new EmbedBuilder();
            BankEmbed.setTitle(`**${mentioned.user.username}**'s bank:`);
            BankEmbed.setDescription(`Money: ${bank[mentioned.id].money}$\nTokens: ${bank[mentioned.id].token}:flower_playing_cards:`);
            BankEmbed.setColor(`Blurple`);
            BankEmbed.setThumbnail(menitonedAvatar)
            message.channel.send({ embeds: [BankEmbed] })
        }
        

    },
};