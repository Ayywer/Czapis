const { Client, Partials, Collection, GatewayIntentBits } = require('discord.js');
const config = require('./config.json');

const prefix = config.PREFIX;
const token = config.TOKEN

const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.GuildPresences,
      GatewayIntentBits.GuildMessageReactions,
      GatewayIntentBits.DirectMessages,
      GatewayIntentBits.MessageContent
    ],
    partials: [
      Partials.Channel,
      Partials.Message,
      Partials.User,
      Partials.GuildMember,
      Partials.Reaction
    ],

    //Bot activity on discord!
    presence: {
      activities: [{
        name: "I'm Online",
        type: 2
      }],
      status: 'online'
  
      /*
      online
      idle
      dnd
      invisible
      */

      /*
      0 - PLAYING
      1 - STREAMING
      2 - LISTENING
      3 - WATCHING
      4 - CUSTOM
      5 - COMPETING

      */
    }
  });

client.commands = new Collection();
client.events = new Collection();

module.exports = client;

["commands", "events"].forEach((file) => {
  require(`./handlers/${file}`)(client, config);
});

// Login to the bot:
client.login(token)

.catch((err) => {
    console.error("[CRASH] Something went wrong with connecting :/");
    console.error("[CRASH] Discord API Error:" + err);
    return process.exit();
  });

process.on('unhandledRejection', async (err, promise) => {
console.error(`[ANTI-CRASH] rejected: ${err}`.red);
console.error(promise);



});