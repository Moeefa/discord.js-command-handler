const Discord = require('discord.js'),
      client = new Discord.Client();

process.setMaxListeners(0);
client.config = require("./config.js");
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

require('child_process').execFile('find', [ 'commands/' ], function(err, stdout, stderr) {
  var files = stdout.split('\n');
  if (err) {
    if (err.message === "ENOENT: no such file or directory, scandir './commands/'") {
      return console.error(`I didn't found commands directory. 🙇`);
    } else {
      return console.error(`Something wen't wrong: ${err}`);
    };
  };

  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if (jsfile.length <= 0) return console.error(`I didn't found any command. 🙇`);
  
  console.log(`Loading ${jsfile.length} commands.`);
  var loadeds = 0;
  jsfile.forEach((f, i) => {
    try {
      let props = require(`./${f}`);
      if (!props.run) return console.error(`I couldn't find module.exports.run or exports.run in: ${f}`);
      console.log(`Loading command: ${props.help.name}.`);
      client.commands.set(props.help.name, props);
      props.conf.aliases.forEach(alias => {
        client.aliases.set(alias, props.help.name);
      });
    } catch (err) {
      if (err.message === "Cannot read property 'name' of undefined") {
        return console.error(`I couldn't find module.exports.help or exports.help in: ${f}`);
      } else if (err.message === "Cannot read property 'aliases' of undefined") {
        return console.error(`I couldn't find module.exports.conf or exports.conf in: ${f}`);
      } else {
        return console.error(`Something went wrong with the command ${f}: ${err}`);
      };
    };
  });
  console.log(`${client.commands.array().length} loaded commands.`)
  
  client.levelCache = {};
  for (let a = 0; a < client.config.permLevels.length; a++) {
    const b = client.config.permLevels[a];
    client.levelCache[b.name] = b.level;
  };
});

client.on("message", async message => {
  client.lang = require(`./langs/en-US.json`);
  require("./modules/functions.js")(client, message);
  if (message.author.bot) return;
  
  let command = message.content.split(" ")[0];
  let args = message.content.split(" ").slice(1);
  let prefix = client.config.prefix;
  
  if (0 !== message.content.indexOf(prefix)) return;
    
  let cmd = client.commands.get(command.slice(prefix.length)) || client.commands.get(client.aliases.get(command.slice(prefix.length)));
  if (cmd) {
    if (!message.guild && cmd.conf.guildOnly) return client.embed(message.channel, "You can't use this command in DMs. Use it in a server.");
    const conf = client.config.defaultSettings;
    if (client.permlevel(message) < client.levelCache[cmd.conf.permLevel]) return true === conf.systemNotice ? client.embed(message.channel, `<@${message.author.id}> You don't have permission to use this command.`) : void 0;
    if (cmd.conf.botPermNeeded && cmd.conf.botPermNeeded.length >= 1) {
      for (var i in cmd.conf.botPermNeeded) {
        if (typeof cmd.conf.botPermNeeded[i] !== "string") continue;
        if (!message.guild.me.hasPermission(cmd.conf.botPermNeeded[i])) {
          client.embed(message.channel, client.config.botPermNeededMessage.replace(/<\/author\/>/g, message.author).replace(/<\/perm\/>/g, (client.lang && client.lang["PERMISSIONS_" + cmd.conf.botPermNeeded[i]]) ? client.lang["PERMISSIONS_" + cmd.conf.botPermNeeded[i]] : cmd.conf.botPermNeeded[i]));
          return;
        }
      }
    }
    if (cmd.conf.memberPermNeeded && cmd.conf.memberPermNeeded.length >= 1) {
      for (var i in cmd.conf.memberPermNeeded) {
        if (typeof cmd.conf.memberPermNeeded[i] !== "string") continue;
        if (!message.member.hasPermission(cmd.conf.memberPermNeeded[i])) {
          client.embed(message.channel, client.config.memberPermNeededMessage.replace(/<\/author\/>/g, message.author).replace(/<\/perm\/>/g, (client.lang && client.lang["PERMISSIONS_" + cmd.conf.memberPermNeeded[i]]) ? client.lang["PERMISSIONS_" + cmd.conf.memberPermNeeded[i]] : cmd.conf.memberPermNeeded[i]));
          return;
        }
      }
    }
    
    try {
      cmd.run(client, message, args);
    } catch (err) {
      if (client.config.errors.warn_user === true) {
        const embed = new Discord.RichEmbed().setDescription(`Something went wrong with \`\`${cmd.help.name}\`\`: \`\`\`xlsx\n${err.message}\n\`\`\``).setColor("RANDOM");
        message.channel.send(embed);
      };
      if (client.config.errors.log_channel !== "0") {
        const _embed_error = new Discord.RichEmbed().setTitle(`Something went wrong on try to run this command: *${cmd.help.name}*.`).addField(err.name, `\`\`\`xlsx\n${err.message}\n\`\`\`\nError line: \`\`${client.config.findErrorSource(err)}\`\``).addBlankField(true).setColor('RANDOM').setTimestamp();
        client.channels.get(client.config.errors.log_channel).send(_embed_error);
      };
      if (client.config.errors.warn_console === true) {
        console.error(`Something went wrong with ${cmd.help.name}: ${err}\n Error line: ${client.config.findErrorSource(err)}`);
      };
    };
    let k = `User: ${message.author.tag}\nUser's ID: ${message.author.id}\nPermission level: ${client.permlevel(message)}\nExecuted command: ${cmd.help.name}`;
    message.guild && (k += `\nServer: ${message.guild.name}\nChannel: ${message.channel.name}`), console.log(`\n${k}\n`);
  };
})
