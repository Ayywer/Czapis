const { EmbedBuilder } = require('discord.js');
const fs = require("fs")
const config = require('../../config.json');

const update = config.UPDATE

module.exports = {
    config: {
        name: "hug",
    },
    permissions: ["SendMessages",],
    aliases: [],
    owner: false,
    run: async (client, message, args, prefix, config,) => {

        const inputMember = args[0]    
        const member = message.mentions.members.first();

		if (!inputMember) {
            message.reply('Nie podano użytkownika')
            return
        }
        if (!member) {
            message.reply("Nie znalazłem takiego użytkownika");
            return
        }
        if(member.id == message.author.id) {
            message.reply(`Sorki, ale wydaje mi się, że nie możesz tego zrobić ;x`)
            return 
        }
        if(member.id == "1034463864298950736") {
            message.channel.send(`${message.author.username} pocałował mnie OwO!\nhttps://tenor.com/view/kitten-kiss-cute-pet-cat-gif-20374133`)
            return 
        }

        message.channel.send(`${message.author.username} pocałował ${member}!\nhttps://tenor.com/view/kitten-kiss-cute-pet-cat-gif-20374133`)

    }
}