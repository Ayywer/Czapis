const { EmbedBuilder} = require("discord.js");
const fs = require("fs")
const client = require("../../index");
const config = require("../../config.json");
const data = require("../../DB/Pumpkin/spawn.json")

function randomIntFromInterval(min, max) { 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

module.exports = {
  name: "Mention"
};

client.on("messageCreate", (message) => {
  if (message.mentions.has(client.user.id)) {
    const rndInt = randomIntFromInterval(1, 4)
    if(rndInt == 1)
    {
      message.reply("Spierdalaj");
      return
    }
    if(rndInt == 2)
    {
      message.reply("wypierdalaj");
      return
    }
    if(rndInt == 3)
    {
      message.reply("odpierdol się");
      return
    }
    if(rndInt == 4)
    {
      message.reply("kys");
      return
    }
    
  }

});

