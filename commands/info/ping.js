const { RichEmbed } = require('discord.js');

module.exports.run = async (client, message, args) => {
  const embed = new RichEmbed()
  .setDescription('Ping?')
  .setColor('RANDOM')
  const msg = await message.channel.send(embed)
   embed.setColor('RANDOM')
   embed.setDescription(`Pong! 🏓 Meu ping é de ${msg.createdTimestamp - message.createdTimestamp}ms. Ping da API é de ${Math.round(client.ping)}ms`)
   await msg.edit(embed)
};

module.exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  botPermNeeded: [],
  memberPermNeeded: [],
  permLevel: 'User'
};

module.exports.help = {
  name: 'ping',
  category: 'Informations',
  description: 'Sends bot ping.',
  usage: 'ping',
};
