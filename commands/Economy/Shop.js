const { EmbedBuilder } = require('discord.js');
const fs = require("fs")
const config = require('../../config.json');

const update = config.UPDATE

module.exports = {
    config: {
        name: "shop",
        description: "Shows list of all available items to buy in shop!",
        usage: "{prefix}shop"
    },
    permissions: ["SendMessages",],
    aliases: [],
    owner: false,
    requestaccount: true,
    run: async (client, message, args, prefix, config,) => {
        let items = JSON.parse(fs.readFileSync('././././DB/items.json'))
        let item = args[0];

        if(!item)
        {
            let ShopEmbed = new EmbedBuilder();
            ShopEmbed.setTitle("**SHOP**");
            ShopEmbed.setDescription(`**List of every available items to buy!**`);
            
            var ItemAmount = 1 //If you are adding new items - increase this value
            
            for (let x = 1; x <= ItemAmount; x++) {

                ShopEmbed.addFields(
                    {
                    name: `${items[x].name}`,
                    value: `${items[x].desc}`,
                    },
                );
                
            }

            ShopEmbed.setColor(`Blurple`);
            message.channel.send({embeds: [ShopEmbed]})
        } else {
            var itemID 

            if(item.toLowerCase() == "token")
            {
                itemID = 1
                let ItemEmbed = new EmbedBuilder();
                ItemEmbed.setTitle("**SHOP**");
                ItemEmbed.addFields(
                    {
                    name: `${items[itemID].name}`,
                    value: `${items[itemID].desc}`,
                    },
                );
                ShopEmbed.setColor(`Blurple`);
                message.channel.send({embeds: [ItemEmbed]})
            }
        }

    }
}