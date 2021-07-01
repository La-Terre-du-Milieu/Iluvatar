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
                
                        let date = ""
                        let time = ""
                
                        message.channel.send("**Création d'un match**\n\nVeuillez entrer une date `30/06/2021`").then((m) => {
                            message.channel.awaitMessages(filterDate, { max: 1, time: 10000, errors: ['time'] })
                                .then(collected => {
                                    m.delete({ timeout: 100 });
                                    date = collected.first().content;
                                    collected.first().delete({ timeout: 100 });
                
                                    message.channel.send("Veuillez entrer une heure `15:30`").then((m) => {
                                        message.channel.awaitMessages(filterTime, { max: 1, time: 10000, errors: ['time'] })
                                            .then(async collected => {
                                                m.delete({ timeout: 100 });
                                                time = collected.first().content;
                                                collected.first().delete({ timeout: 100 });

                                                const data = await Gda.find({"_id" : '60c077823dabeb737cde8c99'})
                                                
                                                await Match.findOneAndUpdate(
                                                        { channel: message.channel.id },
                                                        {
                                                                title: name,
                                                                name: name,
                                                                value: `Le ${moment(date, 'DD-MM-YYYY').format('dddd D MMMM')} à ${moment(time, 'HH:mm').format('LT')}`,
                                                                content: `Match du Tour ${data[0].tour} de la Guerre de l'Anneau ⛰️`,
                                                                start: `${moment(date, 'DD-MM-YYYY').format("YYYY-MM-DD")} ${time}`, 
                                                                end: `${moment(date, 'DD-MM-YYYY').format("YYYY-MM-DD")} ${moment(time, 'HH:mm').add(2, 'hours').format('HH:mm')}`,
                                                                class: "rotwk",
                                                                contentFull: "match"
                                                        },
                                                        { new: true, upsert: true }
                                                );
                                                
                                                const match = await Match.find({});
                        
                                                //CHANNEL ID
                                                let gdaChannel = message.guild.channels.cache.get("796766896283189248")
                        
                                                
                        
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

                                                message.channel.send(`Le Match sera le ${moment(date, 'DD-MM-YYYY').format('dddd D MMMM')} à ${moment(time, 'HH:mm').format('LT')}`);
                                            })
                                            .catch(collected => {
                                                message.channel.send("Format de l'heure invalide désolé");
                                                m.delete({ timeout: 100 });
                                            });
                                    });
                                })
                                .catch(collected => {
                                    message.channel.send('Format de date invalide désolé');
                                    m.delete({ timeout: 100 });
                                });
                        });
                }
        }
}