const fs = require("fs");

module.exports = (client) => {
  console.log("Loading Event Handler");
  
  fs.readdirSync('./events/').forEach(dir => {
		const events = fs.readdirSync(`./events/${dir}/`).filter(file => file.endsWith('.js'));
		for (let file of events) {
      
			let pull = require(`../events/${dir}/${file}`);
			if (pull.name) {
				client.events.set(pull.name, pull);
			} else {
				console.log(`I can't load ${file} file, some important values are missing`)
				continue;
			}
      
		}
	});
}