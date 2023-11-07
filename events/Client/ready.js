const client = require("../../index.js");

module.exports = {
  name: "ready.js"
};

client.once('ready', async () => {
  console.log("Gotowy! :D");
})