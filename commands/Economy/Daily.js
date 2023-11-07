const { EmbedBuilder } = require('discord.js');
const fs = require("fs")
const config = require('../../config.json');

const update = config.UPDATE

module.exports = {
    config: {
        name: "daily",
    },
    permissions: ["SendMessages",],
    aliases: ['dzienne','free','dl','dzien'],
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

        if (Math.floor(new Date().getTime() - cooldown[message.author.id].dailycooldown) / (1000 * 60 * 60 * 24) < 1) {
            let ErrorEmbed = new EmbedBuilder()
            ErrorEmbed.setTitle("**DAILY**");
            ErrorEmbed.setDescription(`Już odebrałeś swoją dzienną nagrodę. Wróć jutro!`);
            ErrorEmbed.setColor(`Red`)
            message.reply({embeds: [ErrorEmbed]});
            return;
        }

        bank[message.author.id].money += parseInt(100);
        bank[message.author.id].token += parseInt(10);
        fs.writeFileSync('././././DB/economy.json', JSON.stringify(bank))
        user[message.author.id].xp += parseInt(10);
        fs.writeFileSync('././././DB/account.json', JSON.stringify(user))
        cooldown[message.author.id].dailycooldown = new Date().getTime();
        fs.writeFileSync('././././DB/cooldowns.json', JSON.stringify(cooldown))

        const embed = new EmbedBuilder()
        embed.setTitle("**DAILY**")
        embed.setColor(`Blurple`)
        embed.setDescription(`Otrzymałeś daily 100$, 10:flower_playing_cards: i 10<:Exp:931275538046267453> xp! Wróć jutro!`)

        if(user[message.author.id].maxXp <= user[message.author.id].xp)
        {
            user[message.author.id].level += parseInt(1);
            user[message.author.id].xp -= parseInt(user[message.author.id].maxXp);
            fs.writeFileSync('././././DB/account.json', JSON.stringify(user))
            user[message.author.id].maxXp += parseInt(100)
            fs.writeFileSync('././././DB/account.json', JSON.stringify(user))

            var LvLembed = new EmbedBuilder()
            LvLembed.setTitle("**NOWY POZIOM!**")
            LvLembed.setDescription(`Gratulacje! Jesteś już na ${user[message.author.id].level} poziomie!`)
            LvLembed.setColor(`Blurple`)
            message.reply({ embeds: [LvLembed] }); 
        }

        message.reply({ embeds: [embed] })
    }
}