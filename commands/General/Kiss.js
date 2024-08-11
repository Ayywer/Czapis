const { EmbedBuilder } = require('discord.js');
const fs = require("fs")
const config = require('../../config.json');

const update = config.UPDATE

module.exports = {
    config: {
        name: "kiss",
    },
    permissions: ["SendMessages",],
    aliases: [],
    owner: false,
    run: async (client, message, args, prefix, config,) => {

        const inputMember = args[0]    
        const member = message.mentions.members.first();

		if (!inputMember) {
            message.reply('You didnt provide user')
            return
        }
        if (!member) {
            message.reply("This user doesn't exist ");
            return
        }
        if(member.id == message.author.id) {
            message.reply(`Sorry, I can't do that`)
            return 
        }
        if(member.id == "1034463864298950736") {
            message.channel.send(`${message.author.username} kissed me OwO!\nhttps://tenor.com/view/kitten-kiss-cute-pet-cat-gif-20374133`)
            return 
        }

        message.channel.send(`${message.author.username} kissed ${member}!\nhttps://tenor.com/view/kitten-kiss-cute-pet-cat-gif-20374133`)

    }
}