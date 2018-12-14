const paths = require("../../paths.json");
const gear = require("../../gearbox.js");
const fs = require("fs");
const eko = require("../../archetypes/ekonomist.js")
const locale = require('../../../utils/multilang_b');
const mm = locale.getT();

const cmd = 'fish';


const init = async function (message) {

  const FISHES= await gear.collectibles.find({type:"fish"});
  
  
  let rod = {
    name:"best rod",
    rarity:"R",
    bonus: 0,
    attribs:['reinforced','deep','agile']
    
  }  
  let bait = {
    name:"premium worm",
    rarity:"UR",
    size:3,
    attribs:['blood','large']
    
  }
  
  let MAX = 1000
  let rand = gear.randomize(0,MAX);
  
  let bonus = rand;

  
  
  ["strong",
  "large",
  "bloodlust",
  "ornamental",
  "picky",
  "stealer",
  "escapist",
  "poisonous",
  "exotic",
  "trickster",
  "dangerous",
  "aggressive",
  "baitless",
  "deepsea",
  "jurassic",
  "numerous"]
  
let rarLv = {C :0, U :1,R:2,SR:3,UR:4};
  
  let x ={}
  
   x.strong = function(bait,rod){
    return rod.attribs.includes("reinforced") && bait.size >= 2;
  },
    x.large = function(bait,rod){
    return rod.attribs.includes("reinforced") && bait.size > 2;
  },
    x.bloodlust = function(bait,rod){
     return  bait.attribs.includes("blood");
  },

    x.picky = function(bait,rod,self){ 
    return rarLv[bait.rarity] >= rarLv[self.rarity]-1 }

    x.baitless = function(bait,rod){
    return true;
  },
    x.deepsea = function(bait,rod){
    return rod.attribs.includes("deep")
  }, 
    x.numerous = function(bait,rod){
    return true;
  }
  
  
  
  

  let eligibleFishes=[]
  let morefish = FISHES.filter(fish=>{
    console.log(fish.name.blue)
    let res=false;
    if(bait.attribs.some(att=>fish.attribs.penalty.includes(att))) return false;    
    if(fish.attribs.aspect.includes('numerous') && (rarLv[rod.rarity]<3||rarLv[fish.rarity]>0)) {eligibleFishes.push(fish,fish);res = true;}
    if(fish.attribs.aspect.includes('baitless')) {res = true;}
    if(fish.attribs.bonus.includes(bait.rarity)&&!fish.attribs.aspect.includes('picky')) {eligibleFishes.push(fish);res = true;}
  
    
    
    if (fish.attribs.aspect.every(aspect => {
         if(x[aspect]){
          return !!x[aspect](bait, rod, fish);
         }else{
           return true;
         }    
      })){ eligibleFishes.push(fish); res = true;}
  if(res==true){
    
    if(rod.attribs.some(att=>fish.attribs.bonus.includes(att))) eligibleFishes.push(fish,fish,fish,fish); 
    if(bait.attribs.some(att=>fish.attribs.bonus.includes(att))) eligibleFishes.push(fish,fish,fish,fish); 
    bait.attribs.forEach(att=> {if(fish.attribs.bonus.includes(att))eligibleFishes.push(fish,fish) })
  }
    
    
    if(fish.attribs.aspect.length==0) res = true;    
    if(gear.randomize(0,100)==5) res = true;


    return res;
    
  })
eligibleFishes=(eligibleFishes.concat(morefish))
  
let doubling = eligibleFishes.filter(fish=>rarLv[fish.rarity]== Math.floor((rarLv[rod.rarity]+rarLv[rod.rarity])/2)||0 )
  eligibleFishes=(eligibleFishes.concat(doubling))
eligibleFishes=gear.shuffle(eligibleFishes)
  
if(message.args[0]=='benchmark'){
benchmark = {}
for (let i =0; i<new Array(1000).length;i++){  
  let fish = eligibleFishes[gear.randomize(0,eligibleFishes.length-1)];
  typeof benchmark[fish.rarity]=='number' ? benchmark[fish.rarity] ++ : benchmark[fish.rarity] = 1;  
  typeof benchmark["size"+fish.attribs.size]=='number' ? benchmark["size"+fish.attribs.size] ++ : benchmark["size"+fish.attribs.size] = 1;  
  let aspects = fish.attribs.aspect
  for(let i2 in aspects){
    if(!aspects[i2])continue;
    typeof benchmark[aspects[i2]]=='number' ? benchmark[aspects[i2]] ++ : benchmark[aspects[i2]] = 1;  
  }
}
  
  console.log({benchmark})
  invisibar = `\u200b\u2003\u200b\u2003\u200b\u2003\u200b\u2003\u200b\u2003\u200b\u2003\u200b\u2003\u2003\u2003\u2003\u2003\u2003\u2003\u2003\u2003\u2003\u2003\u2003\u2003\u2003\u2003\u2003\u2003\u2003\u2003\u2003\u2003\u2003\u2003\u2003\u2003\u2003\u2003\u2003\u2003\u2003\u2003\u2003\u2003\u2003\u2003\u2003\u2003\u2003\u200b`
bench = " ```"+`ml
𝗙𝗶𝘀𝗵𝗶𝗻𝗴 𝗚𝗲𝗮𝗿 𝗕𝗲𝗻𝗰𝗵𝗺𝗮𝗿𝗸

'Rod  : "${rod.name}" (${rod.rarity})
  >> |${rod.attribs.join("\n     |")}
      
'Bait : "${bait.name}" (${bait.rarity})
  >> |${rod.attribs.join("\n     |")}

------------------------
  Ultra Rare  : ${(benchmark.UR/10).toFixed(1).padStart(4," ")} %
  Super Rare  : ${(benchmark.SR/10).toFixed(1).padStart(4," ")} %
  Rare        : ${(benchmark.R /10).toFixed(1).padStart(4," ")} %
  Uncommon    : ${(benchmark.U /10).toFixed(1).padStart(4," ")} %
  Common      : ${(benchmark.C /10).toFixed(1).padStart(4," ")} %
------------------------
  Exotic      : ${((benchmark.exotic||0) / 10).toFixed(1).padStart(4," ")} %
  Aggressive  : ${((benchmark.aggressive||0) / 10).toFixed(1).padStart(4," ")} %
  Bloodlusty  : ${((benchmark.bloodlust||0) / 10).toFixed(1).padStart(4," ")} %
  Delicate    : ${((benchmark.delicate||0) / 10).toFixed(1).padStart(4," ")} %
  Ornamental  : ${((benchmark.ornamental||0) / 10).toFixed(1).padStart(4," ")} %
  Deepsea     : ${((benchmark.deepsea||0) / 10).toFixed(1).padStart(4," ")} %
------------------------
  Large       : ${((benchmark.size4||0) / 10).toFixed(1).padStart(4," ")} %
  Medium      : ${((benchmark.size3||0) / 10).toFixed(1).padStart(4," ")} %
  Small       : ${((benchmark.size2||0) / 10).toFixed(1).padStart(4," ")} %
------------------------


`+"```";
  let embed = new gear.RichEmbed();

  embed.description = bench+"\n`"+invisibar+"`"
  
    return message.channel.send({embed});
}
  

  
  
  let embed = new gear.RichEmbed();
  let fish = eligibleFishes[gear.randomize(0,eligibleFishes.length-1)];
  embed.description = `${gear.emoji(fish.rarity)} **${fish.name}**
Rod:  **${rod.name}** ${gear.emoji(rod.rarity)}
Bait:  **${bait.name}** ${gear.emoji(bait.rarity)}
`
  embed.setThumbnail("https://pollux.fun/build/fish/"+fish.id+".png")
    message.channel.send({embed})
}

 module.exports = {
    pub:false,
    cmd: cmd,
    perms: 3,
    init: init,
    cat: 'games',
   cool: 300
};
