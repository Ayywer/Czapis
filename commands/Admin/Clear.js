const { EmbedBuilder } = require('discord.js');
const fs = require("fs")
const config = require('../../config.json');

const update = config.UPDATE

module.exports = {
    config: {
        name: "clear",
    },
    permissions: ["SendMessages","ModerateMembers"],
    aliases: ['wyczyść','wyczysć','wyczysc','wyczyśc','cl','c'],
    owner: false,
    run: async (client, message, args, prefix, config,) => {

        const amount = args[0]

        var ErrorEmbed = new EmbedBuilder();
        ErrorEmbed.setTitle("**Error**");
        ErrorEmbed.setDescription("Nie podałeś wartości!");
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
        if (amount.indexOf(".") != -1 || amount.indexOf("-") != -1 || amount == 0) {
            let ErrorWartośćEmbed = new EmbedBuilder();
            ErrorWartośćEmbed.setTitle("**Error**");
            ErrorWartośćEmbed.setDescription("Nie podałeś **odpowiedniej** wartości!!");
            ErrorWartośćEmbed.setColor(`Red`);
            message.reply({ embeds: [ErrorWartośćEmbed] })
            return
        }
        if(amount > 100)
        {
            let ErrorWartośćEmbed = new EmbedBuilder();
            ErrorWartośćEmbed.setTitle("**Error**");
            ErrorWartośćEmbed.setDescription("Nie moge usuwać więcej wiadomości niż 100!");
            ErrorWartośćEmbed.setColor(`Red`);
            message.reply({ embeds: [ErrorWartośćEmbed] })
            return
        }

        let Embed = new EmbedBuilder();
        Embed.setTitle("**CLEAR**");
        Embed.setDescription(`Pomyślnie usunięto ${amount} wiadomości.`);
        Embed.setColor(`Blurple`);

        await message.channel.bulkDelete(amount, true)

        message.channel.send({ embeds: [Embed] })


        


    }
}