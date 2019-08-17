const config = {
  "ownerID": "",
  "admins": [],
  "support": [],

  "errors": {
    "log_channel": "0",
    "warn_console": true,
    "warn_user": true
  },
  
  "modLogChannel": "~NoneLog~",
  "modRole": "~NoneMod~",
  "adminRole": "~NoneAdm~",
  "systemNotice": true,
  "welcomeChannel": "A",
  "welcomeMessage": "B",
  "welcomeEnabled": false,
  "botPermNeededMessage": "</author/>, Sorry, I don't have permission (``</perm/>``) to execute this command! 🙇🏻‍",
  "memberPermNeededMessage": "</author/>, You don't have permission (``</perm/>``) to execute this command!",

  "findErrorSource": function(err) {
    const regex = /\d+:\d+/i;
    const regex2 = /\((.*):\d+:\d+\)$/
    const match = regex.exec(err.stack.split("\n")[1]);
    const match2 = regex2.exec(err.stack.split("\n")[1]);
    let filename = match2[1].split('/')[match2[1].split('/').length - 1];
    return filename + ':' + match[0].split(':')[0];
  },
  
  permLevels: [
    { level: 0,
      name: "User", 
      check: () => true
    },

    { level: 2,
      name: "Moderator",
      check: (message) => {
        try {
          const modRole = message.guild.roles.find(r => r.name.toLowerCase() === message.defaultSettings.modRole.toLowerCase());
          if (modRole && message.member.roles.has(modRole.id)) return true;
        } catch (e) {
          return false;
        }
      }
    },

    { level: 3,
      name: "Administrator", 
      check: (message) => {
        try {
          const adminRole = message.guild.roles.find(r => r.name.toLowerCase() === message.defaultSettings.adminRole.toLowerCase());
          return (adminRole && message.member.roles.has(adminRole.id));
        } catch (e) {
          return false;
        }
      }
    },
    { level: 4,
      name: "Server Owner", 
      check: (message) => message.channel.type === "text" ? (message.guild.owner.user.id === message.author.id ? true : false) : false
    },

    { level: 8,
      name: "Bot Support",
      check: (message) => config.support.includes(message.author.id)
    },

    { level: 9,
      name: "Bot Admin",
      check: (message) => config.admins.includes(message.author.id)
    },

    { level: 10,
      name: "Bot Owner", 
      check: (message) => message.client.config.ownerID.includes(message.author.id)
    } // Moeefa
  ] // ok
};

module.exports = config;
