const Discord = require('discord.js');
module.exports = {
	name: 'testgda',
	description: 'testgda',
	execute(message, args) {

        console.log(args)

        // let embed = new Discord.MessageEmbed()
        // .setTitle("Planning des Matchs 📅")
        // .setDescription("Vous retrouverez ici normalement les dates des matchs de la Guerre de l'Anneau qui seront streamer par Elrohir où d'autres personnes <:GDA:760412019072696340>")
        // .setColor('#E74C3C')
        // .attachFiles(new Discord.MessageAttachment("https://cdn.discordapp.com/attachments/647478928427974679/816689802815602729/logo.png", 'thumbnail.png'))
        // .setThumbnail('attachment://thumbnail.png')
        // .setImage("https://cdn.discordapp.com/attachments/766584396429262869/818445750736388116/unknown.png")
        // .setFooter('Eru Ilúvatar');


        // if (args[0] === "test") {
        //     newEmbed.addFields(
        //         { name: "test", value: "test", inline: true }
        //     );   
        // }

        // await msg.edit(newEmbed);


        // message.channel.send(embed).then(async msg => {
        //     await msg.react('👍');

        //     async function update() {
        //         const newEmbed = new Discord.MessageEmbed(embed);

        //         newEmbed.addFields(
        //         { name: `Participants : (${votes['👍'].size}/${threshold})`, value: userYes, inline: true }
        //         );

        //         await msg.edit(newEmbed);
        //     }

        //update();
        // });
	}
}