const moment = require('moment');
module.exports = {
	name: 'prep',
	description: 'prep',
	async execute(message) {
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
                            .then(collected => {
                                m.delete({ timeout: 100 });
                                Time = collected.first().content;

                                message.channel.send(`Le Match sera le ${Date} à ${Time}`);
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
	},
};