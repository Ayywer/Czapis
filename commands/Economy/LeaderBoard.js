const { EmbedBuilder } = require('discord.js');
const fs = require("fs")
const config = require('../../config.json');

const update = config.UPDATE

module.exports = {
    config: {
        name: "leaderboard",
        description: "Shows leaderboard. Whos the richest?",
        usage: "{prefix}leaderboard"
    },
    permissions: ["SendMessages",],
    aliases: [],
    owner: false,
    requestaccount: true,
    run: async (client, message, args, prefix, config,) => {
        let bank = JSON.parse(fs.readFileSync('././././DB/economy.json'))
        
        var Sorted = Object.entries(bank).sort((a, b) => b[1].bank - a[1].bank);
        if (Sorted.length > 10) Sorted = Sorted.slice(0, 10);

        var place = Sorted.length - 1

        var LBString = "";
        Sorted.forEach(user => {
            LBString += `${place}. ${client.users.cache.find(u => u.id == user[0])} - ${user[1].money}$\n`;
        });

        var LBEmbed = new EmbedBuilder();
        LBEmbed.setTitle("**LEADERBOARD**");
        LBEmbed.setDescription(LBString);
        LBEmbed.setColor(`Blurple`);
    
        message.channel.send({ embeds: [LBEmbed] })

    }
}