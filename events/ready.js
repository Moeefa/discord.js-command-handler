import { ActivityType } from "discord.js";
import { loadCommands } from "../modules/functions.js";

export default (bot) => {
  bot.user.setActivity("Estou online de novo!", { type: ActivityType.Streaming });
  console.log("\x1b[32mConnected as " + bot.user.username + "#" + bot.user.discriminator + ".\x1b[0m")
  
  loadCommands(bot);
  
  setInterval(() => {
    bot.updatePresence();
  }, 120000);
};
