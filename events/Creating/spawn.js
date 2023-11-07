const { EmbedBuilder, PermissionsBitField, codeBlock } = require("discord.js");
const fs = require("fs")
const client = require("../../index");
const config = require("../../config.json");
const data = require("../../DB/Pumpkin/spawn.json")
let counter = 0;

function randomIntFromInterval(min, max) { 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

module.exports = {
  name: "Spawn"
};

client.on('messageCreate', async (message) => {
    
    counter += 1;
    let catname = "placeholder"
    if(counter >= randomIntFromInterval(50, 200)){
    let spawndata = JSON.parse(fs.readFileSync('././././DB/Pumpkin/spawn.json'))
    const rndInt = randomIntFromInterval(1, 4)

    let SpawnEmbed = new EmbedBuilder();
    SpawnEmbed.setTitle(`Pojawił się kitku!`);
    SpawnEmbed.setDescription(`Zgadnij nazwe kitka i wpisz |catch <nazwa> aby go złapać!`)

    if(rndInt == 1)
      {
        SpawnEmbed.setImage(`https://cdn.discordapp.com/attachments/1133049404400599141/1133049500110430400/ZwykyKitku.png`);
        catname == "ZwyklyKitku";
      }
      if(rndInt == 2)
      {
        SpawnEmbed.setImage(`https://cdn.discordapp.com/attachments/1133049404400599141/1133049499204468756/CatBoy.png`);
        catname == "CatBoy";
      }
      if(rndInt == 3)
      {
        SpawnEmbed.setImage(`https://cdn.discordapp.com/attachments/1133049404400599141/1133049499560976484/Gato.png`);
        catname == "Gato";
      }
      if(rndInt == 4)
      {
        SpawnEmbed.setImage(`https://cdn.discordapp.com/attachments/1133049404400599141/1133049499871363132/Nerdie.png`);
        catname == "Nerdie";
      }

      message.channel.send({ embeds: [SpawnEmbed] })
      if(!spawndata[message.channel.id])
      {
        spawndata[message.channel.id] = {
          cattospawn: rndInt,
          catname: catname,
        }

        fs.writeFileSync('././././DB/Pumpkin/spawn.json', JSON.stringify(spawndata))
      } else {

        spawndata[message.channel.id].cattospawn = rndInt;
        fs.writeFileSync('././././DB/Pumpkin/spawn.json', JSON.stringify(spawndata))
      }

      counter = 0;

    }
});

