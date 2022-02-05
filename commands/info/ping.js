const { MessageEmbed } = require('discord.js');

module.exports.run = async (bot, msg, args) => {
  const embed = new MessageEmbed()
  .setDescription('Ping?')
  .setColor(bot.config.primaryColor);
  const pingMsg = await msg.channel.send({ embeds: [embed] });

  embed.setColor(bot.config.primaryColor);
  embed.setDescription(`Pong! 🏓 My ping is ${msg.createdTimestamp - message.createdTimestamp}ms. API's ping is ${Math.round(client.ping)}ms`);
  pingMsg.edit(embed);
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
  usage: 'ping'
};
