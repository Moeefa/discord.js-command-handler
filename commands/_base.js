module.exports = {
  enabled: Boolean, // Default: true.
  guildOnly: Boolean, // Default: true.
  name: String, // Default: file name.
  aliases: Array, // Doesn't have default value.
  description: String, // Doesn't have default value.
  usage: String, // Doesn't have default value.
  category: String, // Default: folder name.
  clientPerm: Array, // Doesn't have default value.
  memberPerm: Array, // Doesn't have default value.
  run: Function // Doesn't have default value and it's required.
}
