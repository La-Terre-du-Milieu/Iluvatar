const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('gif')
		.setDescription('gif'),
	async execute(interaction, client) {
        const url = `http://api.giphy.com/v1/gifs/search?q=lotr&api_key=${process.env.GIPHY_API_KEY}&limit=100`;

        const res = await fetch(url);

        const json = await res.json();
        
        const randomIndex = Math.floor(Math.random() * json.data.length);

        interaction.reply(json.data[randomIndex].url)
	},
};