const { EmbedBuilder } = require('discord.js');
const fs = require("fs")
const config = require('../../config.json');

const update = config.UPDATE

module.exports = {
    config: {
        name: "spin",
    },
    permissions: ["SendMessages",],
    aliases: ['sp','gambl','jrb','sm','slot','slotm','spain'],
    owner: false,
    run: async (client, message, args, prefix, config,) => {
        let user = JSON.parse(fs.readFileSync('././././DB/account.json'))
        let bank = JSON.parse(fs.readFileSync('././././DB/economy.json'))
        let cooldown = JSON.parse(fs.readFileSync('././././DB/cooldowns.json'))
        let hotstreaks = JSON.parse(fs.readFileSync('././././DB/hotstreaks.json'))
        //PUMPKIN
        let pumpkin1 = JSON.parse(fs.readFileSync('././././DB/Pumpkin/Series1/pumpkin1.json'))

        if(!user[message.author.id])
        {
            let ErrorEmbed = new EmbedBuilder();
            ErrorEmbed.setTitle("**Error**");
            ErrorEmbed.setDescription("Nie posiadasz konta, pozwól że utworze je za ciebie!");
            ErrorEmbed.setColor(`Red`);
        
            user[message.author.id] = {
                level: 1,
                xp: 0,
                maxXp: 100,
                update: update,
            }
        
            fs.writeFileSync('././././DB/account.json', JSON.stringify(user))
        
            bank[message.author.id] = {
                money: 100,
                bank: 0,
                token: 0,
            }
        
            fs.writeFileSync('././././DB/economy.json', JSON.stringify(bank))
        
            cooldown[message.author.id] = {
                workcooldown: 0,
                huntcooldown: 0,
                dailycooldown:0,
            }
        
            fs.writeFileSync('././././DB/cooldowns.json', JSON.stringify(cooldown))
        
            pumpkin1[message.author.id] = {
                selectedCat: 0,
                CommonCat: -1,
                CatBoy: -1,
                Gato: -1,
                Nerdie: -1,
                CoolCat: -1,
                Catlien: -1,
                C4ttY: -1,
                KlMiaun: -1,
                Ghat: -1,
                Poopitty: -1,
                Devilat: -1,
                BlobCat: -1,
                Pumpkin: -1,
                Maxwell: -1,
                CocainumCat: -1,
                Czapis: -1
            }
        
            fs.writeFileSync('././././DB/Pumpkin/Series1/pumpkin1.json', JSON.stringify(pumpkin1))
        
            hotstreaks[message.author.id] = {
                cfstreak: 0,
                spinstreak: 0,
            }
        
            fs.writeFileSync('././././DB/hotstreaks.json', JSON.stringify(hotstreaks))
        
            let AccountEmbed = new EmbedBuilder();
            AccountEmbed.setTitle("**Konto**");
            AccountEmbed.setDescription("Konto zostało utworzone pomyślnie!");
            AccountEmbed.setColor(`Blurple`);
        
            message.channel.send({ embeds: [ErrorEmbed] })
            .then(msg => {
                setTimeout(() => msg.edit({ embeds: [AccountEmbed] }), 500)
            })
            .catch();
        }
        if(user[message.author.id].update < update)
        {
            let ErrorEmbed = new EmbedBuilder();
            ErrorEmbed.setTitle("**Error**");
            ErrorEmbed.setDescription("Posiadasz niezaaktualizowane konto, Aktualizacja •••");
            ErrorEmbed.setColor(`Red`);

            let UpdateEmbed = new EmbedBuilder();
            UpdateEmbed.setTitle("**Aktualizacja**");
            UpdateEmbed.setDescription("Konto zostało zaaktualizowane pomyślnie!");
            UpdateEmbed.setColor(`Blurple`);

            message.reply({ embeds: [ErrorEmbed] })
            .then(msg => {
                setTimeout(() => msg.edit({ embeds: [UpdateEmbed] }), 1000)
            })
            .catch();
        }

        if(bank[message.author.id].token >= 1)
        {
            var lemonMoney = 200
            var cherriesMoney = 300
            var strawberryMoney = 400
            var watermelonMoney = 500
            var hamburgerMoney = 1000

            const slots = [':lemon:',':cherries:',':strawberry:',':watermelon:',':hamburger:',':chestnut:',':chestnut:',':chestnut:']

            let number = [];
            
            for (let i = 0; i < 3; i++) {
              number[i] = Math.floor(Math.random() * slots.length);
            }

            var loseEmbed = new EmbedBuilder()
            loseEmbed.setTitle(`**SLOT MACHINE**`)
            loseEmbed.setColor(`DarkOrange`);

            let winEmbed = new EmbedBuilder()
            winEmbed.setTitle(`**SLOT MACHINE**`)
            winEmbed.setColor(`Orange`);

            var windMoney = 0;
            if(slots[number[0]] == ":lemon:")
            {
                if(slots[number[1]] == ":lemon:")
                {
                   if(slots[number[2]] == ":lemon:") 
                   {
                        windMoney += parseInt(lemonMoney)
                   } else {
                    windMoney += parseInt(lemonMoney / 2)
                   }
                } else {
                    if(slots[number[2]] == ":lemon:") 
                    {
                        windMoney += parseInt(lemonMoney / 2)
                    } 
                }
            } else {
                if(slots[number[1]] == ":lemon:")
                {
                   if(slots[number[2]] == ":lemon:") 
                   {
                        windMoney += parseInt(lemonMoney / 2)
                   } 
                } 
            }  
            if(slots[number[0]] == ":cherries:")
            {
                if(slots[number[1]] == ":cherries:")
                {
                   if(slots[number[2]] == ":cherries:") 
                   {
                    windMoney += parseInt(cherriesMoney)
                   } else {
                    windMoney += parseInt(cherriesMoney / 2)
                   }
                } else {
                    if(slots[number[2]] == ":cherries:") 
                    {
                        windMoney += parseInt(cherriesMoney / 2)
                    } 
                }
            } else {
                if(slots[number[1]] == ":cherries:")
                {
                   if(slots[number[2]] == ":cherries:") 
                   {
                        windMoney += parseInt(cherriesMoney / 2)
                   } 
                } 
            }
            if(slots[number[0]] == ":strawberry:")
            {
                if(slots[number[1]] == ":strawberry:")
                {
                   if(slots[number[2]] == ":strawberry:") 
                   {

                    windMoney += parseInt(strawberryMoney)

                   } else {
                    windMoney += parseInt(strawberryMoney / 2)
                   }
                } else {
                    if(slots[number[2]] == ":strawberry:") 
                    {

                        windMoney += parseInt(strawberryMoney / 2)
                    } 
                }
            } else {
                if(slots[number[1]] == ":strawberry:")
                {
                   if(slots[number[2]] == ":strawberry:") 
                   {
                        windMoney += parseInt(strawberryMoney / 2)
                   } 
                } 
            }
            if(slots[number[0]] == ":watermelon:")
            {
                if(slots[number[1]] == ":watermelon:")
                {
                   if(slots[number[2]] == ":watermelon:") 
                   {

                    windMoney += parseInt(watermelonMoney)

                   } else {
                    windMoney += parseInt(watermelonMoney / 2)
                   }
                } else {
                    if(slots[number[2]] == ":watermelon:") 
                    {

                        windMoney += parseInt(watermelonMoney / 2)
                    } 
                }
            } else {
                if(slots[number[1]] == ":watermelon:")
                {
                   if(slots[number[2]] == ":watermelon:") 
                   {
                        windMoney += parseInt(watermelonMoney / 2)
                   } 
                } 
            }
            if(slots[number[0]] == ":hamburger:")
            {
                if(slots[number[1]] == ":hamburger:")
                {
                   if(slots[number[2]] == ":hamburger:") 
                   {

                    windMoney += parseInt(hamburgerMoney)

                   } else {
                    windMoney += parseInt(hamburgerMoney / 2)
                   }
                } else {
                    if(slots[number[2]] == ":hamburger:") 
                    {
                        windMoney += parseInt(hamburgerMoney / 2)
                    } 
                }
            } else {
                if(slots[number[1]] == ":hamburger:")
                {
                   if(slots[number[2]] == ":hamburger:") 
                   {
                        windMoney += parseInt(hamburgerMoney / 2)
                   } 
                } 
            }

            
            if(windMoney > 0)
            {
                var streak = hotstreaks[message.author.id].spinstreak
                var winedmoneywithstreak = parseInt(bank[message.author.id].money * streak)

                //console.log(winedmoneywithstreak)

                if(hotstreaks[message.author.id].spinstreak > 0)
                {
                    winEmbed.setDescription(`► ${slots[number[0]]} | ${slots[number[1]]} | ${slots[number[2]]} ◄\n\n**WYGRAŁEŚ**\n\nWygrywasz: ${windMoney * streak}$`)
                    winEmbed.addFields(
                        {
                        name: "**HOTSTREAK**",
                        value: `Posiadasz HOTSTREAK SlotMachine: ${streak + 1}`,
                        },
                    )
                    
                    bank[message.author.id].money += parseInt(winedmoneywithstreak);
                    fs.writeFileSync('././././DB/economy.json', JSON.stringify(bank))
                    hotstreaks[message.author.id].spinstreak += parseInt(1);
                    fs.writeFileSync('././././DB/hotstreaks.json', JSON.stringify(hotstreaks))
                } else {
                    winEmbed.setDescription(`► ${slots[number[0]]} | ${slots[number[1]]} | ${slots[number[2]]} ◄\n\n**WYGRAŁEŚ**\n\nWygrywasz: ${windMoney}$`)
                    winEmbed.addFields(
                        {
                        name: "**HOTSTREAK**",
                        value: `Posiadasz HOTSTREAK SlotMachine: ${streak + 1}`,
                        },
                    )
                    bank[message.author.id].money += parseInt(winedmoneywithstreak);
                    fs.writeFileSync('././././DB/economy.json', JSON.stringify(bank))
                    hotstreaks[message.author.id].spinstreak += parseInt(1);
                    fs.writeFileSync('././././DB/hotstreaks.json', JSON.stringify(hotstreaks))   
                }

                message.reply({ embeds: [winEmbed] })



            } else {
                loseEmbed.setDescription(`► ${slots[number[0]]} | ${slots[number[1]]} | ${slots[number[2]]} ◄\n\nNiestety nie udało ci się wygrać. Spróbuj ponownie.`)
                loseEmbed.addFields(
                    {
                    name: "**HOTSTREAK**",
                    value: `Posiadasz HOTSTREAK SlotMachine: 0`,
                    },
                ) 
                message.reply({ embeds: [loseEmbed] })

                hotstreaks[message.author.id].spinstreak -= hotstreaks[message.author.id].spinstreak;
                fs.writeFileSync('././././DB/hotstreaks.json', JSON.stringify(hotstreaks))

            }

            bank[message.author.id].money += parseInt(windMoney);
            fs.writeFileSync('././././DB/economy.json', JSON.stringify(bank))
            bank[message.author.id].token -= parseInt(1);
            fs.writeFileSync('././././DB/economy.json', JSON.stringify(bank))


        } else {
            let ErrorEmbed = new EmbedBuilder();
            ErrorEmbed.setTitle("**Error**");
            ErrorEmbed.setDescription("Nie posiadasz tokenu do gry. Możesz go kupić w sklepie.");
            ErrorEmbed.setColor(`Red`);
            message.channel.send({ embeds: [ErrorEmbed] })
            return
        }
    }
}