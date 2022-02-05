module.exports = function(bot, msg, args) {
  bot.user.setActivity("I'm online again!", { type: "STREAMING" });
  console.log("\x1b[32mConnected as " + bot.user.username + "#" + bot.user.discriminator + ".\x1b[0m")
  setTimeout(() => { // After 2 minutes, remove the "online again" activity and change it to a random activity set in index.js.
    bot.updatePresence()
  }, 120000);
  setInterval(() => { // Update activity every 2 minutes.
    bot.updatePresence();
  }, 120000);
}
