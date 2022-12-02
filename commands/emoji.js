const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gollum')
		.setDescription('gollum'),
	async execute(interaction, client) {
        let emojiList = []
        interaction.guild.emojis.cache.map(emoji => {
            emojiList.push(emoji.toString());
        })
        interaction.reply(emojiList[Math.floor(Math.random() * emojiList.length)])
	},
};

// module.exports = {
// 	name: 'gollum',
// 	description: 'gollum!',
// 	execute(message) {
//         message.delete({ timeout: 100 });
//         let emojiList = []
//         message.guild.emojis.cache.map(emoji => {
//             emojiList.push(emoji.toString());
//         })
//         message.channel.send(emojiList[Math.floor(Math.random() * emojiList.length)])
// 	}
// }