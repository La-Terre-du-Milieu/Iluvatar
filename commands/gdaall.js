const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gda')
		.setDescription('gda'),
	async execute(interaction, client) {

        let nbPlayers = 0;
        let nbPlayerHomme = "0";
        let nbPlayerElfe = "0";
        let nbPlayerNain = "0";
        let nbPlayerMordor = "0";
        let nbPlayerIsengard = "0";
        let nbPlayerGobelin = "0";
        let nbPlayerAngmar = "0";


        await fetch("https://api.npoint.io/7a210a01331f3c385ed7")
        .then(res => res.json())
        .then((json) => {
            console.log(json)

            for (var key in json) {
                var obj = json[key];
          
                if (obj.hasOwnProperty("players") && obj.players.length > 0) {
                  let obj2 = JSON.parse(JSON.stringify(obj["players"]));
                  for (var player in obj2) {
                    console.log(obj2, "dejdie")
                    switch (obj2[player]["faction"]) {
                      case 1:
                        nbPlayerHomme += `\n${obj2[player]["name"]}`;
                        nbPlayers += 1;
                        break;
                      case 2:
                        nbPlayerElfe += `\n${obj2[player]["name"]}`;
                        nbPlayers += 1;
                        break;
                      case 3:
                        nbPlayerNain += `\n${obj2[player]["name"]}`;
                        nbPlayers += 1;
                        break;
                      case 4:
                        nbPlayerMordor += `\n${obj2[player]["name"]}`;
                        nbPlayers += 1;
                        break;
                      case 5:
                        nbPlayerIsengard += `\n${obj2[player]["name"]}`;
                        nbPlayers += 1;
                        break;
                      case 6:
                        nbPlayerGobelin += `\n${obj2[player]["name"]}`;
                        nbPlayers += 1;
                        break;
                      case 7:
                        nbPlayerAngmar += `\n${obj2[player]["name"]}`;
                        nbPlayers += 1;
                        break;
                      default:
                        break;
                    }
                  }
                }
        }})

        console.log(nbPlayerMordor, "nbPlayerMordor")

        // console.log(client, "de")
		const pingembed = new EmbedBuilder()
        .setTitle("La Guerre de l'Anneau")
        .setDescription("Statistiques")
        .addFields(
            { name: 'Homme', value: nbPlayerHomme, inline: true },
            { name: 'Elfe', value: nbPlayerElfe, inline: true },
            { name: 'Nain', value: nbPlayerNain, inline: true },
            { name: 'Mordor', value: nbPlayerMordor, inline: true },
            { name: 'Isengard', value: nbPlayerIsengard, inline: true },
            { name: 'Gobelin', value: nbPlayerGobelin, inline: true },
            { name: 'Angmar', value: nbPlayerAngmar, inline: true },
        )
        .setColor('#E700FF')
        .setImage("https://cdn.discordapp.com/attachments/974023030865006662/1043959875706826802/Polish_20221114_233227252.jpg")
        .setThumbnail('https://cdn.discordapp.com/attachments/647478928427974679/816689802815602729/logo.png')
        .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });
  
        interaction.reply({embeds:[pingembed], ephemeral: true})
	},
};

// module.exports = {
// 	name: 'gda',
// 	description: 'gda!',
// 	execute(message, args) {
//         console.log("djeidjei")

//         let embed = new Discord.MessageEmbed()
//             .setTitle("La Guerre de l'Anneau")
//             .setDescription("Statistiques")
//             .addField('Joueurs', "Joueur A\nJour B")
//             .setColor('#E700FF')
//             .setImage("https://cdn.discordapp.com/attachments/974023030865006662/1043959875706826802/Polish_20221114_233227252.jpg")
//             .attachFiles(new Discord.MessageAttachment("https://cdn.discordapp.com/attachments/647478928427974679/816689802815602729/logo.png", 'thumbnail.png'))
//             .setThumbnail('attachment://thumbnail.png')
//             .setFooter('Eru Ilúvatar');
            
//             message.channel.send(embed)


//         // message.delete({ timeout: 100 });
//         // let settings = { method: "Get" };
//         // // let region = args[0];
//         // let region = '';
//         // region = region.concat(args).trim().replace(/,/g,"_").replace(/^\w/, c => c.toUpperCase());;
//         // region = region.replace(/(^|\/|_)(\S)/g, s=>s.toUpperCase())
//         // console.log(region)


//         // fetch("https://api.npoint.io/38a2899b98818d89418c", settings)
//         //     .then(res => res.json())
//         //     .then((json) => {
//         //         console.log()
//         //         console.log(json[region])
//         //         if (json[region] !== undefined) {
//         //             let players = [];
//         //             let elfe = [];
//         //             let rohan = [];
//         //             let gondor = [];
//         //             let nain = [];
//         //             let mordor = [];
//         //             let isengard = [];
//         //             let gobelin = [];
//         //             let angmar = [];
    
//         //             json[region].players.map(v => {
//         //                 console.log(v.faction)
//         //                 players.push(v.name)
//         //             })

//         //             if (players.length === 0) {
//         //                 players = 0
//         //             }

//         //             console.log(json[region].color)
//         //             let color = json[region].color;

//         //             if(json[region].color === "#3300000") {
//         //                 console.log("djeijdiedeji")
//         //                 color = '#737273'
//         //             }
//         //             if(json[region].color === "#c500ff") {
//         //                 color = '#E700FF'
//         //             }
    
    
//         //             let embed = new Discord.MessageEmbed()
//         //             .setTitle(json[region].name)
//         //             .setDescription(json[region].description)
//         //             .addField('Joueurs', players)
//         //             .setColor(color)
//         //             .setImage(json[region].img)
//         //             .attachFiles(new Discord.MessageAttachment("https://cdn.discordapp.com/attachments/647478928427974679/816689802815602729/logo.png", 'thumbnail.png'))
//         //             .setThumbnail('attachment://thumbnail.png')
//         //             .setFooter('Eru Ilúvatar');
                    
//         //             message.channel.send(embed)
//         //         }
//         //         else {
//         //             message.channel.send("Cette région n'existe pas")
//         //         }
                
//         //     });
// 	}
// }
