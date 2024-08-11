const fs = require("fs");


module.exports = (client, config) => {
  console.log("Loading Command Handler...");

  fs.readdirSync('./commands/').forEach(dir => {
    const commands = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
    for (let file of commands) {

      let pull = require(`../commands/${dir}/${file}`);
      if (pull.config.name) {
        client.commands.set(pull.config.name, pull);
      } else {
        console.log(`I can't load ${file} file, some important values are missing`)
        continue;
      };

    };
  });
};