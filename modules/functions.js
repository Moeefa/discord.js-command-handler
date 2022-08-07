import { readdirSync, lstatSync } from "fs";

export const loadCommands = async (bot) => {
  let allCmds = [];
  for await (const folder of readdirSync("./commands/")) {
    if (!lstatSync(`./commands/${folder}`).isDirectory()) return;
    for await (const file of readdirSync(`./commands/${folder}/`)) {
      let props = await import(`../commands/${folder}/${file}`);

      // Default command values
      !props.default.name ? props.default.name = file.replace(".js", "") : void 0;
      !props.default.description ? props.default.description = "No description." : void 0;
      !props.default.category ? props.default.category = folder : void 0;
      !props.default.dmPermission ? props.default.dmPermission = false : void 0;

      bot.commands.set(props.default.name, props.default);
      (props.default.category == bot.config.devFolder) ? bot.guilds.cache.get(bot.config.ownerGuildID).commands.create(props.default) : allCmds.push(props.default);
      console.log(`Loaded command: \x1b[93m${props.default.name}\x1b[0m`);
    };
  };

  bot.application.commands.set(allCmds);
};
