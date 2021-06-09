const Discord = require('discord.js');
module.exports = {
	name: 'frollo',
	description: 'Say hi',
	execute(message) {
		message.delete({ timeout: 100 });;
         
        const exampleEmbed = new Discord.MessageEmbed()
        // .setColor('#E74C3C')
        // .setTitle('Test')
        .setImage("https://cdn.discordapp.com/attachments/647478928427974679/821650120264777738/unknown.png ")

        message.channel.send(exampleEmbed);
    },
};