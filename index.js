import { Collection, Client, GatewayIntentBits, Partials, ActivityType } from "discord.js";
import { default as config } from "./config.js";
import fs from "fs";

const bot = new Client({ 
  autoReconnect: true,
  intents: [
    GatewayIntentBits.Guilds, 
    GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.GuildMembers, 
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [Partials.Channel]
});

bot.login(process.env.TOKEN);
bot.config = config;
bot.categories = new Collection();
bot.commands = new Collection();
bot.updatePresence = () => {
  let totalSeconds = (bot.uptime / 1000);
  let hours = Math.floor(totalSeconds / 3600);
  var act = [
    ["Eu ainda estou em testes!", ActivityType.Playing],
    [`Estou online faz ${hours} horas!`, ActivityType.Playing],
    [`Quer deletar os seus dados do meu banco de dados? Você pode fazer isso usando /unregister`, ActivityType.Playing]
  ];
  var rnd = act[Math.floor(Math.random() * act.length)];
  bot.user.setActivity("/help | " + rnd[0], {
    type: rnd[1]
  });
};

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(async file => {
    const event = await import(`./events/${file}`);
    let eventName = file.split(".")[0];
    bot.on(eventName, event.default.bind(null, bot));
  });
});