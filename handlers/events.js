const fs = require("fs");

module.exports = (client) => {
  console.log("Ładuje Event Handler");
  
  fs.readdirSync('./events/').forEach(dir => {
		const events = fs.readdirSync(`./events/${dir}/`).filter(file => file.endsWith('.js'));
		for (let file of events) {
      
			let pull = require(`../events/${dir}/${file}`);
			if (pull.name) {
				client.events.set(pull.name, pull);
			} else {
				console.log(`Nie mogłem załadować ${file}. Brakuje pewnych wartości`)
				continue;
			}
      
		}
	});
}