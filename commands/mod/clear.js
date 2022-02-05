const { MessageEmbed } = require('discord.js');
exports.run = async function(bot, msg, args) {
  if (!args[0]) return msg.reply(`args[0] needed.`);
  if (isNaN(args[0])) return msg.reply('Detected args[0] as isNaN (is Not a Number)');
  if (args[0] > 100) return msg.reply('args[0] is higher than Discord API supports.');
  if (args[0] < 1) return msg.reply('args[0] is lower than Discord API supports.');
  
  await msg.delete()
  
  msg.channel.bulkDelete(args[0], true).then(async messages => {
    if (messages.size == 0) {
      msg.reply('You can only bulk delete messages that are under 14 days old.');
      return;
    };

    msg.reply(`Deleted ${messages.size}/${args[0]} message(s)!\nCommand requisited by: ${message.author.tag}.`);
  });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  botPermNeeded: ["MANAGE_MESSAGES"],
  memberPermNeeded: ["MANAGE_MESSAGES"],
  permLevel: 'User',
};

exports.help = {
  name: 'clear',
  category: 'Moderation',
  description: 'Delete messages in the chat.',
  usage: 'clear [Amount]'
};
