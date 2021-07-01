// at the top of your file
const Discord = require('discord.js')
const client = new Discord.Client();
const moment = require('moment');
moment.locale('fr')
module.exports = {
	name: 'host',
	description: 'host',
	async execute(message, args) {
                if(message.channel.parentID === "646688762595901450") {

                        message.delete({ timeout: 100 });
                        const filterDate = m => moment(m.content, "DD/MM/YYYY",true).isValid();
                        const filterTime = m => moment(m.content, "HH:mm",true).isValid();
                        const filter = m => m.content !== null && m.content !== '';
                
                        let title = ""
                        let date = ""
                        let time = ""
                
                        message.channel.send("**Nouveau Match !**\n\nJe vous laisse donner un Titre à ce Match merci !").then((m) => {
                            message.channel.awaitMessages(filter, { max: 1, time: 10000, errors: ['time'] })
                                .then(collected => {
                                    m.delete({ timeout: 100 });
                                    console.log(collected.first().content)
                                    title = collected.first().content;
                                    collected.first().delete({ timeout: 100 });
                
                                    message.channel.send("Veuillez entrer une date `30/06/2021`").then((m) => {
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

                                                            console.log(title);
                                                            console.log(date);
                                                            
                                                            await Match.findOneAndUpdate(
                                                                    {
                                                                            title: title,
                                                                            start: `${moment(date, 'DD-MM-YYYY').format("YYYY-MM-DD")} ${time}`, 
                                                                            end: `${moment(date, 'DD-MM-YYYY').format("YYYY-MM-DD")} ${moment(time, 'HH:mm').add(2, 'hours').format('HH:mm')}`,
                                                                            class: "bfme",
                                                                            contentFull: "match"
                                                                    },
                                                                    { new: true, upsert: true }
                                                            );
                                                            message.reply(`est à la recherche d'une personne pour Host un match, \n\n le **${moment(date, 'DD-MM-YYYY').format('dddd D MMMM')} à ${moment(time, 'HH:mm').format('LT')}** \n\n Ajouter la réaction suivante <:gameGDA:814863462609453076> pour Host le Match`);
                                                        })
                                                        .catch(collected => {
                                                            message.channel.send("Format de l'heure invalide désolé");
                                                            m.delete({ timeout: 100 });
                                                        });
                                                });
                                            })
                                            .catch(collected => {
                                                message.channel.send("Format de date invalide désolé");
                                                m.delete({ timeout: 100 });
                                            });
                                    });
                                })
                                .catch(collected => {
                                    message.channel.send('Veuillez rentrer un titre');
                                    m.delete({ timeout: 100 });
                                });
                        });
                }
        }
}