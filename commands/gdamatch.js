// at the top of your file
const Discord = require('discord.js')
const client = new Discord.Client();
const moment = require('moment');
moment.locale('fr')
module.exports = {
	name: 'match',
	description: 'match',
	async execute(message, args) {
                if(message.channel.parentID === "836578232417517588") {
                        let name = message.channel.name.replace(/(^|\/|-)(\S)/g, s=>s.toUpperCase());

                        message.delete({ timeout: 100 });
                        const filterDate = m => moment(m.content, "DD/MM/YYYY",true).isValid();
                        const filterTime = m => moment(m.content, "HH:mm",true).isValid();
                
                        let Date = ""
                        let Time = ""
                
                        message.channel.send("**Création d'un évènement**\n\nVeuillez entrer une date `30/06/2021`").then((m) => {
                            message.channel.awaitMessages(filterDate, { max: 1, time: 30000, errors: ['time'] })
                                .then(collected => {
                                    m.delete({ timeout: 100 });
                                    Date = collected.first().content;
                
                                    message.channel.send("Veuillez entrer une heure `15:30`").then((m) => {
                                        message.channel.awaitMessages(filterTime, { max: 1, time: 30000, errors: ['time'] })
                                            .then(async collected => {
                                                m.delete({ timeout: 100 });
                                                Time = collected.first().content;
                
                                                console.log("kdeodkedeokod")
                                                
                                                await Match.findOneAndUpdate(
                                                        { channel: message.channel.id },
                                                        {
                                                                title: name,
                                                                content: message.channel.id
                                                        },
                                                        { new: true, upsert: true }
                                                );

                                                console.log("77494984949")
                                                
                                                const match = await Match.find({});
                        
                                                //CHANNEL ID
                                                let gdaChannel = message.guild.channels.cache.get("796766896283189248")
                        
                                                const data = await Gda.find({"_id" : '60c077823dabeb737cde8c99'})
                        
                                                //MESSAGE ID
                                                gdaChannel.messages.fetch("837619746861613068")
                                                .then(msg => {
                                                        const newEmbed = new Discord.MessageEmbed()
                                                        .setColor('#E74C3C')
                                                        .setTitle(`Planning des Matchs 📅 du TOUR ${data[0].tour}`)
                                                        .setDescription("Vous retrouverez ici normalement les dates des matchs de la Guerre de l'Anneau qui seront streamer par Elrohir où d'autres personnes")
                                                        .addFields(match)
                                                        .setThumbnail('https://cdn.discordapp.com/attachments/647478928427974679/816689802815602729/logo.png')
                                                        .setImage(data[0].img)
                                                        .setTimestamp()
                                                        .setFooter("La Guerre de l'Anneau", 'https://cdn.discordapp.com/attachments/647478928427974679/816689802815602729/logo.png')
                        
                                                        msg.edit(newEmbed);
                                                })
                                                .catch(console.error);

                                                message.channel.send(`Le Match sera le ${moment(Date).format('dddd')} à ${moment(Time).format('LT')}`);
                                            })
                                            .catch(collected => {
                                                message.channel.send("Format de l'heure invalide désolé");
                                            });
                                    });
                                })
                                .catch(collected => {
                                    message.channel.send('Format de date invalide désolé');
                                });
                        });
                }
        }
}