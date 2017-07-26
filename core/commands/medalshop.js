var gear = require("../gearbox.js");
var cmd = 'say';
const PersistentCollection = require('djs-collection-persistent');
const SHOP = new PersistentCollection({
    name: "SHOP"
});


var init = function (message, userDB, DB) {

    //    if (message.author.id != '88120564400553984') return message.reply('Only my master can send me direct orders. now begone!');


    var medalshop=[

        ["Twitch TV",450,"twitch"],
        ["Hamburger",250,"burger"],
        ["Fruki Guaraná",250,"fruki"],
        ["Gamecube Controller",250,"gamecube"],
        ["Red Bull",250,"redBull"]

    ]

    SHOP.set("medals",medalshop)


    let store = SHOP.get("medals")












    var string = ""
    for (i = 0; i < store.length; i++) {

        string += `[${i}] :: ${inventory[i][0]} // ${inventory[i][1]} Rubys
`
    }


    message.reply("```js\n" + string + "```").then(function (r) {



        return new Promise(async resolve => {
            const responses = await message.channel.awaitMessages(msg2 =>
                msg2.author.id === message.author.id && msg2.content.match(/\d+/g) != null, {
                    maxMatches: 1
                }
            );
            if (responses.size === 0) {} else {


                if (inventory[Number(responses.first().content)]) {
                    message.reply("```js\n" + "[0] [1] [2] [3] [4] [5] [6] [7]" + "```").then(function (r) {



                        return new Promise(async resolve => {
                            const responsesB = await message.channel.awaitMessages(msg3 =>
                                msg3.author.id === message.author.id && (Number(msg3.content) >= 0 && Number(msg3.content) <= 7), {
                                    maxMatches: 1
                                }
                            );
                            if (responsesB.size === 0) {} else {


                                var Umodules = userDB.get(message.author.id)

                                Umodules.modules.medals[Number(responsesB.first().content)] = inventory[Number(responses.first().content)]

                                userDB.set(message.author.id, Umodules)

                            }


                        })



                    })


                } else {
                    message.reply("nope")

                }


            }



        })


    })








}
module.exports = {
    pub: true,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'bot'
};