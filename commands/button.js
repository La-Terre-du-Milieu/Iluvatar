const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const fetch = require('node-fetch');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('button')
		.setDescription('button'),
	async execute(interaction, client) {
        // console.log("W??")
        // const row = new ActionRowBuilder()
		// 	.addComponents(
		// 		new ButtonBuilder()
		// 			.setCustomId('sub-yt')
		// 			.setLabel('Click me!')
		// 			.setStyle()
        //             .setEmoji('646777565469736960'),
		// 	);

		// await interaction.reply({ content: 'I think you should,', components: [row] });
        const button = new ButtonBuilder()
            .setCustomId('sub-yt')
            .setLabel(`Hello`)
            .setStyle(ButtonStyle.Primary);

        await interaction.reply({
            components: [new ActionRowBuilder().addComponents(button)]
        })
	},
};