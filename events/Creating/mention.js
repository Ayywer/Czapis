const { EmbedBuilder} = require("discord.js");
const fs = require("fs")
const client = require("../../index");
const config = require("../../config.json");

function randomIntFromInterval(min, max) { 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

module.exports = {
  name: "Mention"
};

client.on("messageCreate", (message) => {
  if (message.mentions.has(client.user.id)) {
    if (message.author.bot) return;

    //bot responds if mentioned!
    
  }

});

