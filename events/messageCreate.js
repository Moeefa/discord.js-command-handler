module.exports = async function(bot, msg) {
  if (msg.author.bot) return;
  if (msg.author.id === bot.user.id) return;
  if (msg.content.indexOf(bot.config.prefix) !== 0) return;

  const args = msg.content.slice(bot.config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
  const cmd = bot.commands.get(command) || bot.commands.get(bot.aliases.get(command));
  
  if (!cmd) return;
  if (cmd.help.category == "Developers" && msg.author.id !== bot.config.ownerID) return msg.reply("You're not my owner.")
  if (cmd.conf && cmd.conf.enabled == false) return;
  if (!msg.guild && cmd.conf && cmd.conf.guildOnly == true) return msg.reply("You can only use this command in guilds!");
  
  // Check if the bot has permission to run the command.
  if (cmd.conf && cmd.conf.botPermNeeded && cmd.conf.botPermNeeded.length >= 1) {
    for (var i in cmd.conf.botPermNeeded) {
      if (typeof cmd.conf.botPermNeeded[i] !== "string") continue;
      if (!msg.guild.me.permissions.has(cmd.conf.botPermNeeded[i])) {
        msg.reply(`I don't have the ${cmd.conf.botPermNeeded[i]} permission to run this command.`);
        return;
      };
    };
  };

  // Check if member that run the command has permission to it.
  if (cmd.conf && cmd.conf.memberPermNeeded && cmd.conf.memberPermNeeded.length >= 1) {
    for (var i in cmd.conf.memberPermNeeded) {
      if (typeof cmd.conf.memberPermNeeded[i] !== "string") continue;
      if (!msg.member.permissions.has(cmd.conf.memberPermNeeded[i])) {
        msg.reply(`You don't have the ${cmd.conf.memberPermNeeded[i]} permission to run this command.`);
        return;
      };
    };
  };
                                 
  try {
    cmd.run(bot, msg, args, embed)
  } catch (err) {
    throw err;
  };
};
