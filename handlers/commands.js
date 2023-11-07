const fs = require("fs");


module.exports = (client, config) => {
  console.log("Ładuje Command Handler");

  fs.readdirSync('./commands/').forEach(dir => {
    const commands = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
    for (let file of commands) {

      let pull = require(`../commands/${dir}/${file}`);
      if (pull.config.name) {
        client.commands.set(pull.config.name, pull);
      } else {
        console.log(`Nie mogłem załadować ${file}, brakuje pewnych wartości`)
        continue;
      };

    };
  });
};