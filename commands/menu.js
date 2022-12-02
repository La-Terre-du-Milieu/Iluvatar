const { SlashCommandBuilder, SelectMenuBuilder, ActionRowBuilder } = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('menu')
		.setDescription('menu'),
	async execute(interaction, client) {
                const row = new ActionRowBuilder()
                .addComponents(
                        new SelectMenuBuilder()
                                .setCustomId('select')
                                .setPlaceholder('Selectionne le meilleur jeu !')
                                .addOptions(
                                        {
                                                label: 'BFME',
                                                description: 'La Bataille pour la Terre du Milieu',
                                                value: 'La Bataille pour la Terre du Milieu',
                                        },
                                        {
                                                label: 'BFME2',
                                                description: 'La Bataille pour la Terre du Milieu 2',
                                                value: 'La Bataille pour la Terre du Milieu 2',
                                        },
                                        {
                                                label: 'ROTWK',
                                                description: "L'Avènement du Roi Sorcier",
                                                value: "L'Avènement du Roi Sorcier",
                                        },
                                ),
                );

        await interaction.reply({ content: 'Pong!', components: [row] });
	},
};