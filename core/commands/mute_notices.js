var paths = require("../paths.js");
var gear = require("../gearbox.js");
var modules = require("../modules.json");
const fs = require('fs')
const Discord = require("discord.js");

exports.run = (bot, message, args, userData, caller, gear, points, skynet) => {
    
    modules[message.guild.id].announcements = false
    
    fs.writeFile('./modules.json', JSON.stringify(modules), (err) => {
        console.log("JSON write event-------")
        if (err) console.log("JSON ERROR  ------------\n" + err)
})

}
