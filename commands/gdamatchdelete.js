// at the top of your file
const Discord = require('discord.js')
const client = new Discord.Client();
module.exports = {
	name: 'delete',
	description: 'delete',
	async execute(message) {
                //NAME CHANNEL
                let name = message.channel.name.replace(/(^|\/|-)(\S)/g, s=>s.toUpperCase());
                //CHANNEL ID
                let gdaChannel = message.guild.channels.cache.get("836578232417517588")

                await Match.deleteOne({ channel: message.channel.id });

                const match = await Match.find({});

                //MESSAGE ID
                gdaChannel.messages.fetch("837618246685032448")
                .then(msg => {
                        const newEmbed = new Discord.MessageEmbed()
                        .setColor('#E74C3C')
                        .setTitle('Planning des Matchs 📅 du TOUR 18')
                        .setDescription("Vous retrouverez ici normalement les dates des matchs de la Guerre de l'Anneau qui seront streamer par Elrohir où d'autres personnes")
                        .addFields(match)
                        .setThumbnail('https://cdn.discordapp.com/attachments/647478928427974679/816689802815602729/logo.png')
                        .setImage("https://cdn.discordapp.com/attachments/766584396429262869/844084552309276703/unknown.png")
                        .setTimestamp()
                        .setFooter("La Guerre de l'Anneau", 'https://cdn.discordapp.com/attachments/647478928427974679/816689802815602729/logo.png')

                        msg.edit(newEmbed);
                })
                .catch(console.error);


        }
}