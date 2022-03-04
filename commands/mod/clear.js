const { MessageEmbed } = require('discord.js');
module.exports = {
  name: 'clear',
  category: 'Moderation',
  description: 'Delete messages in the chat.',
  usage: 'clear [Amount]',
  clientPerm: ["MANAGE_MESSAGES"],
  memberPerm: ["MANAGE_MESSAGES"],
  async run(bot, msg, args) {
    if (!args[0]) return msg.reply(`args[0] needed.`);
    if (isNaN(args[0])) return msg.reply('Detected args[0] as isNaN (is Not a Number)');
    if (args[0] > 100) return msg.reply('args[0] is higher than Discord API supports.');
    if (args[0] < 1) return msg.reply('args[0] is lower than Discord API supports.');
  
    await msg.delete()
  
    msg.channel.bulkDelete(args[0], true).then(async messages => {
      if (messages.size == 0) return msg.reply('You can only bulk delete messages that are under 14 days old.');

      msg.reply(`Deleted ${messages.size}/${args[0]} message(s)!\nCommand requisited by: ${message.author.tag}.`);
    });
  }
};
