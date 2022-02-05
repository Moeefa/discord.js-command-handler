const Discord = require('discord.js'), // Require discord.js package.
      bot = new Discord.Client(); // Create a new discord.js client, you can set your options object there, such as intents, etc.

bot.config = require("./config.json"); // Configuration file for the bot.
bot.categories = new Discord.Collection(); // Commands categories.
bot.commands = new Discord.Collection(); // Commands object.
bot.aliases = new Discord.Collection(); // Aliases for commands.
bot.updatePresence = function updatePresence() { // Set bot activity to random array value.
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
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    bot.on(eventName, event.bind(null, bot));
  });
});

klaw("./commands/").on("data", item => { // Read every file in "commands" folder.
  const cmdFile = path.parse(item.path);
  if (!cmdFile.ext || cmdFile.ext !== ".js") return;
  let commandName = cmdFile.name.split(".")[0];
  const response = _loadCommand(cmdFile.dir, `${commandName}`);
  if (response) console.log(response);
});

bot.login(process.env.TOKEN); // Login the bot.

function _loadCommand(commandPath, commandName) { // Function to load commands.
  try {
    console.log(`Loading command: \x1b[34m${commandName}\x1b[0m`);
    const props = require(`${commandPath}${path.sep}${commandName}`);

    !props.help
      ? (props.help = {
          category: commandPath.slice(
            commandPath.lastIndexOf("/") + 1,
            commandPath.length
          ),
          name: commandName
        })
      : (props.help.category = commandPath.slice(
          commandPath.lastIndexOf("/") + 1,
          commandPath.length
        )),
      (props.help.name = commandName);
    !props.conf
      ? (props.conf = {
          guildOnly: true
        })
      : (props.conf.guildOnly == undefined)
      ? (props.conf.guildOnly = true)
      : void 0;

    bot.categories.set(
      commandPath.slice(commandPath.lastIndexOf("/") + 1, commandPath.length),
      commandPath.slice(commandPath.lastIndexOf("/") + 1, commandPath.length)
    );
    bot.commands.set(commandName, props);
    props.conf && props.conf.aliases
      ? props.conf.aliases.forEach(alias => {
          bot.aliases.set(alias, props.help.name);
        })
      : void 0;

    return false;
  } catch (e) {
    throw e;
  }
}
