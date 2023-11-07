const { EmbedBuilder } = require('discord.js');
const fs = require("fs")
const config = require('../../config.json');

const update = config.UPDATE

module.exports = {
    config: {
        name: "hunt",
    },
    permissions: ["SendMessages",],
    aliases: ['h','poluj','hunting','hunts','polowanie'],
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

        let deltaTime = Math.floor((new Date().getTime() - cooldown[message.author.id].huntcooldown) / (1000 * 60));
        if (deltaTime < 5) {
            let ErrorEmbed = new EmbedBuilder()
            ErrorEmbed.setTitle("**ZWOLNIJ**");
            ErrorEmbed.setDescription(`Możesz użyć komendy |hunt dopiero za: ${5 - deltaTime} minut`);
            ErrorEmbed.setColor(`Red`)
            message.channel.send({embeds: [ErrorEmbed]});
            return;
        }
        
        cooldown[message.author.id].huntcooldown = new Date().getTime();
        fs.writeFileSync('././././DB/cooldowns.json', JSON.stringify(cooldown))
        

        function randomIntFromInterval(min, max) { 
            return Math.floor(Math.random() * (max - min + 1) + min)
        }
        const rndInt = randomIntFromInterval(0, 1000)
        const exp = randomIntFromInterval(5, 15)
        
        var rarity
        
        if(rndInt >= 450)
        {
            rarity = 1;
            var commons = randomIntFromInterval(1, 4)
        } 
        if(rndInt >= 150 && rndInt < 450)
        {
            rarity = 2;
            var rares = randomIntFromInterval(1, 4)
        } 
        if( rndInt >= 45 && rndInt < 150)
        {
            rarity = 3;
            var epics = randomIntFromInterval(1, 3)
        } 
        if (rndInt >= 10 && rndInt < 45)
        {
            rarity = 4;
            var legendaries = randomIntFromInterval(1, 3)
        }
        if (rndInt >= 0 && rndInt < 10){
            rarity = 5;
            var secrets = randomIntFromInterval(1, 2)
        }

        let HuntEmbed = new EmbedBuilder();
        if(rarity > 0)
        {
            if(rarity == 1)
            {
                HuntEmbed.setTitle(`<:Common_pospolite:933366497609404456> **Common!**`);
                HuntEmbed.setColor(`Grey`);

                if(commons == 1)
                {
                    pumpkin1[message.author.id].CommonCat += parseInt(2)
                    fs.writeFileSync('././././DB/Pumpkin/Series1/pumpkin1.json', JSON.stringify(pumpkin1))

                    if(pumpkin1[message.author.id].CommonCat == 1 || !pumpkin1[message.author.id].CommonCat)
                    {
                        HuntEmbed.addFields(
                            {
                            name: "**NOWY KITKU**",
                            value: "Odkryłeś nowego kitka!",
                            },
                        );
                    } else {
                        pumpkin1[message.author.id].CommonCat -= parseInt(1)
                        fs.writeFileSync('././././DB/Pumpkin/Series1/pumpkin1.json', JSON.stringify(pumpkin1))
                    }

                    HuntEmbed.setThumbnail(`https://cdn.discordapp.com/attachments/1133049404400599141/1133049500110430400/ZwykyKitku.png`);
                    HuntEmbed.setDescription(`Udało ci się złapać **Zwykły Kitku**!`)
                    HuntEmbed.addFields(
                        {
                        name: "**Zwykły Kitku**",
                        value: `Najzwyklejszy w świecie kitek.\n Ilość posiadanych kitków: ${pumpkin1[message.author.id].CommonCat}.`,
                        },
                        
                    );
                }
                if(commons == 2)
                {
                    pumpkin1[message.author.id].CatBoy += parseInt(2)
                    fs.writeFileSync('././././DB/Pumpkin/Series1/pumpkin1.json', JSON.stringify(pumpkin1))

                    if(pumpkin1[message.author.id].CatBoy == 1)
                    {
                        HuntEmbed.addFields(
                            {
                            name: "**NOWY KITKU**",
                            value: "Odkryłeś nowego kitka!",
                            },
                        );
                    } else {
                        pumpkin1[message.author.id].CatBoy -= parseInt(1)
                        fs.writeFileSync('././././DB/Pumpkin/Series1/pumpkin1.json', JSON.stringify(pumpkin1))
                    }

                    HuntEmbed.setThumbnail(`https://cdn.discordapp.com/attachments/1133049404400599141/1133049499204468756/CatBoy.png`);
                    HuntEmbed.setDescription(`Udało ci się złapać **Cat Boy**!`)
                    HuntEmbed.addFields(
                        {
                        name: "**Cat Boy**",
                        value: `Dzielny kitku który nie boi się trudnych wyzwań.\n Ilość posiadanych kitków: ${pumpkin1[message.author.id].CatBoy}.`,
                        },
                    );
                    
                }
                if(commons == 3)
                {
                    pumpkin1[message.author.id].Gato += parseInt(2)
                    fs.writeFileSync('././././DB/Pumpkin/Series1/pumpkin1.json', JSON.stringify(pumpkin1))

                    if(pumpkin1[message.author.id].Gato == 1)
                    {
                        HuntEmbed.addFields(
                            {
                            name: "**NOWY KITKU**",
                            value: "Odkryłeś nowego kitka!",
                            },
                        );
                    } else {
                        pumpkin1[message.author.id].Gato -= parseInt(1)
                        fs.writeFileSync('././././DB/Pumpkin/Series1/pumpkin1.json', JSON.stringify(pumpkin1))
                    }

                    HuntEmbed.setThumbnail(`https://cdn.discordapp.com/attachments/1133049404400599141/1133049499560976484/Gato.png`);
                    HuntEmbed.setDescription(`Udało ci się złapać **Gato**!`)
                    HuntEmbed.addFields(
                        {
                        name: "**Gato**",
                        value: `Trochę dziwny, wygląda znajomo...\n Ilość posiadanych kitków: ${pumpkin1[message.author.id].Gato}.`,
                        },
                        
                    );

                }
                if(commons == 4)
                {
                    pumpkin1[message.author.id].Nerdie += parseInt(2)
                    fs.writeFileSync('././././DB/Pumpkin/Series1/pumpkin1.json', JSON.stringify(pumpkin1))
                    
                    if(pumpkin1[message.author.id].Nerdie == 1)
                    {
                        HuntEmbed.addFields(
                            {
                            name: "**NOWY KITKU**",
                            value: "Odkryłeś nowego kitka!",
                            },
                        );
                    } else {
                        pumpkin1[message.author.id].Nerdie -= parseInt(1)
                        fs.writeFileSync('././././DB/Pumpkin/Series1/pumpkin1.json', JSON.stringify(pumpkin1))
                    }

                    HuntEmbed.setThumbnail(`https://cdn.discordapp.com/attachments/1133049404400599141/1133049499871363132/Nerdie.png`);
                    HuntEmbed.setDescription(`Udało ci się złapać **Nerdie**!`)
                    HuntEmbed.addFields(
                        {
                        name: "**Nerdie**",
                        value: `Wedłuch moich obliczeń, ten kitku jest bardzo fajny :nerd: :nerd: :nerd: \n Ilość posiadanych kitków: ${pumpkin1[message.author.id].Nerdie}.`,
                        },
                        
                    );

                }
            } 
            if (rarity == 2) 
            {
                HuntEmbed.setTitle(`<:Rare_Rzadkie:933370211082571786> **Rare!**`);
                HuntEmbed.setColor(`Aqua`);
                if(rares == 1)
                {
                    pumpkin1[message.author.id].CoolCat += parseInt(2)
                    fs.writeFileSync('././././DB/Pumpkin/Series1/pumpkin1.json', JSON.stringify(pumpkin1))

                    if(pumpkin1[message.author.id].CoolCat == 1)
                    {
                        HuntEmbed.addFields(
                            {
                            name: "**NOWY KITKU**",
                            value: "Odkryłeś nowego kitka!",
                            },
                        );
                    } else {
                        pumpkin1[message.author.id].CoolCat -= parseInt(1)
                        fs.writeFileSync('././././DB/Pumpkin/Series1/pumpkin1.json', JSON.stringify(pumpkin1))
                    }

                    HuntEmbed.setThumbnail(`https://cdn.discordapp.com/attachments/1133049404400599141/1134471272244453446/CoolCat.png`);
                    HuntEmbed.setDescription(`Udało ci się złapać **Cool Kitku**!`)
                    HuntEmbed.addFields(
                        {
                        name: "**Cool Kitku**",
                        value: `Najfajniejszy kitku w całej okolicy!.\n Ilość posiadanych kitków: ${pumpkin1[message.author.id].CoolCat}.`,
                        },
                        
                    );
                }
                if(rares == 2)
                {
                    pumpkin1[message.author.id].Catlien += parseInt(2)
                    fs.writeFileSync('././././DB/Pumpkin/Series1/pumpkin1.json', JSON.stringify(pumpkin1))

                    if(pumpkin1[message.author.id].Catlien == 1)
                    {
                        HuntEmbed.addFields(
                            {
                            name: "**NOWY KITKU**",
                            value: "Odkryłeś nowego kitka!",
                            },
                        );
                    } else {
                        pumpkin1[message.author.id].Catlien -= parseInt(1)
                        fs.writeFileSync('././././DB/Pumpkin/Series1/pumpkin1.json', JSON.stringify(pumpkin1))
                    }

                    HuntEmbed.setThumbnail(`https://cdn.discordapp.com/attachments/1133049404400599141/1134471272038928444/Catlien.png`);
                    HuntEmbed.setDescription(`Udało ci się złapać **Catlien**!`)
                    HuntEmbed.addFields(
                        {
                        name: "**Catlien**",
                        value: `cAłkIeM dzZIwwWnNnY\n Ilość posiadanych kitków: ${pumpkin1[message.author.id].Catlien}.`,
                        },
                        
                    );
                }
                if(rares == 3)
                {
                    pumpkin1[message.author.id].C4ttY += parseInt(2)
                    fs.writeFileSync('././././DB/Pumpkin/Series1/pumpkin1.json', JSON.stringify(pumpkin1))

                    if(pumpkin1[message.author.id].C4ttY == 1)
                    {
                        HuntEmbed.addFields(
                            {
                            name: "**NOWY KITKU**",
                            value: "Odkryłeś nowego kitka!",
                            },
                        );
                    } else {
                        pumpkin1[message.author.id].C4ttY -= parseInt(1)
                        fs.writeFileSync('././././DB/Pumpkin/Series1/pumpkin1.json', JSON.stringify(pumpkin1))
                    }

                    HuntEmbed.setThumbnail(`https://cdn.discordapp.com/attachments/1133049404400599141/1134471271774695485/C4ttY.png`);
                    HuntEmbed.setDescription(`Udało ci się złapać **C4ttY**!`)
                    HuntEmbed.addFields(
                        {
                        name: "**C4ttY**",
                        value: `J3ST3M *BZZ* R0B0T3M *BZZ*\n Ilość posiadanych kitków: ${pumpkin1[message.author.id].C4ttY}.`,
                        },
                        
                    );
                }
                if(rares == 4)
                {
                    pumpkin1[message.author.id].KlMiaun += parseInt(2)
                    fs.writeFileSync('././././DB/Pumpkin/Series1/pumpkin1.json', JSON.stringify(pumpkin1))

                    if(pumpkin1[message.author.id].KlMiaun == 1)
                    {
                        HuntEmbed.addFields(
                            {
                            name: "**NOWY KITKU**",
                            value: "Odkryłeś nowego kitka!",
                            },
                        );
                    } else {
                        pumpkin1[message.author.id].KlMiaun -= parseInt(1)
                        fs.writeFileSync('././././DB/Pumpkin/Series1/pumpkin1.json', JSON.stringify(pumpkin1))
                    }

                    HuntEmbed.setThumbnail(`https://cdn.discordapp.com/attachments/1133049404400599141/1134471272840048640/KlMiaun.png`);
                    HuntEmbed.setDescription(`Udało ci się złapać **KlMiaun**!`)
                    HuntEmbed.addFields(
                        {
                        name: "**KlMiaun**",
                        value: `Całkiem śmieszny! :D\n Ilość posiadanych kitków: ${pumpkin1[message.author.id].KlMiaun}.`,
                        },
                        
                    );
                }
            } 
            if (rarity == 3)
            {
                HuntEmbed.setTitle(`<:Epic_Epickie:933370262408282132> **Epic!**`);
                HuntEmbed.setColor(`Purple`);
                if(epics == 1)
                {
                    pumpkin1[message.author.id].Ghat += parseInt(2)
                    fs.writeFileSync('././././DB/Pumpkin/Series1/pumpkin1.json', JSON.stringify(pumpkin1))

                    if(pumpkin1[message.author.id].Ghat == 1)
                    {
                        HuntEmbed.addFields(
                            {
                            name: "**NOWY KITKU**",
                            value: "Odkryłeś nowego kitka!",
                            },
                        );
                    } else {
                        pumpkin1[message.author.id].Ghat -= parseInt(1)
                        fs.writeFileSync('././././DB/Pumpkin/Series1/pumpkin1.json', JSON.stringify(pumpkin1))
                    }

                    HuntEmbed.setThumbnail(`https://cdn.discordapp.com/attachments/1133049404400599141/1134485518168633374/Ghat.png`);
                    HuntEmbed.setDescription(`Udało ci się złapać **Ghat**!`)
                    HuntEmbed.addFields(
                        {
                        name: "**Ghat**",
                        value: `Bardzo sp00py D:\n Ilość posiadanych kitków: ${pumpkin1[message.author.id].Ghat}.`,
                        },
                        
                    );
                }
                if(epics == 2)
                {
                    pumpkin1[message.author.id].Poopitty += parseInt(2)
                    fs.writeFileSync('././././DB/Pumpkin/Series1/pumpkin1.json', JSON.stringify(pumpkin1))

                    if(pumpkin1[message.author.id].Poopitty == 1)
                    {
                        HuntEmbed.addFields(
                            {
                            name: "**NOWY KITKU**",
                            value: "Odkryłeś nowego kitka!",
                            },
                        );
                    } else {
                        pumpkin1[message.author.id].Poopitty -= parseInt(1)
                        fs.writeFileSync('././././DB/Pumpkin/Series1/pumpkin1.json', JSON.stringify(pumpkin1))
                    }

                    HuntEmbed.setThumbnail(`https://cdn.discordapp.com/attachments/1133049404400599141/1134485518470611034/Poopitty.png`);
                    HuntEmbed.setDescription(`Udało ci się złapać **Poopitty**!`)
                    HuntEmbed.addFields(
                        {
                        name: "**Poopitty**",
                        value: `Coś mi tu śmierdzi...\n Ilość posiadanych kitków: ${pumpkin1[message.author.id].Poopitty}.`,
                        },
                        
                    );
                }
                if(epics == 3)
                {
                    pumpkin1[message.author.id].Devilat += parseInt(2)
                    fs.writeFileSync('././././DB/Pumpkin/Series1/pumpkin1.json', JSON.stringify(pumpkin1))

                    if(pumpkin1[message.author.id].Devilat == 1)
                    {
                        HuntEmbed.addFields(
                            {
                            name: "**NOWY KITKU**",
                            value: "Odkryłeś nowego kitka!",
                            },
                        );
                    } else {
                        pumpkin1[message.author.id].Devilat -= parseInt(1)
                        fs.writeFileSync('././././DB/Pumpkin/Series1/pumpkin1.json', JSON.stringify(pumpkin1))
                    }

                    HuntEmbed.setThumbnail(`https://cdn.discordapp.com/attachments/1133049404400599141/1134485518764232734/Devilat.png`);
                    HuntEmbed.setDescription(`Udało ci się złapać **Devilat**!`)
                    HuntEmbed.addFields(
                        {
                        name: "**Devilat**",
                        value: `Jest bardzo zły, uważaj! D:\n Ilość posiadanych kitków: ${pumpkin1[message.author.id].Devilat}.`,
                        },
                        
                    );
                }
            }
            if (rarity == 4)
            {
                HuntEmbed.setTitle(`<:Legendary_legendarne:933370305974530098> **LEGENDARY!!!**`);
                HuntEmbed.setColor(`Gold`);
                if(legendaries == 1)
                {
                    pumpkin1[message.author.id].BlobCat += parseInt(2)
                    fs.writeFileSync('././././DB/Pumpkin/Series1/pumpkin1.json', JSON.stringify(pumpkin1))

                    if(pumpkin1[message.author.id].BlobCat == 1)
                    {
                        HuntEmbed.addFields(
                            {
                            name: "**NOWY KITKU**",
                            value: "Odkryłeś nowego kitka!",
                            },
                        );
                    } else {
                        pumpkin1[message.author.id].BlobCat -= parseInt(1)
                        fs.writeFileSync('././././DB/Pumpkin/Series1/pumpkin1.json', JSON.stringify(pumpkin1))
                    }

                    HuntEmbed.setThumbnail(`https://cdn.discordapp.com/attachments/1133049404400599141/1134487140022095983/BlobCat.png`);
                    HuntEmbed.setDescription(`Udało ci się złapać :star2:**BlobCat**:star2:!`)
                    HuntEmbed.addFields(
                        {
                        name: ":star2:**BlobCat**:star2:",
                        value: `Unikatowy Kitku!\nCałkiem blobby if u ask me\nIlość posiadanych kitków: ${pumpkin1[message.author.id].BlobCat}.`,
                        },
                        
                    );
                }
                if(legendaries == 2)
                {
                    pumpkin1[message.author.id].Pumpkin += parseInt(2)
                    fs.writeFileSync('././././DB/Pumpkin/Series1/pumpkin1.json', JSON.stringify(pumpkin1))

                    if(pumpkin1[message.author.id].Pumpkin == 1)
                    {
                        HuntEmbed.addFields(
                            {
                            name: "**NOWY KITKU**",
                            value: "Odkryłeś nowego kitka!",
                            },
                        );
                    } else {
                        pumpkin1[message.author.id].Pumpkin -= parseInt(1)
                        fs.writeFileSync('././././DB/Pumpkin/Series1/pumpkin1.json', JSON.stringify(pumpkin1))
                    }

                    HuntEmbed.setThumbnail(`https://cdn.discordapp.com/attachments/1133049404400599141/1134487140768682144/Pumpkin.png`);
                    HuntEmbed.setDescription(`Udało ci się złapać :star2:**Pumpkin**:star2:!`)
                    HuntEmbed.addFields(
                        {
                        name: ":star2:**Pumpkin**:star2:",
                        value: `Unikatowy Kitku!\nKitek który zapoczątkował to wszystko!\n Ilość posiadanych kitków: ${pumpkin1[message.author.id].Pumpkin}.`,
                        },
                        
                    );
                }
                if(legendaries == 3)
                {
                    pumpkin1[message.author.id].Maxwell += parseInt(2)
                    fs.writeFileSync('././././DB/Pumpkin/Series1/pumpkin1.json', JSON.stringify(pumpkin1))

                    if(pumpkin1[message.author.id].Maxwell == 1)
                    {
                        HuntEmbed.addFields(
                            {
                            name: "**NOWY KITKU**",
                            value: "Odkryłeś nowego kitka!",
                            },
                        );
                    } else {
                        pumpkin1[message.author.id].Maxwell -= parseInt(1)
                        fs.writeFileSync('././././DB/Pumpkin/Series1/pumpkin1.json', JSON.stringify(pumpkin1))
                    }

                    HuntEmbed.setThumbnail(`https://cdn.discordapp.com/attachments/1133049404400599141/1134487140319899688/Maxwell.gif`);
                    HuntEmbed.setDescription(`Udało ci się złapać :star2:**Maxwell**:star2:!`)
                    HuntEmbed.addFields(
                        {
                        name: ":star2:**Maxwell**:star2:",
                        value: `Unikatowy Kitku!\nAround the world, around the wooorld!\n Ilość posiadanych kitków: ${pumpkin1[message.author.id].Maxwell}.`,
                        },
                        
                    );
                }
            }
            if (rarity == 5)
            {
                HuntEmbed.setTitle(`<:Secret_sekretne:933370398651854888> **𝒮𝐸𝒞𝑅𝐸𝒯!**`);
                HuntEmbed.setColor(`DarkPurple`);
                if(secrets == 1)
                {
                    pumpkin1[message.author.id].CocainumCat += parseInt(2)
                    fs.writeFileSync('././././DB/Pumpkin/Series1/pumpkin1.json', JSON.stringify(pumpkin1))

                    if(pumpkin1[message.author.id].CocainumCat == 1)
                    {
                        HuntEmbed.addFields(
                            {
                            name: "**NOWY KITKU**",
                            value: "Odkryłeś nowego kitka!",
                            },
                        );
                    } else {
                        pumpkin1[message.author.id].CocainumCat -= parseInt(1)
                        fs.writeFileSync('././././DB/Pumpkin/Series1/pumpkin1.json', JSON.stringify(pumpkin1))
                    }

                    HuntEmbed.setThumbnail(`https://cdn.discordapp.com/attachments/1133049404400599141/1134488436473086013/271421808_3410246472535661_8787840075910100032_n.gif`);
                    HuntEmbed.setDescription(`Udało ci się złapać :sparkles:**CocainumCat**:sparkles:!`)
                    HuntEmbed.addFields(
                        {
                        name: ":sparkles:**CocainumCat**:sparkles:",
                        value: `***SEKRETNY*** Kitku!\nChyba się czegoś nawciągał...\nIlość posiadanych kitków: ${pumpkin1[message.author.id].CocainumCat}.`,
                        },
                        
                    );
                }
                if(secrets == 2)
                {
                    pumpkin1[message.author.id].Czapis += parseInt(2)
                    fs.writeFileSync('././././DB/Pumpkin/Series1/pumpkin1.json', JSON.stringify(pumpkin1))

                    if(pumpkin1[message.author.id].Czapis == 1)
                    {
                        HuntEmbed.addFields(
                            {
                            name: "**NOWY KITKU**",
                            value: "Odkryłeś nowego kitka!",
                            },
                        );
                    } else {
                        pumpkin1[message.author.id].Czapis -= parseInt(1)
                        fs.writeFileSync('././././DB/Pumpkin/Series1/pumpkin1.json', JSON.stringify(pumpkin1))
                    }

                    HuntEmbed.setThumbnail(`https://cdn.discordapp.com/attachments/1133049404400599141/1134488436842188831/received_1051632192282292.jpg`);
                    HuntEmbed.setDescription(`Udało ci się złapać :sparkles:**Czapis**:sparkles:!`)
                    HuntEmbed.addFields(
                        {
                        name: ":sparkles:**Czapis**:sparkles:",
                        value: `***SEKRETNY*** Kitku!\nTo ja :D!\n Ilość posiadanych kitków: ${pumpkin1[message.author.id].Czapis}.`,
                        },
                        
                    );
                }
            }
        }
        
        user[message.author.id].xp += parseInt(exp)
        fs.writeFileSync('././././DB/account.json', JSON.stringify(user))
        
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

        message.reply({ embeds: [HuntEmbed] })

    }
}