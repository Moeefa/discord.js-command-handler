## Discord.js Command Handler
##### Introduction
This command handler use Discord.js v13 and is free to use to everyone.

You can take a look at Discord.js docs: https://discord.js.org/ (if you're from the future and use a newer version of Discord.js, like v14, please be aware that there might be some issues and you must revert to v13 or update the handler by yourself).

##### Configure the handler
You can modify ``config.json`` to modify the color of embeds, the ID of owner of the bot and the commands prefix.

To login your bot, in the line 41 of ``index.js`` change the ``process.env.TOKEN`` to your token.
```js
client.login(process.env.TOKEN);
```
<br/>The ``process.env`` lets you access your ``.env`` file, that in most of hosts is your secret environment, that means that only you can see it or modify the value of it.
<br/>It's recommended to use a secret environment if your project is public or shared, since if someone has access to your bot token, the person can do everything with your bot.

##### How to create commands
In the commands folder, you can create another folder that'll be assigned as your command category automatically and in there, you can
create a file with your command.
<br/>The only thing required in the file is the run function exported. 
```js
exports.run = (bot, msg, args) => {
  // Your command.
};
```
The config and help objects
are automatically created with default values, you can change default values in ``index.js``.

##### Risky commands? It's okay, only you'll have access to run it
To create a command that only you can use, so you don't run the risk to someone access your secrets commands, create a folder named "dev" then insert your command file in there.
<br/>You can change which folder is it from the ``config.json`` in ``devFolder``.
<br/>In order to it works, your ID in ``ownerID`` needs to be correct.

##### Do the member or bot need permission to run the command?
You can set a ``memberPermissionNeeded`` or ``botPermissionNeeded`` array in your exported config object at your command file.
E.g.:
```js
exports.conf = {
  memberPermNeeded: ["ADMINISTRATOR"], // The permission the member need to run the command in the guild it was ran.
  botPermNeeded: ["MANAGE_CHANNELS"] // The permission your bot need to run the command in the guild it was ran.
};
```
These strings need to be a permission flag, you can checkout the avaibles permissions flags here:
https://discord.js.org/#/docs/discord.js/stable/class/Permissions?scrollTo=s-FLAGS

The permission will be checked before the command run.
