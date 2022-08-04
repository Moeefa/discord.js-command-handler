import Discord from 'discord.js';

export default {
  description: this,
  dmPermission: true,
  async execute(interaction) {
    let m = await interaction.reply({ fetchReply: true, content: "Ping? 🏓" })
    let a = interaction.__("ping.responses")
    interaction.editReply(interaction.__("ping.botLatency", m.createdTimestamp - interaction.createdTimestamp) + `\n` + interaction.__mf(a[Math.floor(Math.random() * a.length)], m.createdTimestamp - interaction.createdTimestamp));
  }
};
