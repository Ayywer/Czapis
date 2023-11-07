const { EmbedBuilder } = require('discord.js');
const fs = require("fs")
const config = require('../../config.json');

const update = config.UPDATE

module.exports = {
    config: {
        name: "buy",
    },
    permissions: ["SendMessages",],
    aliases: ['kup'],
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

        message.channel.send({ embeds: [ErrorEmbed] })
        .then(msg => {
            setTimeout(() => msg.edit({ embeds: [AccountEmbed] }), 1000)
        })
        .catch();
        }

        let item = args[0];
        let amount = args[1];

        let ErrorEmbed = new EmbedBuilder();
        ErrorEmbed.setTitle("**Error**");
        ErrorEmbed.setDescription("Nie podałeś wartości!");
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
            let ErrorWartośćEmbed = new EmbedBuilder();
            ErrorWartośćEmbed.setTitle("**Error**");
            ErrorWartośćEmbed.setDescription("Nie podałeś **odpowiedniej** wartości!!");
            ErrorWartośćEmbed.setColor(`Red`);
            message.reply({ embeds: [ErrorWartośćEmbed] })
            return
        }

        switch (item) {
            case "token":
                if (1500 * parseInt(amount) > bank[message.author.id].money) {
                    let ErrorMoneyEmbed = new EmbedBuilder();
                    ErrorMoneyEmbed.setTitle("**Error**");
                    ErrorMoneyEmbed.setDescription("Nie posiadasz tylu pieniędzy na ręce!");
                    ErrorMoneyEmbed.setColor(`Red`);
                    message.reply({ embeds: [ErrorMoneyEmbed] })
                    return
                }

                bank[message.author.id].token += parseInt(amount);
                bank[message.author.id].money -= parseInt(amount) * 1500;
                fs.writeFileSync('././././DB/economy.json', JSON.stringify(bank))

                let Embed = new EmbedBuilder();
                Embed.setTitle("**SKLEP**");
                Embed.setDescription(`Pomyślnie zakupiłeś ${amount} sztuk przedmiotu: ${item}`);
                Embed.setColor(`Blurple`);
                message.reply({ embeds: [Embed] })
                return
            default:
                let ErrorItemEmbed = new EmbedBuilder();
                ErrorItemEmbed.setTitle("**Error**");
                ErrorItemEmbed.setDescription("Taki przedmiot nie istnieje. Wpisz |shop aby zobaczyć liste przedmiotów.");
                ErrorItemEmbed.setColor(`Red`);
                message.reply({ embeds: [ErrorItemEmbed] })
                return
            }

    }
}