/**
 * The command configurations.
 * @module
 * @name _base
 * @description An example of how to create a command using this handler.
 * @type {Object}
 * @property {string} name - Command name.
 * @property {string} description - Command description, can be an i18n string.
 * @property {string} category - Command category.
 * @property {array} aliases - Aliases of the command.
 * @property {string} usage - Explains how to use the command, can be an i18n string.
 * @property {array} botPermNeeded - Permissions flags that the bot need in the guild before the command is ran.
 * @property {array} memberPermNeeded - Permissions flags that the member need in the guild before the command is ran.
 * @property {boolean} enabled - Wether command is enabled.
 * @property {boolean} guildOnly - Wether if command is exclusive to guilds.
 * @property {function} run - The function that runs the command.
 * @returns {Object} Configurations of the command.
 */ 
module.exports = {
  /**
   * @function
   * @name run
   * @description Required to run a command.
   * @param {Object} client - The client of your Discord bot.
   * @param {Object} message - The message released from messageCreate event.
   * @param {array} args - The message content splited.
   */
  run(client, message, args) {}
};
