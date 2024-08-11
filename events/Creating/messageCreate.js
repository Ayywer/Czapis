const { EmbedBuilder, PermissionsBitField, codeBlock } = require("discord.js");
const fs = require("fs")
const client = require("../../index.js");
const config = require("../../config.json");

module.exports = {
  name: "messageCreate"
};

client.on('messageCreate', async (message) => {
  if (message.channel.type !== 0) return;
  if (message.author.bot) return;

  const prefix = config.PREFIX;
  const update = config.UPDATE;

  if (!message.content.startsWith(prefix)) return;
  if (!message.guild) return;
  if (!message.member) message.member = await message.guild.fetchMember(message);

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const commandName = args.shift().toLowerCase();
  if (commandName.length == 0) return;

  let command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  if (command) {
    if (command.permissions) {
      if (!message.member.permissions.has(PermissionsBitField.resolve(command.permissions || []))) return message.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`You don't have access to that command!`)
            .setColor("Red")
        ]
      })
    };

    if (command.owner, command.owner == true) {
      if (config.Users?.OWNERS) {
        const allowedUsers = []; 

        config.Users.OWNERS.forEach(user => {
         const fetchedUser = message.guild.members.cache.get(user);
          if (!fetchedUser) return allowedUsers.push('*Unknown User#0000*');
          allowedUsers.push(`${fetchedUser.user.tag}`);
        })

        if (!config.Users.OWNERS.some(ID => message.member.id.includes(ID))) return message.reply({
          embeds: [
            new EmbedBuilder()
              .setDescription(`Sorry, that command is only available to owner!`)
              .setColor("Red")
          ]
        })
      }
    };

    if(command.requestaccount, command.requestaccount == true)
    {
      let user = JSON.parse(fs.readFileSync('././././DB/account.json'))
      let bank = JSON.parse(fs.readFileSync('././././DB/economy.json'))
      let cooldown = JSON.parse(fs.readFileSync('././././DB/cooldowns.json'))
      let hotstreaks = JSON.parse(fs.readFileSync('././././DB/hotstreaks.json'))


      //Account creating
      if(!user[message.author.id])
      {
        let ErrorEmbed = new EmbedBuilder();
        ErrorEmbed.setTitle("**Error**");
        ErrorEmbed.setDescription("You don't have an account, I will create it for you!");
        ErrorEmbed.setColor(`Red`);
        
        user[message.author.id] = {
          level: 1,
          xp: 0,
          maxXp: 100,
          update: update,
        }
        
        fs.writeFileSync('././././DB/account.json', JSON.stringify(user))
        
        bank[message.author.id] = {
          money: 100,
          token: 0,
        }
        
        fs.writeFileSync('././././DB/economy.json', JSON.stringify(bank))
        
        cooldown[message.author.id] = {
          workcooldown: 0,
          dailycooldown:0,
        }
        
        fs.writeFileSync('././././DB/cooldowns.json', JSON.stringify(cooldown))
        
        hotstreaks[message.author.id] = {
          cfstreak: 0,
          spinstreak: 0,
        }
      
        fs.writeFileSync('././././DB/hotstreaks.json', JSON.stringify(hotstreaks))
        
        let AccountEmbed = new EmbedBuilder();
        AccountEmbed.setTitle("**Account**");
        AccountEmbed.setDescription("Account has been created successfully");
        AccountEmbed.setColor(`Blurple`);
        
        message.channel.send({ embeds: [ErrorEmbed] })
        .then(msg => {
          setTimeout(() => msg.edit({ embeds: [AccountEmbed] }), 500)
        })
        .catch();
      }

      //Account Update
      if(user[message.author.id].update < update)
      {
        let ErrorEmbed = new EmbedBuilder();
        ErrorEmbed.setTitle("**Error**");
        ErrorEmbed.setDescription("Your account is not updated, updating •••");
        ErrorEmbed.setColor(`Red`);

        //Add update content here!

        let UpdateEmbed = new EmbedBuilder();
        UpdateEmbed.setTitle("**Aktualizacja**");
        UpdateEmbed.setDescription("Your account has been updated successfully!");
        UpdateEmbed.setColor(`Blurple`);

        message.reply({ embeds: [ErrorEmbed] })
        .then(msg => {
            setTimeout(() => msg.edit({ embeds: [UpdateEmbed] }), 1000)
        })
        .catch();
        
      }
    }

    try {
      command.run(client, message, args, prefix, config,);
    } catch (error) {
      console.error(error);
    };
  }
});