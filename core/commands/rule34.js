const fs = require("fs");
const getter = require("booru-getter");
var gear = require("../gearbox.js");
 const Discord = require("discord.js");

var gear = require("../gearbox.js");
var paths = require("../paths.js");
var locale = require('../../utils/multilang_b');
var mm = locale.getT();

var cmd = 'rule34';

var init = function (message,userDB,DB) {
    var Server = message.guild;
    var Channel = message.channel;
    var Author = message.author;
    if (Author.bot) return;
    var Member = Server.member(Author);
    var Target = message.mentions.users.first() || Author;
    var MSG = message.content;
    var bot = message.botUser
    var args = MSG.split(' ').slice(1)
    var LANG = message.lang;

    //-------MAGIC----------------

    if(DB.get(Server.id).channels[Channel.id].modules.NSFW==false){
        message.reply(mm('forFun.nsfwNope',{lngs:LANG}));
        return;
    }

    let GOODMOJI = ':gem:'
let GOOD = 'Gem'
if (DB.get(Server.id).modules) {
    GOODMOJI = DB.get(Server.id).modules
}
if (DB.get(Server.id).modules.GOODNAME) {
    GOOD = DB.get(Server.id).modules.GOODNAME
}

return message.reply("Rule34 Temporarily Unavailable");


        if (gear.checkGoods(5, Author) == false) {
            message.reply(mm('forFun.nsfwNofunds',{lngs:LANG, goods:GOOD}));
            return;
        }
        gear.paramIncrement(bot.user,'goodies',5)
        gear.paramIncrement(bot.user,'earnings.putaria',5)
        gear.paramIncrement(Author,'goodies',-5)
        gear.paramIncrement(Author,'expenses.putaria',5)

        console.log("PUTARIA INVOKED by " + Author.username + "-------------\n")
        let query = message.content.split(" ");
        !query[1] ? query[1] = "furry" : query[1] = query[1];
        getter.getRandomLewd(query[1], (url) => {
            if (url === undefined) {
                message.reply(mm('forFun.nsfw404',{lngs:LANG}))
            }
            else {
                //message.channel.sendMessage()
                //message.reply("http:" + url);
                 emb =    new Discord.RichEmbed();
                      emb.setColor('#b41212')
                      emb.setTitle(':underage:')

                emb.setImage("http:" + url)
                var msg_ax = mm('forFun.nsfwCheckout',{lngs:LANG,emoji:GOODMOJI})
                    message.channel.sendEmbed(emb,message.author+msg_ax).then(function (m) {
                m.react('👍')
                m.react('👎')
                m.react('❤')
                m.react('😠')

            })


            }
        })


}
 module.exports = {
    pub:true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'NSFW'
};
