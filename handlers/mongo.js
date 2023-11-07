const fs = require("fs");
const { connection } = require("mongoose")


module.exports = (client) => {
  console.log("Ładuje Mongo handler");
  
  fs.readdirSync('./events/').forEach(dir => {
	const mongo = fs.readdirSync(`./events/${dir}/`).filter(file => file.endsWith('.js'));
    for (let file of mongo) {
        const event = requre(`./events/${folder}/${file}`)
        if(event.once) {
            connection.once (event.name, (...args) => 
                event.execute(...args, client))
        } else {
            connection.on (event.name, (...args) => 
                event.execute(...args, client))
        }
     
      
	}

	});

    

}