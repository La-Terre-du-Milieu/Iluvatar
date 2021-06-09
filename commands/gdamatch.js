// at the top of your file
const Discord = require('discord.js')
const client = new Discord.Client();
module.exports = {
	name: 'match',
	description: 'match',
	async execute(message, args) {
                if(message.channel.parentID === "836578232417517588") {
                        console.log('Ready!');
                        console.log(args)
                        console.log("Mettre à jour l'heure et le jour")
                        let test = args.join(" ");
                        let name = message.channel.name.replace(/(^|\/|-)(\S)/g, s=>s.toUpperCase());
                        
                        message.reply(`Le match ${name} sera le ${test}`)
                        let targetChannel = message.guild.channels.cache.get("796766896283189248")
                        // if (targetChannel) targetChannel.send(`Le match ${name} sera le ${test}`)

                        await Match.findOneAndUpdate(
                                { channel: message.channel.id },
                                {
                                        name: name,
                                        value: test
                                },
                                { new: true, upsert: true }
                        );

                        const match = await Match.find({});

                        console.log(match)

                        const newMatch = match.map((v) => {
                                return {
                                        name: v.name,
                                        value: v.value, 
                                        inline: true
                                }
                        });

                        //CHANNEL ID
                        let gdaChannel = message.guild.channels.cache.get("796766896283189248")

                        //MESSAGE ID
                        gdaChannel.messages.fetch("837619746861613068")
                        .then(msg => {
                                const newEmbed = new Discord.MessageEmbed()
                                .setColor('#E74C3C')
                                .setTitle('Planning des Matchs 📅 du TOUR 20')
                                .setDescription("Vous retrouverez ici normalement les dates des matchs de la Guerre de l'Anneau qui seront streamer par Elrohir où d'autres personnes")
                                .addFields(newMatch)
                                .setThumbnail('https://cdn.discordapp.com/attachments/647478928427974679/816689802815602729/logo.png')
                                .setImage("https://cdn.discordapp.com/attachments/766584396429262869/849246152976891904/unknown.png")
                                .setTimestamp()
                                .setFooter("La Guerre de l'Anneau", 'https://cdn.discordapp.com/attachments/647478928427974679/816689802815602729/logo.png')

                                msg.edit(newEmbed);
                        })
                        .catch(console.error);
                }
        }
}