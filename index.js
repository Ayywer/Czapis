const { Client, Partials, Collection, GatewayIntentBits } = require('discord.js');
const config = require('./config.json');
const { connect, mongoose } = require('mongoose')

mongoose.set('strictQuery', false);

const prefix = config.PREFIX;
const token = config.TOKEN
const mango = config.MONGO;

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
    presence: {
      activities: [{
        name: "Powrót! Prefix: |",
        type: 2
      }],
      status: 'online'
  
      /*
      online
      idle
      dnd
      invisible
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
connect(mango)



.catch((err) => {
    console.error("[CRASH] Coś poszło nie tak podczas połączania się :/");
    console.error("[CRASH] Błąd z Discord API:" + err);
    return process.exit();
  });

process.on('unhandledRejection', async (err, promise) => {
console.error(`[ANTI-CRASH] Odrzuciłem: ${err}`.red);
console.error(promise);



});