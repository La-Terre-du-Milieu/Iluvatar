// at the top of your file
const Discord = require('discord.js')
const client = new Discord.Client();
module.exports = {
	name: 'delete',
	description: 'delete',
	execute(message) {
                //NAME CHANNEL
                let name = message.channel.name.replace(/(^|\/|-)(\S)/g, s=>s.toUpperCase());
                //CHANNEL ID
                let gdaChannel = message.guild.channels.cache.get("796766896283189248")

                //MESSAGE ID
                gdaChannel.messages.fetch("821398112870203423")
                .then(msg => {
                        console.log(msg.embeds[0].fields)

                        const fields = msg.embeds[0].fields
                        let newFields = fields.filter(data => data.name != name);
                        console.log(newFields);

                        const newEmbed = new Discord.MessageEmbed()
                        .setColor('#E74C3C')
                        .setTitle('Planning des Matchs 📅')
                        .setDescription("Vous retrouverez ici normalement les dates des matchs de la Guerre de l'Anneau qui seront streamer par Elrohir où d'autres personnes")
                        .addFields(newFields)
                        .setThumbnail('https://cdn.discordapp.com/attachments/647478928427974679/816689802815602729/logo.png')
                        .setImage("https://cdn.discordapp.com/attachments/766584396429262869/826376908777979904/tour11.png")
                        .setTimestamp()
                        .setFooter("La Guerre de l'Anneau", 'https://cdn.discordapp.com/attachments/647478928427974679/816689802815602729/logo.png')

                        msg.edit(newEmbed);
                })
                .catch(console.error);


        }
}