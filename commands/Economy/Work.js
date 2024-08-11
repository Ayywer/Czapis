const { EmbedBuilder } = require('discord.js');
const fs = require("fs")
const config = require('../../config.json');

const update = config.UPDATE

module.exports = {
    config: {
        name: "work",
        description: "You want to earn some money? Use this command!",
        usage: "{prefix}work"
    },
    permissions: ["SendMessages",],
    owner: false,
    aliases: [],
    requestaccount: true,
    run: async (client, message, args, prefix, config,) => {
        let user = JSON.parse(fs.readFileSync('././././DB/account.json'))
        let bank = JSON.parse(fs.readFileSync('././././DB/economy.json'))
        let cooldown = JSON.parse(fs.readFileSync('././././DB/cooldowns.json'))

        function randomIntFromInterval(min, max) { 
            return Math.floor(Math.random() * (max - min + 1) + min)
        }
        const rndInt = randomIntFromInterval(10, 100) //Adjust it as you want!
        const exp = randomIntFromInterval(1, 5) //Adjust it as you want!

        var tokenrandomchance = randomIntFromInterval(1, 100) //Adjust it as you want!
        var randomText = randomIntFromInterval(1, 3) //Adjust it as you want!

        if (tokenrandomchance > 0 && tokenrandomchance < 11)
        {
            randomText = 4;
        }

        let deltaTime = Math.floor((new Date().getTime() - cooldown[message.author.id].workcooldown) / (1000 * 60));
        if (deltaTime < 10) {
            let ErrorEmbed = new EmbedBuilder()
            ErrorEmbed.setTitle("**ZWOLNIJ**");
            ErrorEmbed.setDescription(`You can use ${prefix}work in: ${10 - deltaTime} minutes`);
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
            embed.setDescription(`You earned ${rndInt}$`)
            bank[message.author.id].money += parseInt(rndInt);
            fs.writeFileSync('././././DB/economy.json', JSON.stringify(bank))
            user[message.author.id].xp += parseInt(exp);
            fs.writeFileSync('././././DB/account.json', JSON.stringify(user))
        }
        if(randomText == 2)
        {
            embed.setDescription(`You went cleaning your hometown. You earned ${rndInt}$`)
            bank[message.author.id].money += parseInt(rndInt);
            fs.writeFileSync('././././DB/economy.json', JSON.stringify(bank))
            user[message.author.id].xp += parseInt(exp);
            fs.writeFileSync('././././DB/account.json', JSON.stringify(user))
        }
        if(randomText == 3)
        {
            embed.setDescription(`You helped your fisherman friend with catching big fish. You earned ${rndInt}$`)
            bank[message.author.id].money += parseInt(rndInt);
            fs.writeFileSync('././././DB/economy.json', JSON.stringify(bank))
            user[message.author.id].xp += parseInt(exp);
            fs.writeFileSync('././././DB/account.json', JSON.stringify(user))
        }
        if(randomText == 4)
        {
            embed.setDescription(`You found laying on ground 1:flower_playing_cards:`)
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

            let LvLembed = new EmbedBuilder()
            LvLembed.setTitle("**NEW LEVEL**")
            LvLembed.setDescription(`Congratulations! You are at ${user[message.author.id].level} level!`)
            LvLembed.setColor(`Blurple`)
            message.reply({ embeds: [LvLembed] }); 

            message.reply({ embeds: [LvLembed] }); 
        }

        message.reply({ embeds: [embed] }); 
    }
}