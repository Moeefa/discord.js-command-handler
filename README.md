## Discord.js Command Handler
##### Introduction
This command handler use Discord.js v13 and is free to use to everyone.

You can take a look at Discord.js docs: https://discord.js.org/ (if you're from the future and use a newer version of Discord.js, like v14, please be aware that there might be some issues and you must revert to v13 or update the handler by yourself).

##### Configure the handler
You can modify ``config.json`` to modify the color of embeds, the ID of owner of the bot and the commands prefix.

##### How to create commands
In the commands folder, you can create another folder that'll be assigned as your command category automatically and in there, you can
create a file with your command.
<br/>The only thing required in the file is the run function exported, the config and help objects
are automatically created with default values, you can change default values in ``index.js``.

##### Risky commands? It's okay, only you'll have access to it
To create a command that only you can use, so you don't run the risk to someone access your secrets commands, create a folder named "Developers" then insert your command file in there.
