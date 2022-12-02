// // at the top of your file
// const Discord = require('discord.js')
// const client = new Discord.Client();
// module.exports = {
// 	name: 'tournoimatch',
// 	description: 'tournoimatch',
// 	async execute(message, args) {
//                 if(message.channel.parentID === "851028418199945226") {
//                         console.log('Ready!');
//                         console.log(args)
//                         console.log("Mettre à jour l'heure et le jour")
//                         let test = args.join(" ");
//                         let name = message.channel.name.replace(/(^|\/|-)(\S)/g, s=>s.toUpperCase());
                        
//                         message.reply(`Le match ${name} sera le ${test}`)
//                         let targetChannel = message.guild.channels.cache.get("844990414662271026")

//                         await Matchsurprise.findOneAndUpdate(
//                                 { channel: message.channel.id },
//                                 {
//                                         name: name,
//                                         value: test
//                                 },
//                                 { new: true, upsert: true }
//                         );

//                         const match = await Matchsurprise.find({});

//                         console.log(match)

//                         const newMatch = match.map((v) => {
//                                 return {
//                                         name: v.name,
//                                         value: v.value, 
//                                         inline: true
//                                 }
//                         });

//                         //CHANNEL ID
//                         let gdaChannel = message.guild.channels.cache.get("844990414662271026")

//                         //MESSAGE ID
//                         gdaChannel.messages.fetch("852142120805466162")
//                         .then(msg => {
//                                 const newEmbed = new Discord.MessageEmbed()
//                                 .setColor('#E74C3C')
//                                 .setTitle('Planning des Matchs 📅 du Surprise en TDM')
//                                 .setDescription("Vous retrouverez ici les dates des matchs du tournoi qui seront streamer par Elrohir où d'autres personnes")
//                                 .addFields(newMatch)
//                                 .setThumbnail('https://cdn.discordapp.com/attachments/647478928427974679/826713327250047036/logowithshadow3.png')
//                                 .setImage("https://cdn.discordapp.com/attachments/647478928427974679/852143265267580998/surprise.jpg")
//                                 .setTimestamp()
//                                 .setFooter("Surprise en Terre Du Milieu", 'https://cdn.discordapp.com/attachments/647478928427974679/826713327250047036/logowithshadow3.png')

//                                 msg.edit(newEmbed);
//                         })
//                         .catch(console.error);
//                 }
//         }
// }