const arraySort = require('array-sort')
const fs = require("fs");
const gear = require('../../gearbox.js')
const {DB,userDB} = require('../../gearbox.js')
const paths = require('../../paths.json')
const locale = require('../../../utils/multilang_b');
const mm = locale.getT();
const cmd = 'rank';
const init = async function (message) {

  const Server  = message.guild;
  const Channel = message.channel;
  const Author  = message.author;
  const MSG     = message.content;
  const bot     = message.botUser;
  const args    = MSG.split(/ +/).slice(1)[0]||"";
  const LANG    = message.lang; 

    let P={lngs:LANG,prefix:message.prefix}
    if(gear.autoHelper([mm("helpkey",P)],{cmd,message,opt:this.cat}))return;


  let GOODMOJI = gear.emoji("rubine")
  let GOOD = 'Rubine'
  let emb = new gear.RichEmbed();

  let ranked = []
  const ServerDATA = await gear.serverDB.findOne({id:Server.id},{'modules.LOCALRANK':1});
  let dbminiarray
  Channel.startTyping();
      if (['server','sv','guild','local',Server.name].includes(args.toLowerCase())) {
          dbminiarray = await gear.localranks.find({server:Server.id}).sort({'exp': -1}).limit(10);
        //console.log(dbminiarray)
      }else{

          dbminiarray = await userDB.find({id:{$not:{$in:['271394014358405121','88120564400553984']}},blacklisted:{$exists:false}}).sort({'modules.exp': -1}).limit(10);
      }


dbminiarray = dbminiarray.map(usr => {
  try{

  let a = {
    id: usr.user||usr.id,
    name: bot.users.get(usr.user||usr.id).username,
    exp: usr.exp||usr.modules.exp,
    level: usr.level||(usr.modules||{level:0}).level,
  };
    
  return a;
  }catch(e){

  }
});

  Channel.stopTyping();

  dbminiarray.forEach(i => {
    console.log(i)
  if(i){


    //if (i.name !== 'Pollux' && i.name !== undefined){
      let rankItem = {};
      rankItem.id = i.id;
      rankItem.name = i.name;
      rankItem.exp = i.exp || 0;
      rankItem.level = i.level;
      ranked.push(rankItem);
  //  }
  }

  });
  arraySort(ranked, 'exp', {
    reverse: true
  })
  
 

  let ids=ranked.map(x=>x.id)
   if (['server','sv','guild','local',Server.name].includes(args.toLowerCase())) {
  emb.title = mm('website.svLead',P)
     P.scope = 'global'
     P.srr = mm('website.globalrank',P)
  emb.setFooter(mm('forFun.usethisfor',P));
    }else{
  emb.title = mm('website.globalrank',P)
     P.scope = 'server'
     P.srr = mm('website.svLead',P)
  emb.setFooter(mm('forFun.usethisfor',P));
    }
  emb.setAuthor('Pollux ', bot.user.displayAvatarURL({format:'png'}), 'http://pollux.fun/leaderboards');
  emb.attachFiles(paths.BUILD +"rank.png")
  emb.setThumbnail("attachment://rank.png")

  var medals = [':first_place: 1st',
':second_place: 2nd',
':third_place: 3rd'
, ':medal: 4th'
, ':medal: 5th'
, ':medal: 6th'
, ':medal: 7th'
, ':medal: 8th'
, ':medal: 9th'
, ':medal: 10th'
]

for (i=0;i<ranked.length&&i<10;i++){
      emb.addField(medals[i],ranked[i].name, true)
      emb.addField(':small_orange_diamond: Level '+ranked[i].level,'**'+ranked[i].exp + '** Exp', true)
}

if(ids.indexOf(Author.id)+1>5){
      emb.addField(":small_red_triangle_down:  "+mm('forFun.position',P)+": #"+(ids.indexOf(Author.id)+1),mm('forFun.leadUnap',P), false)
}
  emb.setColor('#da5bae');



  message.channel.send({
    embed: emb
  }).catch(e => {
    message.reply(mm("error.iNeedThesePerms", {
      lngs: LANG,
      PERMSLIST: "`SEND ATTACHMENTS`"
    }))
  });
}
 module.exports = {pub:true,cmd: cmd, perms: 3, init: init, cat: 'misc'};

