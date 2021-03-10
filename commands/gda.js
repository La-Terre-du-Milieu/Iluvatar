const fetch = require('node-fetch');
const Discord = require('discord.js');
module.exports = {
	name: 'gda',
	description: 'gda!',
	execute(message, args) {
        message.delete({ timeout: 100 });
        let settings = { method: "Get" };
        // let region = args[0];
        let region = '';
        region = region.concat(args).trim().replace(/,/g,"_").replace(/^\w/, c => c.toUpperCase());;
        region = region.replace(/(^|\/|_)(\S)/g, s=>s.toUpperCase())
        console.log(region)


        fetch("https://api.npoint.io/38a2899b98818d89418c", settings)
            .then(res => res.json())
            .then((json) => {
                console.log()
                console.log(json[region])
                if (json[region] !== undefined) {
                    let players = [];
                    let elfe = [];
                    let rohan = [];
                    let gondor = [];
                    let nain = [];
                    let mordor = [];
                    let isengard = [];
                    let gobelin = [];
                    let angmar = [];
    
                    json[region].players.map(v => {
                        console.log(v.faction)
                        players.push(v.name)
                        // switch (v.faction) {
                        //     case 1:
                        //         elfe.push(v.name)
                        //     break;
                        //     case 2:
                        //         rohan.push(v.name)
                        //     break;
                        //     case 3:
                        //         gondor.push(v.name)
                        //     break;
                        //     case 4:
                        //         nain.push(v.name)
                        //     break;
                        //     case 5:
                        //         mordor.push(v.name)
                        //     break;
                        //     case 6:
                        //         console.log("jiedekodkeodeokdkeokdeok")
                        //         isengard.push(v.name)
                        //     break;
                        //     case 7:
                        //         gobelin.push(v.name)
                        //     break;
                        //     case 8:
                        //         angmar.push(v.name)
                        //     break;
                        //     default:
                        //         break;
                        // }
                    })
                    // console.log(players)
                    // message.channel.send(players)

                    if (players.length === 0) {
                        players = 0
                    }

                    console.log(json[region].color)
                    let color = json[region].color;

                    if(json[region].color === "#3300000") {
                        console.log("djeijdiedeji")
                        color = '#737273'
                    }
                    if(json[region].color === "#c500ff") {
                        color = '#E700FF'
                    }
    
    
                    let embed = new Discord.MessageEmbed()
                    .setTitle(json[region].name)
                    .setDescription(json[region].description)
                    .addField('Joueurs', players)
                    .setColor(color)
                    .setImage(json[region].img)
                    .attachFiles(new Discord.MessageAttachment("https://cdn.discordapp.com/attachments/647478928427974679/816689802815602729/logo.png", 'thumbnail.png'))
                    .setThumbnail('attachment://thumbnail.png')
                    .setFooter('Eru Ilúvatar');
                    
                    message.channel.send(embed)
                }
                else {
                    message.channel.send("Cette région n'existe pas")
                }
                
            });
	}
}
