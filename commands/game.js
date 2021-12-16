// const Discord = require('discord.js');
// module.exports = {
// 	name: 'game',
// 	description: 'game',
// 	execute(message, args) {
//         message.delete({ timeout: 100 });

//         let title = '';
//         let nb = 8;
//         let img = '';
//         let thumbnail = ''

//         console.log(args)

//         switch (args[0]) {
//             case 'bfme' || 'BFME':
//                 title = "La Bataille pour la Terre du Milieu";
//                 img = "https://laterredumilieu.fr/images/bfme_twitter.jpg";
//                 thumbnail = "https://cdn.discordapp.com/attachments/647478928427974679/816674471301611580/646704112221552670.png";
//                 break;
//             case 'bfme2' || 'BFME2':
//                 title = "La Bataille pour la Terre du Milieu 2";
//                 img = "https://laterredumilieu.fr/images/bfme2_twitter.jpg";
//                 thumbnail = "https://cdn.discordapp.com/attachments/647478928427974679/816674473934585887/646704130726821919.png";
//                 break;
//             case 'rotwk' || 'ROTWK':
//                 title = "L'Avènement du Roi Sorcier";
//                 img = "https://laterredumilieu.fr/images/rotwk_twitter.jpg";
//                 thumbnail = "https://cdn.discordapp.com/attachments/647478928427974679/816674472689532938/rotwk.png";
//             break;
//             case 'Dagor' || 'DAGOR' || 'dagor':
//                 title = "Le Mod des Dinosaures 🦖"
//                 img = "https://images3.alphacoders.com/104/thumb-1920-1046460.jpg";
//             default:
//                 break;
//         }

//         if (args[1]) {
//             nb = args[1]
//         }
//         else {
//             nb = 8
//         }

//         console.log(args)

//         let embed = new Discord.MessageEmbed()
//         .setTitle(title)
//         .setDescription('Création de la partie part de ' + message.author.tag)
//         .addField('Statue', 'En cours de réparation.')
//         .addField('Vocal de la partie', 'https://discord.gg/y5KdfNTZHA')
//         .setColor('#1DD1EA')
//         .attachFiles(new Discord.MessageAttachment(thumbnail, 'thumbnail.png'))
//         .setThumbnail('attachment://thumbnail.png')
//         .setImage(img)
//         .setFooter('Eru Ilúvatar');

//         message.channel.send(embed).then(async msg => {
//             await msg.react('👍');

//         const threshold = nb;

//         async function stop() {
//             collector.stop();

//             const newEmbed = new Discord.MessageEmbed(msg.embeds[0]);

//             newEmbed.title = newEmbed.title + ' [FERMER]';
//             newEmbed.fields[0] = { name: 'Statue', value: 'Game en cours.' };
//             newEmbed.setThumbnail('attachment://thumbnail.png');
//             await msg.edit(newEmbed);

//             msg.reactions.removeAll();
//         }

//         async function update() {
//             const newEmbed = new Discord.MessageEmbed(embed);

//             const userYes = (votes['👍'].size === 0)? '-' : [...votes['👍']];

//             newEmbed.addFields(
//             { name: `Participants : (${votes['👍'].size}/${threshold})`, value: userYes, inline: true }
//             );

//             await msg.edit(newEmbed);

//             if (votes['👍'].size >= threshold) {
//             await stop();
//             }
//         }

//         const votes = {
//             '👍': new Set()
//         };

//         update();

//         const collector = msg.createReactionCollector((reaction, user) => !user.bot , { dispose: true });

//             collector.on('collect', async (reaction, user) => {
//                 if (['👍'].includes(reaction.emoji.name)) {
//                 const userReactions = msg.reactions.cache.filter(reaction => reaction.users.cache.has(user.id));

//                 for (const userReaction of userReactions.values()) {
//                     if (userReaction.emoji.name !== reaction.emoji.name) {
//                     userReaction.users.remove(user.id);
//                     votes[userReaction.emoji.name].delete(user);
//                     }
//                 }

//                 votes[reaction.emoji.name].add(user);
//                 } else {
//                 reaction.remove();
//                 }

//                 update();
//             });

//             collector.on('remove', (reaction, user) => {
//                 votes[reaction.emoji.name].delete(user);

//                 update();
//             });
//         });
// 	}
// }