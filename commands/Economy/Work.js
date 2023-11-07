const { EmbedBuilder } = require('discord.js');
const fs = require("fs")
const config = require('../../config.json');

const update = config.UPDATE

module.exports = {
    config: {
        name: "work",
    },
    permissions: ["SendMessages",],
    owner: false,
    aliases: [],
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

        function randomIntFromInterval(min, max) { 
            return Math.floor(Math.random() * (max - min + 1) + min)
        }
        const rndInt = randomIntFromInterval(10, 100)
        const exp = randomIntFromInterval(1, 5)

        var tokenrandomchance = randomIntFromInterval(1, 100)
        var randomText = randomIntFromInterval(1, 3)

        if (tokenrandomchance > 0 && tokenrandomchance < 11)
        {
            randomText = 4;
        }

        let deltaTime = Math.floor((new Date().getTime() - cooldown[message.author.id].workcooldown) / (1000 * 60));
        if (deltaTime < 10) {
            let ErrorEmbed = new EmbedBuilder()
            ErrorEmbed.setTitle("**ZWOLNIJ**");
            ErrorEmbed.setDescription(`Możesz użyć komendy |work dopiero za: ${10 - deltaTime} minut`);
            ErrorEmbed.setColor(`Red`)
            message.channel.send({embeds: [ErrorEmbed]});
            return;
        }
        
        cooldown[message.author.id].workcooldown = new Date().getTime();
        fs.writeFileSync('././././DB/cooldowns.json', JSON.stringify(cooldown))

        const embed = new EmbedBuilder()
        embed.setColor(`Blurple`)

        if(randomText == 1)
        {
            embed.setDescription(`Udało ci się zarobić ${rndInt}$`)
            bank[message.author.id].money += parseInt(rndInt);
            fs.writeFileSync('././././DB/economy.json', JSON.stringify(bank))
            user[message.author.id].xp += parseInt(exp);
            fs.writeFileSync('././././DB/account.json', JSON.stringify(user))
        }
        if(randomText == 2)
        {
            embed.setDescription(`Sprzątałeś/aś śmieci w pobliskim miasteczku. W nagrodę otrzymujesz ${rndInt}$`)
            bank[message.author.id].money += parseInt(rndInt);
            fs.writeFileSync('././././DB/economy.json', JSON.stringify(bank))
            user[message.author.id].xp += parseInt(exp);
            fs.writeFileSync('././././DB/account.json', JSON.stringify(user))
        }
        if(randomText == 3)
        {
            embed.setDescription(`Pomogłeś/aś znajomemu wędkarzowi złowić dużą rybę. Dostajesz ${rndInt}$`)
            bank[message.author.id].money += parseInt(rndInt);
            fs.writeFileSync('././././DB/economy.json', JSON.stringify(bank))
            user[message.author.id].xp += parseInt(exp);
            fs.writeFileSync('././././DB/account.json', JSON.stringify(user))
        }
        if(randomText == 4)
        {
            embed.setDescription(`Podczas spaceru po mieście znalazłeś 1:flower_playing_cards:`)
            bank[message.author.id].token += 1;
            fs.writeFileSync('././././DB/economy.json', JSON.stringify(bank))

        }

        
        if(user[message.author.id].xp > user[message.author.id].maxXp || user[message.author.id].xp == user[message.author.id].maxXp )
        {
            user[message.author.id].level += parseInt(1);
            user[message.author.id].xp -= parseInt(user[message.author.id].maxXp);
            fs.writeFileSync('././././DB/account.json', JSON.stringify(user))
            user[message.author.id].maxXp += parseInt(100)
            fs.writeFileSync('././././DB/account.json', JSON.stringify(user))

            const LvLembed = new EmbedBuilder()
            LvLembed.setTitle("**NOWY POZIOM!**")
            LvLembed.setDescription(`Gratulacje! Jesteś już na ${user[message.author.id].level} poziomie!`)
            LvLembed.setColor(`Blurple`)

            message.reply({ embeds: [LvLembed] }); 
        }

        message.reply({ embeds: [embed] }); 
    }
}