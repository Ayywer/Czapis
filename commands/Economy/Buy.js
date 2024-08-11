const { EmbedBuilder } = require('discord.js');
const fs = require("fs")
const config = require('../../config.json');

const update = config.UPDATE

module.exports = {
    config: {
        name: "buy",
        description: "You can buy items available in shop with this command!",
        usage: "{prefix}buy {item} {amount}"
    },
    permissions: ["SendMessages",],
    aliases: [],
    owner: false,
    requestaccount: true,
    run: async (client, message, args, prefix, config,) => {
        let bank = JSON.parse(fs.readFileSync('././././DB/economy.json'))
        
        let item = args[0];
        let amount = args[1];

        let ErrorEmbed = new EmbedBuilder();
        ErrorEmbed.setTitle("**Error**");
        ErrorEmbed.setDescription("You set a value!");
        ErrorEmbed.setColor(`Red`);

        if(!item)
        {
            message.reply({ embeds: [ErrorEmbed] })
            return
        }
        if(!amount) 
        {
            message.reply({ embeds: [ErrorEmbed] })
            return
        }  
        if (isNaN(amount)) {
            message.reply({ embeds: [ErrorEmbed] })
            return
        }
        if (amount.indexOf(".") != -1 || amount.indexOf("-") != -1 || amount == 0) {
            let ErrorValueEmbed = new EmbedBuilder();
            ErrorValueEmbed.setTitle("**Error**");
            ErrorValueEmbed.setDescription("You didn't set **correct** value!!");
            ErrorValueEmbed.setColor(`Red`);
            message.reply({ embeds: [ErrorValueEmbed] })
            return
        }

        switch (item) {
            //Add as many as you want!

            case "token":
                if (1500 * parseInt(amount) > bank[message.author.id].money) {
                    let ErrorMoneyEmbed = new EmbedBuilder();
                    ErrorMoneyEmbed.setTitle("**Error**");
                    ErrorMoneyEmbed.setDescription("You don't have enough money!");
                    ErrorMoneyEmbed.setColor(`Red`);
                    message.reply({ embeds: [ErrorMoneyEmbed] })
                    return
                }

                bank[message.author.id].token += parseInt(amount);
                bank[message.author.id].money -= parseInt(amount) * 1500;
                fs.writeFileSync('././././DB/economy.json', JSON.stringify(bank))

                let Embed = new EmbedBuilder();
                Embed.setTitle("**SHOP**");
                Embed.setDescription(`You have successfully bought ${amount} ${item}!`);
                Embed.setColor(`Blurple`);
                message.reply({ embeds: [Embed] })
                return
            default:
                let ErrorItemEmbed = new EmbedBuilder();
                ErrorItemEmbed.setTitle("**Error**");
                ErrorItemEmbed.setDescription(`This item does not exist. Check ${prefix}shop for item list!`);
                ErrorItemEmbed.setColor(`Red`);
                message.reply({ embeds: [ErrorItemEmbed] })
                return
            }

    }
}