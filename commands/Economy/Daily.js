const { EmbedBuilder } = require('discord.js');
const fs = require("fs")
const config = require('../../config.json');

const update = config.UPDATE

module.exports = {
    config: {
        name: "daily",
        description: "Your daily rewards! You can use this command one per day",
        usage: "{prefix}daily"
    },
    permissions: ["SendMessages",],
    aliases: [],
    owner: false,
    requestaccount: true,
    run: async (client, message, args, prefix, config,) => {
        let user = JSON.parse(fs.readFileSync('././././DB/account.json'))
        let bank = JSON.parse(fs.readFileSync('././././DB/economy.json'))
        let cooldown = JSON.parse(fs.readFileSync('././././DB/cooldowns.json'))

        if (Math.floor(new Date().getTime() - cooldown[message.author.id].dailycooldown) / (1000 * 60 * 60 * 24) < 1) {
            let ErrorEmbed = new EmbedBuilder()
            ErrorEmbed.setTitle("**DAILY**");
            ErrorEmbed.setDescription(`Your daily reward has been collected. Come back tomorrow!`);
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
        embed.setDescription(`You recived 100$, 10:flower_playing_cards: i 10<:Exp:931275538046267453> xp! Come back tomorrow!`)

        if(user[message.author.id].maxXp <= user[message.author.id].xp)
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
        }

        message.reply({ embeds: [embed] })
    }
}