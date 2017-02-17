var paths = require("../paths.js");
var gear = require("../gearbox.js");
const fs = require("fs");
var locale = require('../../utils/multilang_b');
var mm = locale.getT();

var cmd = 'betflip';

var init = function (message,userDB,DB) {
    var Server = message.guild;
    var Channel = message.channel;
    var Author = message.author;
    var Target = message.mentions.users.first() || Author;
    var MSG = message.content;
    if (Author.bot) return;
    var bot = message.botUser
    var BOT = message.botUser.user

  let GOODMOJI = ':gem:'
    let GOOD = 'Gem'
    if (Server.mods.GOODMOJI) {
        GOODMOJI = Server.mods.GOODMOJI
    }
    if (Server.mods.GOODNAME) {
        GOOD = Server.mods.GOODNAME
    }

    var bet = MSG.toLowerCase().split(' ');
    prompts = {

        error1: mm('$.insuFloor', {
            lngs: message.lang,
            goods: GOOD,
            number: 3,
            emoji: GOODMOJI
        }),
        error2: mm('CMD.incorrectUsage', {
            lngs: message.lang,
            usage: "`+beflip ["+mm('dict.qnt',{lngs: message.lang})+"] ["+mm('dict.res',{lngs: message.lang})+"]`",
            example: "`+betflip 5 "+mm('dict.coinHeads',{lngs: message.lang})+"`"
        }),
         error3: mm('$.insuBet', {
            lngs: message.lang,
            number: 3
        }),
          noFunds: mm('$.noFunds', {
            lngs: message.lang,
            number: Author.mods.goodies,
            goods: GOOD
        }),

    };

var coinHeads = mm('dict.coinHeads',{lngs: message.lang})
var coinTails = mm('dict.coinTails',{lngs: message.lang})


    if (gear.checkGoods(3, Author) == false) {
        message.reply(prompts.error1);
        return;
    }
    if (bet.length <= 2) {
        message.reply(prompts.error2);
        return;
    }
    if (isNaN(parseInt(bet[1], 10))) {
        message.reply(prompts.error2);
        return;
    };
    bet[1] = parseInt(bet[1], 10)
    if (bet[1] < 3) {
       message.reply(prompts.error3);
        return;
    };
    if (gear.checkGoods(parseInt(bet[1]), Author) == false) {
        message.reply(prompts.noFunds);
        return;
    };

    if (bet[2] != coinHeads && bet[2] != coinTails) {
       message.reply(prompts.error2);
        return;
    }
    gear.paramIncrement(Author, 'goodies', -parseInt(bet[1]))
    gear.paramIncrement(Author, 'expenses.jogatina', parseInt(bet[1]))

    var coin = gear.randomize(1, 2);
    var res = ""
    var ros = ""
    coin == 1 ? res = coinHeads : res = coinTails;
    coin == 1 ? ros = "heads.png" : ros = "tails.png";
    if (res.toLowerCase() == bet[2]) {
        var vicPrompt = mm('$.coinVictory', {
            lngs: message.lang,
            result:res,
            prize: bet[1]*2,
            emoji: GOODMOJI
        })
        message.channel.sendFile(paths.BUILD + ros, ros, vicPrompt )

        gear.paramIncrement(Author, 'goodies', parseInt(bet[1] * 2))
        gear.paramIncrement(Author, 'earnings.jogatina', parseInt(bet[1] * 2))
        gear.paramIncrement(BOT, 'expenses.jogatina', parseInt(bet[1] * 2))

    } else {
        var dftPrompt = mm('$.coinDefeat', {
            lngs: message.lang,
            result:res
        })
        message.channel.sendFile(paths.BUILD + ros, ros, dftPrompt)

        gear.paramIncrement(BOT, 'goodies', parseInt(bet[1]))
        gear.paramIncrement(BOT, 'earnings.jogatina', parseInt(bet[1]))


    }
    console.log("Bet:" + bet[1] + " Call:" + bet[2] + " -- Outcome: " + res)
        // gear.writeJ(userDB,'./database/users')
        //    gear.writeJ(DB,'./database/servers')
}




module.exports = {
    pub:true,
    cmd: cmd,
    perms: 0,
    init: init,
    cat: 'games'
};