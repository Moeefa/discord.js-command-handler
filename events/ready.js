export default (bot, msg, args) => {
  bot.user.setActivity("I'm online again!", { type: "STREAMING" });
  console.log("\x1b[32mConnected as " + bot.user.username + "#" + bot.user.discriminator + ".\x1b[0m")
  setInterval(() => { // Update activity every 2 minutes.
    bot.updatePresence();
  }, 120000);
}
