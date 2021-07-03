// at the top of your file
const Discord = require('discord.js')
const client = new Discord.Client();
const moment = require('moment');
moment.locale('fr')
module.exports = {
	name: 'host',
	description: 'host',
	async execute(message, args) {
        if(message.channel.parentID !== "646688762595901450") return

        await message.delete({ 
            timeout: 100 
        }).catch(console.error)

        const filterDate = m => moment(m.content, "DD/MM",true).isValid();
        const filterTime = m => moment(m.content, "HH:mm",true).isValid();
        const filter = m => m.content !== null && m.content !== '';
                
        let title = ""
        let date = ""
        let time = ""

        const m = await message.channel.send("**Nouveau Match !**\n\nJe vous laisse donner un Titre à ce Match merci !")
        const collected = await message.channel.awaitMessages(filter, { 
            max: 1, 
            time: 10000, 
            errors: ['time'] 
        }).catch(collected => {
            message.channel.send('Veuillez rentrer un titre');
        });

        await m.delete({
            timeout: 100
        })
        title = collected.first().content;
        await collected.first().delete({
            timeout: 100
        })

        const m2 = await message.channel.send(`Veuillez entrer une date, du format suivant : ${moment().format("DD/MM")}`)
        const collected2 = await message.channel.awaitMessages(filterDate, { 
            max: 1, 
            time: 10000, 
            errors: ['time'] 
        }).catch(collected => {
            message.channel.send("Format de date invalide désolé");
        });
        
        await m2.delete({ timeout: 100 });
        date = collected2.first().content;
        await collected2.first().delete({ timeout: 100 });

        const m3 = await message.channel.send(`Veuillez entrer une heure, du format suivant : ${moment().format("HH:mm")}`)
        const collected3 = await message.channel.awaitMessages(filterTime, { 
            max: 1, 
            time: 10000, 
            errors: ['time'] 
        }).catch(collected => {
            message.channel.send("Format de l'heure invalide désolé");
        })
        
        await m3.delete({ timeout: 100 });
        time = collected3.first().content;
        await collected3.first().delete({ timeout: 100});

        await Match.create({
            title: title,
            start: `${moment(date, 'DD-MM-YYYY').format("YYYY-MM-DD")} ${time}`, 
            end: `${moment(date, 'DD-MM-YYYY').format("YYYY-MM-DD")} ${moment(time, 'HH:mm').add(2, 'hours').format('HH:mm')}`,
            class: "bfme",
            contentFull: "match"
        }).catch(console.log)

        const m4 = await message.reply(`est à la recherche d'une personne pour Host un match, 
        \n le **${moment(date, 'DD-MM-YYYY').format('dddd D MMMM')} à ${moment(time, 'HH:mm').format('LT')}** 
        \n Vous pouvez voir  le planning de la Terre du Milieu ici : **https://events.laterredumilieu.fr/plannings** (encore en BETA)
        \n <@&806228484157866014>, suffit de mettre la réaction suivante <:gameGDA:814863462609453076>`);

    }
}