const { EmbedBuilder } = require('discord.js');
const fs = require("fs")
const config = require('../../config.json');

const update = config.UPDATE

module.exports = {
    config: {
        name: "bank",
        aliases: ['bal', 'money'],
    },
    permissions: ["SendMessages",],
    aliases: ['bal', 'money'],
    owner: false,
    run: async (client, message, args, prefix, config,) => {
        let user = JSON.parse(fs.readFileSync('././././DB/account.json'))
        let bank = JSON.parse(fs.readFileSync('././././DB/economy.json'))
        let cooldown = JSON.parse(fs.readFileSync('././././DB/cooldowns.json'))
        let hotstreaks = JSON.parse(fs.readFileSync('././././DB/hotstreaks.json'))
        //PUMPKIN
        let pumpkin1 = JSON.parse(fs.readFileSync('././././DB/Pumpkin/Series1/pumpkin1.json'))

        let mentioned = message.mentions.members.first();
        if(!mentioned)
        {
            
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

            const authorAvatar = message.author.avatarURL({ dynamic: true , size: 2048 , format: "png" })

            let BankEmbed = new EmbedBuilder();
            BankEmbed.setTitle(`**Twój stan konta**`);
            BankEmbed.setDescription(`Money: ${bank[message.author.id].money}$\nBank: ${bank[message.author.id].bank}$\nTokens: ${bank[message.author.id].token}:flower_playing_cards:`);
            BankEmbed.setColor(`Blurple`);
            BankEmbed.setThumbnail(authorAvatar)
            message.reply({ embeds: [BankEmbed] })

        } else {
            if(!user[mentioned.id])
            {
                let ErrorEmbed = new EmbedBuilder();
                ErrorEmbed.setTitle("**ERROR**");
                ErrorEmbed.setDescription("Ta osoba nie posiada konta");
                ErrorEmbed.setColor(`Red`);
                message.channel.send({ embeds: [ErrorEmbed]});
                return;
            }
            if(user[mentioned.id].update < update )
            {
                let ErrorEmbed = new EmbedBuilder();
                ErrorEmbed.setTitle("**ERROR**");
                ErrorEmbed.setDescription("Ta osoba posiada niezaktualizowane konto, nie moge wyświetlić pewnych wartości :/");
                ErrorEmbed.setColor(`Red`);
                message.channel.send({ embeds: [ErrorEmbed]});
                return;
            }
        
            const menitonedAvatar = mentioned.user.avatarURL({ dynamic: true , size: 2048 , format: "png" })

            let BankEmbed = new EmbedBuilder();
            BankEmbed.setTitle(`Stan konta użytkownika: **${mentioned.user.username}**`);
            BankEmbed.setDescription(`Money: ${bank[mentioned.id].money}$\nBank: ${bank[mentioned.id].bank}$\nTokens: ${bank[mentioned.id].token}:flower_playing_cards:`);
            BankEmbed.setColor(`Blurple`);
            BankEmbed.setThumbnail(menitonedAvatar)
            message.channel.send({ embeds: [BankEmbed] })
        }
        

    },
};