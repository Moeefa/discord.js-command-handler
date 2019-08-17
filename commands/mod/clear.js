const { RichEmbed } = require('discord.js');
module.exports.run = async function(client, message, args) {
  if (!args[0]) return client.embed(message.channel, `${message.author}, args[0] needed.`);
  if (isNaN(args[0])) return client.embed(message.channel, '<@' + message.author.id + '> ' + 'Detected args[0] as isNaN (is Not a Number)');
  if (args[0] > 100) return client.embed(message.channel, '<@' + message.author.id + '> ' + 'args[0] is higher than Discord API supports.');
  if (args[0] < 1) return client.embed(message.channel, '<@' + message.author.id + '> ' + 'args[0] is lower than Discord API supports.');
  
  await message.delete()
  
  message.channel.bulkDelete(args[0], true).then(async messages => {
    if (messages.size === 0) {
      client.embed(message.channel, 'You can only bulk delete messages that are under 14 days old.');
      return;
    }
    client.embed(message.channel, `Deleted \`\`${messages.size}/${args[0]}\`\` message(s)!\nCommand requisited by: \`\`${message.author.tag}\`\`.`);
  });
};

module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  botPermNeeded: ["MANAGE_MESSAGES"],
  memberPermNeeded: ["MANAGE_MESSAGES"],
  permLevel: 'User',
};

module.exports.help = {
  name: 'clear',
  category: 'Moderation',
  description: 'Delete messages in the chat.',
  usage: 'clear [Amount]'
};
