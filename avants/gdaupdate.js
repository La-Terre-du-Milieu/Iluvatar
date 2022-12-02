// // at the top of your file
// const Discord = require('discord.js')
// const client = new Discord.Client();
// module.exports = {
// 	name: 'gdaupdate',
// 	description: 'gdaupdate',
// 	async execute(message, args) {

//                 if(args[0] && args[1]) {
//                         const result = await Gda.findOneAndUpdate(
//                                 { _id: "60c077823dabeb737cde8c99" },
//                                 { 
//                                         tour: args[0], 
//                                         img: args[1]
//                                 },
//                                 { new: true, upsert: true }
//                         );
        
//                         const data = await Gda.find({"_id" : '60c077823dabeb737cde8c99'})
        
//                         const match = await Match.find({});
//                         await message.guild.channels.cache.get('796766896283189248').messages.fetch('837619746861613068')
//                         .then(msg => {
//                                 const newEmbed = new Discord.MessageEmbed()
//                                 .setColor('#E74C3C')
//                                 .setTitle(`Planning des Matchs 📅 du TOUR ${data[0].tour}`)
//                                 .setDescription("Vous retrouverez ici normalement les dates des matchs de la Guerre de l'Anneau qui seront streamer par Elrohir où d'autres personnes")
//                                 .addFields(match)
//                                 .setThumbnail('https://cdn.discordapp.com/attachments/647478928427974679/816689802815602729/logo.png')
//                                 .setImage(data[0].img)
//                                 .setTimestamp()
//                                 .setFooter("La Guerre de l'Anneau", 'https://cdn.discordapp.com/attachments/647478928427974679/816689802815602729/logo.png')
        
//                                 msg.edit(newEmbed);
//                         })
//                         .catch(console.error);
        
//                         message.reply(`${result}`)
//                 }
//                 else {
//                         message.reply(`${args} pas valide (gdaupdate 20 img)`)
//                 }

//         }
// }