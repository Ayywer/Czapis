const { EmbedBuilder } = require('discord.js');
const fs = require("fs")
const config = require('../../config.json');

const update = config.UPDATE

module.exports = {
    config: {
        name: "coinflip",
        description: "If you feel lucky, throw a coin, and you can win some money!",
        usage: "{prefix}coinflip {amount}"
    },
    permissions: ["SendMessages",],
    aliases: [],
    owner: false,
    requestaccount: true,
    run: async (client, message, args, prefix, config,) => {
        let bank = JSON.parse(fs.readFileSync('././././DB/economy.json'))
        let hotstreaks = JSON.parse(fs.readFileSync('././././DB/hotstreaks.json'))

        let ErrorEmbed = new EmbedBuilder();
        ErrorEmbed.setTitle("**Error**");
        ErrorEmbed.setDescription("You set a value!");
        ErrorEmbed.setColor(`Red`);

        let Money = args[0];
        
        if(!Money) 
        {
            message.reply({ embeds: [ErrorEmbed] })
            return
        }  
        if (isNaN(Money)) {
            message.reply({ embeds: [ErrorEmbed] })
            return
        }
        if (bank[message.author.id].money < Money) {
            let MoneyEmbed = new EmbedBuilder();
            MoneyEmbed.setTitle("**Error**");
            MoneyEmbed.setDescription("You don't have enough money!");
            MoneyEmbed.setColor(`Red`);
            message.reply({ embeds: [MoneyEmbed] })
            return
        }
        if (Money.indexOf(".") != -1 || Money.indexOf("-") != -1 || Money == 0) {
            let MoneyErrorEmbed = new EmbedBuilder();
            MoneyErrorEmbed.setTitle("**Error**");
            MoneyErrorEmbed.setDescription("You didn't set **correct** value!!");
            MoneyErrorEmbed.setColor(`Red`);
            message.reply({ embeds: [MoneyErrorEmbed] })
            return
        }
        if(bank[message.author.id].token >= 1)
        {

            function randomIntFromInterval(min, max) { 
                return Math.floor(Math.random() * (max - min + 1) + min)
            }

            const rndInt = randomIntFromInterval(0, 100)


            let WinEmbed = new EmbedBuilder();
            WinEmbed.setTitle("**COINFLIP**");
            WinEmbed.setColor(`Orange`);
            WinEmbed.addFields(
                {
                name: "**HOTSTREAK**",
                value: `You have CoinFlip HOTSTREAK: ${hotstreaks[message.author.id].cfstreak + 1}`,
                },
            )

            let LoseEmbed = new EmbedBuilder();
            LoseEmbed.setTitle("**MONETA**");
            LoseEmbed.setDescription(`Sorry, You lost ${Money}$.`);
            LoseEmbed.addFields(
                {
                name: "**HOTSTREAK**",
                value: `You have CoinFlip HOTSTREAK: 0`,
                },
            )
            LoseEmbed.setColor(`DarkOrange`);

            bank[message.author.id].token -= parseInt(1);
            fs.writeFileSync('././././DB/economy.json', JSON.stringify(bank))

            if(rndInt > 50)
            {
                var streak = parseInt(hotstreaks[message.author.id].cfstreak)

                if(hotstreaks[message.author.id].cfstreak > 0)
                {
                    WinEmbed.setDescription(`Congratulations! You won CoinFlip. You earned: ${Money * streak * 2}$!`);
                } else {
                    WinEmbed.setDescription(`Congratulations! You won CoinFlip. You earned: ${Money * 2}$!`);
                }

                hotstreaks[message.author.id].cfstreak += parseInt(1);
                fs.writeFileSync('././././DB/hotstreaks.json', JSON.stringify(hotstreaks))

                bank[message.author.id].money += parseInt(Money * 2);
                fs.writeFileSync('././././DB/economy.json', JSON.stringify(bank))

                message.reply("Throwing a coin...")
                .then(msg => {
                setTimeout(() => msg.edit({ embeds: [WinEmbed] }), 1000)
                })
                .catch();
            } else 
            {
                bank[message.author.id].money -= parseInt(Money);
                fs.writeFileSync('././././DB/economy.json', JSON.stringify(bank))

                hotstreaks[message.author.id].cfstreak -= hotstreaks[message.author.id].cfstreak
                fs.writeFileSync('././././DB/hotstreaks.json', JSON.stringify(hotstreaks))

                message.reply("Throwing a coin...")
                .then(msg => {
                setTimeout(() => msg.edit({ embeds: [LoseEmbed] }), 1000)
                })
            }

        } else {
            let ErrorEmbed = new EmbedBuilder();
            ErrorEmbed.setTitle("**Error**");
            ErrorEmbed.setDescription("You don't have token to play. You can buy it from store!");
            ErrorEmbed.setColor(`Red`);
            message.channel.send({ embeds: [ErrorEmbed] })
            return
        }
        

    }
}