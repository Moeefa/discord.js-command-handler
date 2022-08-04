/**
 * The command configurations.
 * @module
 * @name _base
 * @description An example of how to create a command using this handler.
 * @type {Object}
 * @property {string} name - Command name.
 * @property {string} description - Command description, can be an i18n string.
 * @property {string} category - Command category.
 * @property {array} options - Explains how to use the command, can be an i18n string.
 * @property {string||array} defaultMemberPermissions - Permissions flags bits that the member need in the guild before the command is ran.
 * @property {boolean} dmPermission - Wether if command is exclusive to guilds.
 * @property {function} execute - The function that runs the command.
 * @returns {Object} Configurations and execute function of the command.
 */ 
export default {
  /**
   * @function
   * @name execute
   * @description Required to run a command.
   * @param {Object} interaction - The interaction received from user.
   */
  execute(interaction) {}
};
