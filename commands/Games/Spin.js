const { EmbedBuilder } = require('discord.js');
const fs = require("fs")
const config = require('../../config.json');

const update = config.UPDATE

module.exports = {
    config: {
        name: "spin",
        description: "Spin some slots to win a big price!",
        usage: "{prefix}spin"
    },
    permissions: ["SendMessages",],
    aliases: [],
    owner: false,
    requestaccount: true,
    run: async (client, message, args, prefix, config,) => {
        let bank = JSON.parse(fs.readFileSync('././././DB/economy.json'))
        let hotstreaks = JSON.parse(fs.readFileSync('././././DB/hotstreaks.json'))

        if(bank[message.author.id].token >= 1)
        {

            bank[message.author.id].token -= 1;
            fs.writeFileSync('././././DB/economy.json', JSON.stringify(bank));

            var lemonMoney = 200      //}
            var cherriesMoney = 300   //}
            var strawberryMoney = 400 //} Adjust as you want!
            var watermelonMoney = 500 //}
            var hamburgerMoney = 1000 //}

            var loseEmbed = new EmbedBuilder()
            loseEmbed.setTitle(`**SLOT MACHINE**`)
            loseEmbed.setColor(`DarkOrange`);

            let winEmbed = new EmbedBuilder()
            winEmbed.setTitle(`**SLOT MACHINE**`)
            winEmbed.setColor(`Orange`);

            var windMoney = 0;

            function randomIntFromInterval(min, max) { 
                return Math.floor(Math.random() * (max - min + 1) + min)
            }

            let slots = [':lemon:',':cherries:',':strawberry:',':watermelon:',':hamburger:']

            var slot1 = randomIntFromInterval(1, 5);
            var slot2 = randomIntFromInterval(1, 5);
            var slot3 = randomIntFromInterval(1, 5);

            if(slot1 == slot2 || slot1 == slot3)
            {
                //half money
                if(slot1 == 1)
                {
                    windMoney = lemonMoney/2
                }
                if(slot1 == 2)
                {
                    windMoney = cherriesMoney/2
                }
                if(slot1 == 3)
                {
                    windMoney = strawberryMoney/2
                }
                if(slot1 == 4)
                {
                    windMoney = watermelonMoney/2
                }
                if(slot1 == 5)
                {
                    windMoney = hamburgerMoney/2
                }
            }
            if(slot2 == slot3)
            {
                //half money
                if(slot2 == 1)
                {
                    windMoney = lemonMoney/2
                }
                if(slot2 == 2)
                {
                    windMoney = cherriesMoney/2
                }
                if(slot2 == 3)
                {
                    windMoney = strawberryMoney/2
                }
                if(slot2 == 4)
                {
                    windMoney = watermelonMoney/2
                }
                if(slot2 == 5)
                {
                    windMoney = hamburgerMoney/2
                }
            }
            if(slot1 == slot2 && slot1 == slot3)
            {
                //full money
                if(slot1 == 1)
                {
                    windMoney = lemonMoney
                }
                if(slot1 == 2)
                {
                    windMoney = cherriesMoney
                }
                if(slot1 == 3)
                {
                    windMoney = strawberryMoney
                }
                if(slot1 == 4)
                {
                    windMoney = watermelonMoney
                }
                if(slot1 == 5)
                {
                    windMoney = hamburgerMoney
                }
            }
            
            if(windMoney > 0)
            {
                var streak = hotstreaks[message.author.id].spinstreak
                var winedmoneywithstreak = parseInt(windMoney * streak)

                if(hotstreaks[message.author.id].spinstreak > 0)
                {
                    winEmbed.setDescription(`► ${slots[slot1 - 1]} | ${slots[slot2 - 1]} | ${slots[slot3 - 1]} ◄\n\n**YOU WON**\n\nYou earned: ${winedmoneywithstreak}$`)
                    winEmbed.addFields(
                        {
                        name: "**HOTSTREAK**",
                        value: `You have SlotMachine HOTSTREAK: ${streak + 1}`,
                        },
                    )
                    
                    bank[message.author.id].money += parseInt(winedmoneywithstreak);
                    fs.writeFileSync('././././DB/economy.json', JSON.stringify(bank))
                    hotstreaks[message.author.id].spinstreak += parseInt(1);
                    fs.writeFileSync('././././DB/hotstreaks.json', JSON.stringify(hotstreaks))
                } else {
                    winEmbed.setDescription(`► ${slots[slot1 - 1]} | ${slots[slot2 - 1]} | ${slots[slot3 - 1]} ◄\n\n**YOU WON**\n\nYou earned: ${windMoney}$`)
                    winEmbed.addFields(
                        {
                            name: "**HOTSTREAK**",
                            value: `You have SlotMachine HOTSTREAK: ${streak + 1}`,
                        },
                    )
                    bank[message.author.id].money += parseInt(windMoney);
                    fs.writeFileSync('././././DB/economy.json', JSON.stringify(bank))
                    hotstreaks[message.author.id].spinstreak += parseInt(1);
                    fs.writeFileSync('././././DB/hotstreaks.json', JSON.stringify(hotstreaks))   
                }

                message.reply({ embeds: [winEmbed] })



            } else {
                loseEmbed.setDescription(`► ${slots[slot1 - 1]} | ${slots[slot2 - 1]} | ${slots[slot3 - 1]} ◄\n\nYou lost, try again.`)
                loseEmbed.addFields(
                    {
                        name: "**HOTSTREAK**",
                        value: `You have SlotMachine HOTSTREAK: 0`,
                    },
                ) 
                message.reply({ embeds: [loseEmbed] })

                hotstreaks[message.author.id].spinstreak -= hotstreaks[message.author.id].spinstreak;
                fs.writeFileSync('././././DB/hotstreaks.json', JSON.stringify(hotstreaks))

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