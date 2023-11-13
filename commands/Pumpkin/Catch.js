const { EmbedBuilder } = require('discord.js');
const fs = require("fs")
const config = require('../../config.json');
const data = require('../../DB/Pumpkin/spawn.json');

const update = config.UPDATE

module.exports = {
    config: {
        name: "catch",
    },
    permissions: ["SendMessages",],
    aliases: ['złap','łap','ch','c'],
    owner: false,
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
            message.reply("Nie podałeś nazwy kita. \n Aby użyć komendy, wpisz |catch [nazwa]")
        } else { 
            if(spawndata[message.channel.id].cattospawn != 0)
            {
                if(spawndata[message.channel.id].cattospawn == 1 )
                {
                    if(Name.toLowerCase() == "zwykłykitek" || Name.toLowerCase() == "zwyklykitek")
                    {
                        spawndata[message.channel.id].cattospawn = 0;
                        fs.writeFileSync('././././DB/Pumpkin/spawn.json', JSON.stringify(spawndata))

                        pumpkin1[message.author.id].CommonCat += parseInt(1);
                        fs.writeFileSync('././././DB/Pumpkin/Series1/pumpkin1.json', JSON.stringify(pumpkin1))

                        bank[message.author.id].token += parseInt(1);
                        fs.writeFileSync('././././DB/economy.json', JSON.stringify(bank))

                        user[message.author.id].xp += parseInt(10);
                        fs.writeFileSync('././././DB/account.json', JSON.stringify(user))

                        message.reply("Udało ci się złapać tego kitka! \n Otrzymujesz: 10XP i 1:flower_playing_cards:")

                    } else {
                        console.log("to uruchamia 1")
                        message.reply("Niestety, to nie jest poprawna nazwa tego kitka");
                        return
                    }
                } 

                if(spawndata[message.channel.id].cattospawn == 2 )
                {
                    if(Name.toLowerCase() == "catboy")
                        {
                            spawndata[message.channel.id].cattospawn = 0;
                            fs.writeFileSync('././././DB/Pumpkin/spawn.json', JSON.stringify(spawndata))
    
                            pumpkin1[message.author.id].CatBoy += parseInt(1);
                            fs.writeFileSync('././././DB/Pumpkin/Series1/pumpkin1.json', JSON.stringify(pumpkin1))
    
                            bank[message.author.id].token += parseInt(1);
                            fs.writeFileSync('././././DB/economy.json', JSON.stringify(bank))
    
                            user[message.author.id].xp += parseInt(20);
                            fs.writeFileSync('././././DB/account.json', JSON.stringify(user))
    
                            message.reply("Udało ci się złapać tego kitka! \n Otrzymujesz: 20XP i 1:flower_playing_cards:")
                    } else {
                        console.log("to uruchamia 2")
                        message.reply("Niestety, to nie jest poprawna nazwa tego kitka");
                        return
                    } 

                }
                        
                if(spawndata[message.channel.id].cattospawn == 3 )
                {
                    if(Name.toLowerCase() == "gato")
                    {
                        spawndata[message.channel.id].cattospawn = 0;
                        fs.writeFileSync('././././DB/Pumpkin/spawn.json', JSON.stringify(spawndata))

                        pumpkin1[message.author.id].Gato += parseInt(1);
                        fs.writeFileSync('././././DB/Pumpkin/Series1/pumpkin1.json', JSON.stringify(pumpkin1))

                        bank[message.author.id].token += parseInt(1);
                        fs.writeFileSync('././././DB/economy.json', JSON.stringify(bank))

                        user[message.author.id].xp += parseInt(30);
                        fs.writeFileSync('././././DB/account.json', JSON.stringify(user))

                        message.reply("Udało ci się złapać tego kitka! \n Otrzymujesz: 30XP i 1:flower_playing_cards:")
                        
                    } else {
                        console.log("to uruchamia 3")
                        message.reply("Niestety, to nie jest poprawna nazwa tego kitka");
                        return
                    }
                } 
                
                if(spawndata[message.channel.id].cattospawn == 4 )
                {
                    if(Name.toLowerCase() == "nerdie")
                    {
                        spawndata[message.channel.id].cattospawn = 0;
                        fs.writeFileSync('././././DB/Pumpkin/spawn.json', JSON.stringify(spawndata))

                        pumpkin1[message.author.id].Nerdie += parseInt(1);
                        fs.writeFileSync('././././DB/Pumpkin/Series1/pumpkin1.json', JSON.stringify(pumpkin1))

                        bank[message.author.id].token += parseInt(1);
                        fs.writeFileSync('././././DB/economy.json', JSON.stringify(bank))

                        user[message.author.id].xp += parseInt(40);
                        fs.writeFileSync('././././DB/account.json', JSON.stringify(user))

                        message.reply("Udało ci się złapać tego kitka! \n Otrzymujesz: 40XP i 1:flower_playing_cards:")

                    } else {
                        console.log("to uruchamia 4")
                        message.reply("Niestety, to nie jest poprawna nazwa tego kitka");
                        return
                    }
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

                return

            } else {
                message.reply("Na tym kanale nie pojawił się jeszcze żaden kitek")
                return
            }
        }

    }
}