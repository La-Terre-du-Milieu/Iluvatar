// at the top of your file
const Discord = require('discord.js')
const client = new Discord.Client();
const moment = require('moment');
moment.locale('fr')
module.exports = {
    name: 'live',
    description: 'live',
    async execute(message, args) {

        console.log('Match', Match)
        if (message.channel.parentID !== "646688762595901450") return

        await message.delete({
            timeout: 100
        }).catch(console.error)

        const filterDate = m => moment(m.content, "DD/MM", true).isValid();
        const filterTime = m => moment(m.content, "HH:mm", true).isValid();

        let date = ""
        let timedebut = ""
        let timefin = ""

        const m = await message.channel.send("**Création d'un match**\n\nVeuillez entrer une date `30/06`")
        const collected = await message.channel.awaitMessages(filterDate, {
            max: 1,
            time: 10000,
            errors: ['time']
        }).catch(collected => {
            message.channel.send('Format de date invalide désolé');
        });

        await m.delete({
            timeout: 100
        });
        date = collected.first().content;
        await collected.first().delete({
            timeout: 100
        });

        const m2 = await message.channel.send("Veuillez entrer une heure de début `15:30`");
        const collected2 = await message.channel.awaitMessages(filterTime, {
            max: 1,
            time: 10000,
            errors: ['time']
        }).catch(collected2 => {
            message.channel.send("Format de l'heure invalide désolé");
        });
        await m2.delete({
            timeout: 100
        });
        timedebut = collected2.first().content;
        await collected2.first().delete({
            timeout: 100
        });

        const m3 = await message.channel.send("Veuillez entrer une heure de fin `15:30`");
        const collected3 = await message.channel.awaitMessages(filterTime, {
            max: 1,
            time: 10000,
            errors: ['time']
        }).catch(collected => {
            message.channel.send("Format de l'heure invalide désolé");
        });
        await m3.delete({
            timeout: 100
        });
        timefin = collected3.first().content;
        await collected3.first().delete({
            timeout: 100
        });
        

        Match.create({
            title: "Nouveau Live !",
            start: `${moment(date, 'DD-MM-YYYY').format("YYYY-MM-DD")} ${timedebut}`,
            end: `${moment(date, 'DD-MM-YYYY').format("YYYY-MM-DD")} ${timefin}`,
            class: "live",
            contentFull: "live"
        }).catch(console.log)

        const m4 = await message.channel.send(`Le live sera le ${moment(date, 'DD-MM-YYYY').format('dddd D MMMM')} à ${moment(timedebut, 'HH:mm').format('LT')}`);

    }
}