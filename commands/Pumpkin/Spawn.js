const { EmbedBuilder } = require('discord.js');
const fs = require("fs")
const config = require('../../config.json');
const data = require('../../DB/Pumpkin/spawn.json');

const update = config.UPDATE

module.exports = {
    config: {
        name: "spawn",
    },
    permissions: ["SendMessages",],
    aliases: [],
    owner: true,
    run: async (client, message, args, prefix, config,) => {
        let user = JSON.parse(fs.readFileSync('././././DB/account.json'))
        let bank = JSON.parse(fs.readFileSync('././././DB/economy.json'))
        let cooldown = JSON.parse(fs.readFileSync('././././DB/cooldowns.json'))
        let hotstreaks = JSON.parse(fs.readFileSync('././././DB/hotstreaks.json'))
        //PUMPKIN
        let pumpkin1 = JSON.parse(fs.readFileSync('././././DB/Pumpkin/Series1/pumpkin1.json'))
        let spawndata = JSON.parse(fs.readFileSync('././././DB/Pumpkin/spawn.json'))

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

        let Name = args[0]

        if(!Name)
        {
            message.reply("Nie podałeś nazwy kita.")
        } else { 
            if(spawndata[message.channel.id].cattospawn == 0)
            {
                if(Name.toLowerCase() == "zwykłykitku" || Name.toLowerCase() == "zwyklykitku")
                {
                    let SpawnEmbed = new EmbedBuilder();
                    SpawnEmbed.setTitle(`Pojawił się kitku!`);
                    SpawnEmbed.setDescription(`Zgadnij nazwe kitka i wpisz |catch <nazwa> aby go złapać!`)
                    SpawnEmbed.setImage(`https://cdn.discordapp.com/attachments/1133049404400599141/1133049500110430400/ZwykyKitku.png`);

                    message.channel.send({ embeds: [SpawnEmbed] })
                    if(!spawndata[message.channel.id])
                    {
                        spawndata[message.channel.id] = {
                        cattospawn: 1,
                        catname: "placeholder",
                    }
                    fs.writeFileSync('././././DB/Pumpkin/spawn.json', JSON.stringify(spawndata))

                    } else {
                        spawndata[message.channel.id].cattospawn = 1;
                        fs.writeFileSync('././././DB/Pumpkin/spawn.json', JSON.stringify(spawndata))
                    }
                }

                if(Name.toLowerCase() == "catboy")
                {
                    let SpawnEmbed = new EmbedBuilder();
                    SpawnEmbed.setTitle(`Pojawił się kitku!`);
                    SpawnEmbed.setDescription(`Zgadnij nazwe kitka i wpisz |catch <nazwa> aby go złapać!`)
                    SpawnEmbed.setImage(`https://cdn.discordapp.com/attachments/1133049404400599141/1133049499204468756/CatBoy.png`);

                    message.channel.send({ embeds: [SpawnEmbed] })
                    if(!spawndata[message.channel.id])
                    {
                        spawndata[message.channel.id] = {
                        cattospawn: 2,
                        catname: "placeholder",
                    }
                    fs.writeFileSync('././././DB/Pumpkin/spawn.json', JSON.stringify(spawndata))

                    } else {
                        spawndata[message.channel.id].cattospawn = 2;
                        fs.writeFileSync('././././DB/Pumpkin/spawn.json', JSON.stringify(spawndata))
                    }
                }

                if(Name.toLowerCase() == "gato")
                {
                    let SpawnEmbed = new EmbedBuilder();
                    SpawnEmbed.setTitle(`Pojawił się kitku!`);
                    SpawnEmbed.setDescription(`Zgadnij nazwe kitka i wpisz |catch <nazwa> aby go złapać!`)
                    SpawnEmbed.setImage(`https://cdn.discordapp.com/attachments/1133049404400599141/1133049499560976484/Gato.png`);

                    message.channel.send({ embeds: [SpawnEmbed] })
                    if(!spawndata[message.channel.id])
                    {
                        spawndata[message.channel.id] = {
                        cattospawn: 3,
                        catname: "placeholder",
                    }
                    fs.writeFileSync('././././DB/Pumpkin/spawn.json', JSON.stringify(spawndata))

                    } else {
                        spawndata[message.channel.id].cattospawn = 3;
                        fs.writeFileSync('././././DB/Pumpkin/spawn.json', JSON.stringify(spawndata))
                    }
                }

                if(Name.toLowerCase() == "nerdie")
                {
                    let SpawnEmbed = new EmbedBuilder();
                    SpawnEmbed.setTitle(`Pojawił się kitku!`);
                    SpawnEmbed.setDescription(`Zgadnij nazwe kitka i wpisz |catch <nazwa> aby go złapać!`)
                    SpawnEmbed.setImage(`https://cdn.discordapp.com/attachments/1133049404400599141/1133049499871363132/Nerdie.png`);

                    message.channel.send({ embeds: [SpawnEmbed] })
                    if(!spawndata[message.channel.id])
                    {
                        spawndata[message.channel.id] = {
                        cattospawn: 4,
                        catname: "placeholder",
                    }
                    fs.writeFileSync('././././DB/Pumpkin/spawn.json', JSON.stringify(spawndata))

                    } else {
                        spawndata[message.channel.id].cattospawn = 4;
                        fs.writeFileSync('././././DB/Pumpkin/spawn.json', JSON.stringify(spawndata))
                    }
                }

                return

            } else {
                message.reply("Na tym kanale pojawił się już kitek")
                return
            }
        }

    }
}