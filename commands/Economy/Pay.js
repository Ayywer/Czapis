const { EmbedBuilder } = require('discord.js');
const fs = require("fs")
const config = require('../../config.json');

const update = config.UPDATE

module.exports = {
    config: {
        name: "pay",
        description: "You can give some money to another user with this command!",
        usage: "{prefix}pay {amount} @user"
    },
    permissions: ["SendMessages",],
    aliases: [],
    owner: false,
    requestaccount: true,
    run: async (client, message, args, prefix, config,) => {
        let user = JSON.parse(fs.readFileSync('././././DB/account.json'))
        let bank = JSON.parse(fs.readFileSync('././././DB/economy.json'))

        let ErrorEmbed = new EmbedBuilder();
        ErrorEmbed.setTitle("**Error**");
        ErrorEmbed.setColor(`Red`);
        
        let Money = args[0];
        
        if(!Money) 
        {
            ErrorEmbed.setDescription("You set a value!");
            message.reply({ embeds: [ErrorEmbed] })
            return
        }  
        if (isNaN(Money)) {
            ErrorEmbed.setDescription("You set a value!");
            message.reply({ embeds: [ErrorEmbed] })
            return
        }
        if (bank[message.author.id].money < Money) {
            let NoMoneyEmbed = new EmbedBuilder();
            NoMoneyEmbed.setTitle("**Error**");
            NoMoneyEmbed.setDescription("You don't have enough money!");
            NoMoneyEmbed.setColor(`Red`);
            message.reply({ embeds: [NoMoneyEmbed] })
            return
        }
        if (Money.indexOf(".") != -1 || Money.indexOf("-") != -1 || Money == 0) {
            let ErrorValueEmbed = new EmbedBuilder();
            ErrorValueEmbed.setTitle("**Error**");
            ErrorValueEmbed.setDescription("You didn't set **correct** value!!");
            ErrorValueEmbed.setColor(`Red`);
            message.reply({ embeds: [ErrorValueEmbed] })
            return
        }
        let mentioned = message.mentions.members.first();
        if(!mentioned)
        {
            ErrorEmbed.setDescription("You didn't mention an user!");
            message.reply({ embeds: [ErrorEmbed] })
            return
        }
        if(!user[mentioned.id])
        {
            ErrorEmbed.setDescription("This user doesn't have an account");
            message.channel.send({ embeds: [ErrorEmbed]});
            return;
        }

        bank[mentioned.id].money += parseInt(Money)
        bank[message.author.id].money -= parseInt(Money)
        fs.writeFileSync('././././DB/economy.json', JSON.stringify(bank))

        let Embed = new EmbedBuilder();
        Embed.setTitle("**Zapłata**");
        Embed.setDescription(`You successfully gave ${Money}$ to: ${mentioned.user.username}`);
        Embed.setColor(`Blurple`);
        message.reply({ embeds: [Embed] })
        return

    }
}