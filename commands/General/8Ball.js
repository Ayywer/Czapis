const { EmbedBuilder } = require('discord.js');
const fs = require("fs")
const config = require('../../config.json');

module.exports = {
    config: {
        name: "8ball",
        description: "Have some questions? Want anwsers? 8Ball have it!",
        usage: "{prefix}8ball {question}"
    },
    permissions: ["SendMessages",],
    aliases: [],
    owner: false,
    requestaccount: false,

    run: async (client, message, args, prefix, config,) => {
        function randomIntFromInterval(min, max) { 
            return Math.floor(Math.random() * (max - min + 1) + min)
        }
        const rndInt = randomIntFromInterval(1, 7)

        let question = args[0]
        if(!question)
        {
            message.reply("You didn't gave me a question!")
        } else {
            if(rndInt == 1)
            {
                message.reply("Thinking...")
                .then(msg => {
                setTimeout(() => msg.edit("Yes"), 1000)
                })
                .catch();
            }
            if(rndInt == 2)
            {
                message.reply("Thinking...")
                .then(msg => {
                setTimeout(() => msg.edit("No"), 1000)
                })
                .catch();
            }
            if(rndInt == 3)
            {
                message.reply("Thinking...")
                .then(msg => {
                setTimeout(() => msg.edit("I don't know"), 1000)
                })
                .catch();
            }
            if(rndInt == 4)
            {
                message.reply("Thinking...")
                .then(msg => {
                setTimeout(() => msg.edit("I think yes"), 1000)
                })
                .catch();
            }
            if(rndInt == 5)
            {
                message.reply("Thinking...")
                .then(msg => {
                setTimeout(() => msg.edit("I think not"), 1000)
                })
                .catch();
            }
            if(rndInt == 6)
            {
                message.reply("Thinking...")
                .then(msg => {
                setTimeout(() => msg.edit("Probably yeah"), 1000)
                })
                .catch();
            }
            if(rndInt == 7)
            {
                message.reply("Thinking...")
                .then(msg => {
                setTimeout(() => msg.edit("Probably nah"), 1000)
                })
                .catch();
            }
        }
    }
}