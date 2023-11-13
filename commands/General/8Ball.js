const { EmbedBuilder } = require('discord.js');
const fs = require("fs")
const config = require('../../config.json');

const update = config.UPDATE

module.exports = {
    config: {
        name: "8ball",
    },
    permissions: ["SendMessages",],
    aliases: ['kula','pytanie'],
    owner: false,
    run: async (client, message, args, prefix, config,) => {
        function randomIntFromInterval(min, max) { 
            return Math.floor(Math.random() * (max - min + 1) + min)
        }
        const rndInt = randomIntFromInterval(1, 7)

        let pytanie = args[0]
        if(!pytanie)
        {
            message.reply("Nie zadałeś mi pytania")
        } else {
            if(rndInt == 1)
            {
                message.reply("Myślę...")
                .then(msg => {
                setTimeout(() => msg.edit("Tak"), 1000)
                })
                .catch();
            }
            if(rndInt == 2)
            {
                message.reply("Myślę...")
                .then(msg => {
                setTimeout(() => msg.edit("Nie"), 1000)
                })
                .catch();
            }
            if(rndInt == 3)
            {
                message.reply("Myślę...")
                .then(msg => {
                setTimeout(() => msg.edit("Nie wiem"), 1000)
                })
                .catch();
            }
            if(rndInt == 4)
            {
                message.reply("Myślę...")
                .then(msg => {
                setTimeout(() => msg.edit("Chyba tak"), 1000)
                })
                .catch();
            }
            if(rndInt == 5)
            {
                message.reply("Myślę...")
                .then(msg => {
                setTimeout(() => msg.edit("Chyba nie"), 1000)
                })
                .catch();
            }
            if(rndInt == 6)
            {
                message.reply("Myślę...")
                .then(msg => {
                setTimeout(() => msg.edit("Raczej tak"), 1000)
                })
                .catch();
            }
            if(rndInt == 7)
            {
                message.reply("Myślę...")
                .then(msg => {
                setTimeout(() => msg.edit("Raczej nie"), 1000)
                })
                .catch();
            }
        }
    }
}