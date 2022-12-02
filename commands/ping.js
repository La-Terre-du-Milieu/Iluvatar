const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction, client) {
        console.log(client, "de")
		const pingembed = new EmbedBuilder()
        .setTitle('Commande ping')
        .setDescription(`🌍 Bot latency **${Date.now() - interaction.createdTimestamp}ms** \n🔧  API Latency **${Math.round(client.ws.ping)}ms**`)
        .setColor('Blurple')
  
        interaction.reply({embeds:[pingembed], ephemeral: true})
	},
};