const Jimp = require("jimp");
const Discord = require("discord.js");
const fs = require("fs");
const gear = require('../gearbox.js')
var paths = require("../paths.js");
var locale = require('../../utils/multilang_b');
var mm = locale.getT();

var dropGoodies = function dropGoodies(event, DB, userDB) {


        var CHN = event.channel
        var GLD = event.guild
        var LANG = event.lang;
        let GOODMOJI = emoji("ruby")
        let GOOD = 'Ruby'
        if (DB.get(Server.id).modules) {
            GOODMOJI = DB.get(Server.id).modules.GOODMOJI
        }
        if (DB.get(Server.id).modules) {
            GOOD = DB.get(Server.id).modules.GOODNAME
        }
        if (typeof CHN.DROPSLY != 'number') {
            CHN.DROPSLY = 0
        }
        var droprate = randomize(1, 5000)
        if (GLD.name == "Discord Bots") return;
        console.log(droprate)
        if (droprate == 1234) {
            console.log('DROP')
            var pack;
            var prefie = DB.get(Server.id).modules.PREFIX || "+"

            CHN.send(mm('$.goodDrop', {
                lngs: LANG,
                good: GOOD,
                emoji: GOODMOJI,
                prefix: prefie
            }),{files:[paths.BUILD + 'ruby.png']}).then(function (r) {

                if (isNaN(CHN.DROPSLY)) {
                    CHN.DROPSLY = 1
                } else {
                    CHN.DROPSLY += 1
                }
                console.log("------------=========== ::: NATURAL DROP".bgGreen.white)

                return new Promise(async resolve => {

                    var oldDropsly = CHN.DROPSLY
                    const responses = await CHN.awaitMessages(msg2 =>
                        msg2.content === '+pick', {
                            maxMatches: 1
                        }
                    );

                    if (responses.size === 0) {} else {
                        if (oldDropsly > CHN.DROPSLY) {
                            r.delete().catch(e=>{
                                let v = "Couldnt Delete R at 295"
                                console.log(v);
                                hook.send(v)
                            });
                            return resolve(true);
                        }
                        let Picker = responses.first().author

                        console.log("----------- SUCCESSFUL PICK by" + Picker.username)
                        message.channel.send(mm('$.pick', {
                            lngs: LANG,
                            good: GOOD,
                            user: Picker.username,
                            count: CHN.DROPSLY,
                            emoji: ""
                        }) + " " + emoji("ruby")).then(function (c) {
                            message.delete()
                            c.delete(500000)
                        }).catch();

                        this.paramIncrement(Picker, 'goodies', CHN.DROPSLY)
                        this.paramIncrement(Picker, 'earnings.drops', CHN.DROPSLY)
                        CHN.DROPSLY = 0

                        r.delete().catch(e=>{
                                let v = "Couldnt Delete R at 322"
                                console.log(v);
                                hook.send(v)
                            });
                        return resolve(true);
                    }
                })

                }).catch(e => {
                    let v = "Ruby Send Forbidden: "+message.guild.name+" C: "+message.channel.name
                    console.log(v);
                    hook.send(v)
                });
                }

        if (droprate == 777) {
            var mm = multilang.getT();
            event.channel.send(mm('$.rareDrop', {
                lngs: LANG,
                good: GOOD,
                emoji: GOODMOJI,
                prefix: event.DB.get(Server.id).modules.PREFIX
            }),{files:[paths.BUILD + 'rubypot.png']}).then(function (r) {

                if (isNaN(CHN.DROPSLY)) {
                    CHN.DROPSLY = 10
                } else {
                    CHN.DROPSLY += 10

                }
                console.log("------------=========== ::: NATURAL RARE DROP ::: ===".bgGreen.yellow.bold)

                return new Promise(async resolve => {

                    var oldDropsly = CHN.DROPSLY
                    const responses = await CHN.awaitMessages(msg2 =>
                        msg2.author.id === message.author.id && (msg2.content === '+pick'), {
                            maxMatches: 1
                        }
                    );
                    if (responses.size === 0) {} else {
                        if (oldDropsly > CHN.DROPSLY) {
                            r.delete();
                            return resolve(true);
                        }
                        let Picker = responses.first().author


                        console.log("----------- SUCCESSFUL PICK by" + Picker.username)
                        message.channel.send(mm('$.pick', {
                            lngs: LANG,
                            good: GOOD,
                            user: Picker.username,
                            count: CHN.DROPSLY,
                            emoji: ""
                        }) + " " + emoji("ruby")).then(function (c) {
                            message.delete().catch(e=>{
                                let v = "Couldnt Delete Message at 377"
                                console.log(v);
                                hook.send(v)
                            });
                            c.delete(500000).catch(e=>{
                                let v = "Couldnt Delete R at 382"
                                console.log(v);
                                hook.send(v)
                            });
                        }).catch(e=>{
                                let v = "Couldnt Send PickPot at 388"
                                console.log(v);
                                hook.send(v)
                            });

                        this.paramIncrement(Picker, 'goodies', CHN.DROPSLY)
                        this.paramIncrement(Picker, 'earnings.drops', CHN.DROPSLY)
                        CHN.DROPSLY = 0
                        r.delete().catch(e=>{
                                let v = "Couldnt Delete R at 396"
                                console.log(v);
                                hook.send(v)
                            });
                        return resolve(true);

                    }
                })

            }).catch()
        }

    };

module.exports = {
    dropGoodies:dropGoodies
}