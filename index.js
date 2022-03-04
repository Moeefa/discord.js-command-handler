const Discord = require("discord.js"); // Require discord.js package.
const bot = new Discord.Client(); // Create a new discord.js client, you can set your options object there, such as intents, etc.

const fs = require("fs");
const path = require("path");

require("./modules/functions.js"); // Call the functions.js file.

bot.login(process.env.TOKEN); // Login the bot.
bot.config = require("./config.json"); // Configuration file for the bot.
bot.categories = new Discord.Collection(); // Commands categories.
bot.commands = new Discord.Collection(); // Commands object.
bot.aliases = new Discord.Collection(); // Aliases for commands.
bot.updatePresence = function() { // Set bot activity to random array value.
  let totalSeconds = (bot.uptime / 1000);
  let hours = Math.floor(totalSeconds / 3600);
  var act = [
    ["Discord.js Command Handler by Moeefa!", "PLAYING"],
  ];
  var rnd = act[Math.floor(Math.random() * act.length)];
  bot.user.setActivity(rnd[0], {
    type: rnd[1]
  });
};

// -------------------- Load commands --------------------

fs.readdir("./events/", (err, files) => { // Read every file in "events" folder.
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    bot.on(eventName, event.bind(null, bot));
  });
});

fs.readdir("./commands", (err, folders) => {
  folders.forEach(folder => {
    fs.readdir(`./commands/${folder}`, (err1, files) => {
      if (!files) return;
      files.forEach(file => {
        if (!file || path.extname(file) !== ".js") return;
        let commandName = file.replace(".js", "");
        const response = _loadCommand(`${folder}`, `${commandName}`);
        if (response) console.log(response);
      });
    });
  });
});

function _loadCommand(commandCategory, commandName) {
  try {
    let props = require(`./commands/${commandCategory}/${commandName}`);
    if (!props.run) return console.log(`\x1b[1m\x1b[30m\x1b[41mCommand ${commandName} doesn't have a run function.\x1b[0m`);

    !props.name ? props.name = commandName : void 0;
    !props.category ? props.category = commandCategory : void 0;
    !props.guildOnly && props.guildOnly == undefined ? props.guildOnly = true : void 0;

    bot.categories.set(commandCategory, commandCategory);
    bot.commands.set(commandName, props);
    props.aliases
      ? props.aliases.forEach(alias => bot.aliases.set(alias, props.name))
      : void 0;

    console.log(`Loaded command: \x1b[34m${commandName}\x1b[0m`);
    return false;
  } catch (e) {
    if (process.env.NODE_ENV == "production") {
      return "🥞";
    } else {
      throw e;
    };
  };
};
