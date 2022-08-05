## Discord.js Command Handler
##### Introduction
This command handler use slash commands from Discord.js version 14 and is free to use to everyone.

You can take a look at Discord.js docs: https://discord.js.org/ (if you're from the future and use a newer version of Discord.js, like v15, please be aware that there might be some issues and you must revert to v14 or update the handler by yourself).

##### Configure the handler
You can modify ``config.js`` to modify the color of embeds, the ID of owner of the bot and the commands prefix.

To login your bot, in the line 17 of ``index.js`` change the ``process.env.TOKEN`` to your token.
```js
bot.login(process.env.TOKEN);
```
<br/>The ``process.env`` lets you access your ``.env`` file, that in most of hosts is your secret environment, that means that only you can see it or modify the value of it.
<br/>It's recommended to use a secret environment if your project is public or shared, since if someone has access to your bot token, the person can do everything with your bot.

##### Command configuration
An example of how to configure your command:
```js
export default {
  type: Number, // Type of command, defaults to 1.
  name: String, // The name of your command.
  nameLocalizations: Object, // The localizations for the command name.
  description: String, // Description of command.
  descriptionLocalizations: Object, // The localizations for the command description.
  category: String, // The category.
  options: Array, // Usage of the command.
  dmPermission: Boolean, // Wether if the command can be ran from DM.
  defaultMemberPermissions: Array || String, // The permission the member need to run command.
  execute(interaction) {} // The function to run your command.
};
```
You can import the command types using the following:
```js
import { ApplicationCommandType } from "discord.js";
```

You can also take a look at: [ApplicationCommandData](https://discord.js.org/#/docs/discord.js/main/typedef/ApplicationCommandData) to see all avaible configurations.

##### How to create commands
In the commands folder, you can create another folder that'll be assigned as your command category automatically and in there, you can
create a file with your command.
<br/>The only thing required in the file is the run function exported. 
```js
export default {
  // Put your commands config above.
  execute(interaction) {
    // Your command.
  }
};
```

##### Risky commands? It's okay, only you'll have access to run it
To create a command that only you can use, so you don't run the risk to someone access your secrets commands, create a folder named "dev" then insert your command file in there.
<br/>You can change which folder is it from the ``config.js`` in ``DevFolder``.
<br/>In order to it works, your ID in ``OwnerID`` needs to be correct.

##### Do the member or bot need permission to run the command?
You can set a ``defaultMemberPermissions`` string or array in your exported config object at your command file.
E.g.:
```js
export default {
  defaultMemberPermissions: PermissionFlagsBits.Administrator // The permission the member need to run the command in the guild it was ran.
};
```
These strings/array need to be a string of permission flag bits, you can checkout the avaibles permissions flags here: [PermissionFlagsBits](https://discord-api-types.dev/api/discord-api-types-payloads/common#PermissionFlagsBits)

You can import these using the following:
```js
import { PermissionFlagsBits } from "discord.js";
```
The permission will be checked before the command run.

