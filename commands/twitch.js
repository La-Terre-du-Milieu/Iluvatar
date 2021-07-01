// at the top of your file
const Discord = require('discord.js')
const client = new Discord.Client();
const moment = require('moment');
moment.locale('fr')
module.exports = {
	name: 'live',
	description: 'live',
	async execute(message, args) {
                if(message.channel.parentID === "646688762595901450") {

                        message.delete({ timeout: 100 });
                        const filterDate = m => moment(m.content, "DD/MM/YYYY",true).isValid();
                        const filterTime = m => moment(m.content, "HH:mm",true).isValid();
                
                        let date = ""
                        let timedebut = ""
                        let timefin = ""
                
                        message.channel.send("**Création d'un match**\n\nVeuillez entrer une date `30/06/2021`").then((m) => {
                            message.channel.awaitMessages(filterDate, { max: 1, time: 10000, errors: ['time'] })
                                .then(collected => {
                                    m.delete({ timeout: 100 });
                                    date = collected.first().content;
                                    collected.first().delete({ timeout: 100 });
                
                                    message.channel.send("Veuillez entrer une heure de début `15:30`").then((m) => {
                                        message.channel.awaitMessages(filterTime, { max: 1, time: 10000, errors: ['time'] })
                                            .then(collected => {
                                                m.delete({ timeout: 100 });
                                                timedebut = collected.first().content;
                                                collected.first().delete({ timeout: 100 });

                                                message.channel.send("Veuillez entrer une heure de fin `15:30`").then((m) => {
                                                    message.channel.awaitMessages(filterTime, { max: 1, time: 10000, errors: ['time'] })
                                                        .then(async collected => {
                                                            m.delete({ timeout: 100 });
                                                            timefin = collected.first().content;
                                                            collected.first().delete({ timeout: 100 });
                                                            
                                                            await Match.findOneAndUpdate(
                                                                    {
                                                                            title: "Nouveau Live !",
                                                                            contentFull: "twitch",
                                                                            start: `${moment(date, 'DD-MM-YYYY').format("YYYY-MM-DD")} ${timedebut}`, 
                                                                            end: `${moment(date, 'DD-MM-YYYY').format("YYYY-MM-DD")} ${timefin}`,
                                                                            class: "live",
                                                                            contentFull: "live"
                                                                    },
                                                                    { new: true, upsert: true }
                                                            );
                                                            
                                                            message.channel.send(`Le live sera le ${moment(date, 'DD-MM-YYYY').format('dddd D MMMM')} à ${moment(timedebut, 'HH:mm').format('LT')}`);
                                                        })
                                                        .catch(collected => {
                                                            message.channel.send("Format de l'heure invalide désolé");
                                                            m.delete({ timeout: 100 });
                                                        });
                                                });
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