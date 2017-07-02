var gear = require("../gearbox.js");
var paths = require("../paths.js");
var locale = require('../../utils/multilang_b');
var mm = locale.getT();

var cmd = 'drop';

var init = function (message, userDB, DB) {
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

    var userData = userDB.get(Author.id).modules

    var emojya = gear.emoji("ruby")
    let GOODMOJI = emojya
    let GOOD = 'Ruby'
    if (DB.get(Server.id).modules.GOODMOJI) {
        GOODMOJI = DB.get(Server.id).modules.GOODMOJI
    }
    if (DB.get(Server.id).modules.GOODNAME) {
        GOOD = DB.get(Server.id).modules.GOODNAME
    }

 var dropAmy = parseInt(args[0]) || 1

    console.log("------------DROP by" + Author)
    // message.guild.defaultChannel.sendMessage()
    if (userData.goodies >= dropAmy) {

        gear.paramIncrement(Author, 'goodies', -dropAmy)
        gear.paramIncrement(Author, 'expenses.drops', dropAmy)
        message.channel.sendFile(paths.BUILD + 'ruby.png', 'Ruby.png', mm('$.userDrop', {
            lngs: LANG,
            amt: dropAmy,
            emoji: GOODMOJI,
            good: GOOD,
            user: Author.username,
            prefix: message.prefix
        }).replace(/\&lt;/g,"<").replace(/\&gt;/g,">")).then(function (r) {


               if (isNaN(Channel.DROPSLY)) {
            Channel.DROPSLY = dropAmy
        } else {
            Channel.DROPSLY += dropAmy
        }
        message.delete(1000)


            return new Promise(async resolve => {

                var oldDropsly = Channel.DROPSLY
                const responses = await Channel.awaitMessages(msg2 =>
                    msg2.content === '+pick', {
                        maxMatches: 1
                    }
                );
                if (responses.size === 0) {} else {
                    if (oldDropsly > Channel.DROPSLY) {
                        r.delete();
                    return resolve(true);
                    }
                    let Picker = responses.first().author


                    console.log("----------- SUCCESSFUL PICK by" + Picker.username)
                    message.channel.sendMessage(mm('$.pick', {
                        lngs: LANG,
                        good: GOOD,
                        user: Picker.username,
                        count: Channel.DROPSLY,
                        emoji: ""
                    }) + " " + emojya).then(function (c) {
                        message.delete()
                        c.delete(500000)
                    }).catch();

                    gear.paramIncrement(Picker, 'goodies', Channel.DROPSLY)
                    gear.paramIncrement(Picker, 'earnings.drops', Channel.DROPSLY)
                    Channel.DROPSLY = 0

                    r.delete().catch()
                    return resolve(true);

                }
            })

        }).catch()

       } else {
        message.reply(mm('$.cantDrop', {
            lngs: LANG,
            goods: GOOD
        }));
    }

}

module.exports = {
    pub: true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'misc'
};