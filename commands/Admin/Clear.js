const { EmbedBuilder } = require('discord.js');
const fs = require("fs")
const config = require('../../config.json');

module.exports = {
    config: {
        name: "clear",
        description: "Want some cleanup on channel? Use this command!",
        usage: "{prefix}clear {value} (max 100)"
    },
    permissions: ["SendMessages","ModerateMembers"],
    aliases: [],
    owner: false,
    requestaccount: false,
    run: async (client, message, args, prefix, config,) => {

        const amount = args[0]

        let ErrorEmbed = new EmbedBuilder();
        ErrorEmbed.setTitle("**Error**");
        ErrorEmbed.setDescription("You set a value!");
        ErrorEmbed.setColor(`Red`);

        if(!amount)
        {
            message.reply({ embeds: [ErrorEmbed] })
            return
        }
        if (isNaN(amount)) {
            message.reply({ embeds: [ErrorEmbed] })
            return
        }

        let ErrorValueEmbed = new EmbedBuilder();
        ErrorValueEmbed.setTitle("**Error**");
        ErrorValueEmbed.setColor(`Red`);

        if (amount.indexOf(".") != -1 || amount.indexOf("-") != -1 || amount == 0) {
            ErrorValueEmbed.setDescription("You didn't set **correct** value!!");
            message.reply({ embeds: [ErrorValueEmbed] })
            return
        }
        if(amount > 100)
        {
            ErrorWartośćEmbed.setDescription("I can't delete more than 100 messages!");
            message.reply({ embeds: [ErrorValueEmbed] })
            return
        }

        let ClearEmbed = new EmbedBuilder();
        ClearEmbed.setTitle("**CLEAR**");
        ClearEmbed.setDescription(`Successfuly deleted ${amount} messages`);
        ClearEmbed.setColor(`Blurple`);

        await message.channel.bulkDelete(amount, true)

        message.channel.send({ embeds: [ClearEmbed] })


        


    }
}