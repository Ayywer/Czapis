const { EmbedBuilder } = require('discord.js');
const fs = require("fs")
const config = require('../../config.json');

const update = config.UPDATE

module.exports = {
    config: {
        name: "cat",
    },
    permissions: ["SendMessages",],
    aliases: [],
    owner: false,
    run: async (client, message, args, prefix, config,) => {

        function randomIntFromInterval(min, max) { 
            return Math.floor(Math.random() * (max - min + 1) + min)
        }

        const rndInt = randomIntFromInterval(1, 8)
        //console.log(rndInt)

        if(rndInt == 1)
        {
		    message.reply(`Wants some cats? Here you go! \nhttps://cdn.discordapp.com/attachments/1034467969167794197/1055890994744274964/2386e3023848e6754b8f0ad9597676a7.jpg`).then(msg=> 
            { msg.react("❤️") }).catch();
            return
        }
        if(rndInt == 2)
        {
		    message.reply(`Wants some cats? Here you go!\nhttps://cdn.discordapp.com/attachments/1034467969167794197/1055890991862775898/4zjvzaqou0o41.webp`).then(msg=> 
            { msg.react("❤️") }).catch();
            return
        }
        if(rndInt == 3)
        {
		    message.reply(`Wants some cats? Here you go!\nhttps://cdn.discordapp.com/attachments/1034467969167794197/1055890994958172211/cute-cat-with-yellow-headband-on.webp`).then(msg=> 
            { msg.react("❤️") }).catch();
            return
        }
        if(rndInt == 4)
        {
            message.reply(`Wants some cats? Here you go!\nhttps://cdn.discordapp.com/attachments/1034467969167794197/1055890995327283200/fetchimage.webp`).then(msg=> 
            { msg.react("❤️") }).catch();
            return
        }
        if(rndInt == 5)
        {
            message.reply(`Wants some cats? Here you go!\nhttps://cdn.discordapp.com/attachments/1034467969167794197/1055890995721535558/maxresdefault.jpg`).then(msg=> 
            { msg.react("❤️") }).catch();
            return
        }
        if(rndInt == 6)
        {
            message.reply(`Wants some cats? Here you go!\nhttps://cdn.discordapp.com/attachments/1023874106078273557/1056577104625545316/received_894772748315809.jpg`).then(msg=> 
            { msg.react("❤️") }).catch();
            return
        }
        if(rndInt == 7)
        {
            message.reply(`Wants some cats? Here you go!\nhttps://cdn.discordapp.com/attachments/1023874106078273557/1056224556668440677/20221224_155900.jpg`).then(msg=> 
            { msg.react("❤️") }).catch();
            return
        }
        if(rndInt == 8)
        {
            message.reply(`Wants some cats? Here you go!\nhttps://cdn.discordapp.com/attachments/1023874106078273557/1055202653627490454/IMG_20220531_154526.jpg`).then(msg=> 
            { msg.react("❤️") }).catch();
            return
        }
    }
}