const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('recherche')
		.setDescription('recherche')
                .addStringOption(option => 
                        option.setName('search')
                        .setDescription("Recherche sur Tolkiendil")
                        .setRequired(true)),
	async execute(interaction, client) {
        const search = interaction.options.getString('search')
        
        const url = `https://www.tolkiendil.com/doku.php?do=search&id=${search}`;

        interaction.reply(url)
	},
};
