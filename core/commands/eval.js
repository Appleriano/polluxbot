var gear = require("../gearbox.js")
exports.run = (bot, message, args, userData, caller, gear, points, skynet) => {
    
  
    let admRole = message.guild.roles.find("name", "ADM");

    if (!message.member.roles.has(admRole.id)) {
        return message.reply("Apenas ADMs podem executar este comando").catch(console.error);
    }
    
    
     const params = message.content.split(" ").slice(1);
    try {
      var code = params.join(" ");
      var evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      message.channel.sendCode("xl", gear.clean(evaled));
    } catch(err) {
      message.channel.sendMessage(`\`ERROR\` \`\`\`xl\n${gear.clean(err)}\n\`\`\``);
    }
  }
