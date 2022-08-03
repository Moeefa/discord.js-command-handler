import path from "path";
import { default as config } from "../config.js";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (bot, interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const { commandName, options } = interaction;
  let command = bot.commands.get(commandName);
  if (!command) return;

  interaction.config = config;
    
  if (command.category == interaction.config.devFolder && interaction.user.id !== interaction.config.ownerID) return interaction.reply({ ephemeral: true, content: "You don't have access to this command." });
  
  command.execute(interaction);
};