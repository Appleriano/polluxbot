
const Discord = require("discord.js");
var gear = require("../../gearbox.js");
var paths = require("../../paths.js");
var locale = require('../../../utils/multilang_b');
var mm = locale.getT();

var cmd = 'roleadd';

var init = function (message, userDB, DB) {
        var Server = message.guild;
        var Channel = message.channel;
        var Author = message.author;
        if (Author.bot) return;
        var Member = Server.member(Author);
        var Target = message.mentions.users.first() || Author;
        var MSG = message.content;
        var bot = message.botUser
        var args = MSG.split(' ').slice(2).join(" ")


        var LANG = message.lang;
        try {

    //HELP TRIGGER
    let helpkey = mm("helpkey",{lngs:message.lang})
if (message.content.split(" ")[1]==helpkey || message.content.split(" ")[1]=="?"|| message.content.split(" ")[1]=="help"){
    return gear.usage(cmd,message);
}
//------------
 var modPass = gear.hasPerms(Member,DB)


    if (!modPass) {
        return message.reply(mm('CMD.moderationNeeded', {
            lngs: LANG
        })).catch(console.error);
    }


            //-------MAGIC----------------

            Target = Server.member(Target)


            //--------------------------------------


            var On = gear.emoji("check")
            var Off = gear.emoji("xmark")

            var rolenotfound = mm('CMD.nosuchrole', {
                lngs: LANG
            });


            //--------------------------------------

            var noPermsMe = mm('CMD.unperm', {
                lngs: LANG
            })




            return fR(args, Server.member(Target))

            function fR(role, memb) {
                message.delete(50000)
                var roleadd_confirm = On + mm('CMD.superRoleadCom', {
                    lngs: LANG,
                    user: memb.displayName,
                    group: role
                });
                var a = Server.roles.find('name', role);
               // message.reply(role)
                if (a == undefined) return message.reply(rolenotfound);
                memb.addRole(a).then(a => message.channel.send(roleadd_confirm)).then(e => e.delete(600000)).catch(e => message.channel.send(noPermsMe))
            }
        } catch (e) {
            gear.hook.send(e.error)
        }
        }

        module.exports = {
            pub: false,
            cmd: cmd,
            perms: 3,
            init: init,
            cat: 'info'
        };