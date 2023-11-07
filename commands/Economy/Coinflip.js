const { EmbedBuilder } = require('discord.js');
const fs = require("fs")
const config = require('../../config.json');

const update = config.UPDATE

module.exports = {
    config: {
        name: "coinflip",
    },
    permissions: ["SendMessages",],
    aliases: ['cf','coinf','cflip','moneta','coin','flip',"żm","żutmonetą"],
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

            let AccountEmbed = new EmbedBuilder();
            AccountEmbed.setTitle("**Aktualizacja**");
            AccountEmbed.setDescription("Konto zostało zaaktualizowane pomyślnie!");
            AccountEmbed.setColor(`Blurple`);

            message.reply({ embeds: [ErrorEmbed] })
            .then(msg => {
                setTimeout(() => msg.edit({ embeds: [AccountEmbed] }), 1000)
            })
            .catch();
        }

        var ErrorEmbed = new EmbedBuilder();
        ErrorEmbed.setTitle("**Error**");
        ErrorEmbed.setDescription("Nie podałeś wartości!");
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
            MoneyEmbed.setDescription("Nie posiadasz tylu pieniędzy na ręce!");
            MoneyEmbed.setColor(`Red`);
            message.reply({ embeds: [MoneyEmbed] })
            return
        }
        if (Money.indexOf(".") != -1 || Money.indexOf("-") != -1 || Money == 0) {
            let MoneyErrorEmbed = new EmbedBuilder();
            MoneyErrorEmbed.setTitle("**Error**");
            MoneyErrorEmbed.setDescription("Nie podałeś **odpowiedniej** wartości!!");
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
            WinEmbed.setTitle("**MONETA**");
            WinEmbed.setColor(`Orange`);
            WinEmbed.addFields(
                {
                name: "**HOTSTREAK**",
                value: `Posiadasz HOTSTREAK CoinFlipa: ${hotstreaks[message.author.id].cfstreak + 1}`,
                },
            )

            let LoseEmbed = new EmbedBuilder();
            LoseEmbed.setTitle("**MONETA**");
            LoseEmbed.setDescription(`Przykro mi... Nie udało ci się wygrać w rzucie monetą. Tracisz ${Money}$.`);
            LoseEmbed.addFields(
                {
                name: "**HOTSTREAK**",
                value: `Posiadasz HOTSTREAK CoinFlipa: 0`,
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
                    WinEmbed.setDescription(`Gratulacje! udało ci się wygrać w rzucie monetą! Otrzymujesz ${Money * streak * 2}$!`);
                } else {
                    WinEmbed.setDescription(`Gratulacje! udało ci się wygrać w rzucie monetą! Otrzymujesz ${Money * 2}$!`);
                }

                hotstreaks[message.author.id].cfstreak += parseInt(1);
                fs.writeFileSync('././././DB/hotstreaks.json', JSON.stringify(hotstreaks))

                bank[message.author.id].money += parseInt(Money * 2);
                fs.writeFileSync('././././DB/economy.json', JSON.stringify(bank))

                message.reply("rzucam monetą")
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

                message.reply("rzucam monetą")
                .then(msg => {
                setTimeout(() => msg.edit({ embeds: [LoseEmbed] }), 1000)
                })
            }

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