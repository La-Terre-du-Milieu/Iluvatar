const { Events, Client, GatewayIntentBits } = require('discord.js');

// const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// client.login(process.env.TOKEN);

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction, client) {

		console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
		
		if (interaction.isButton()) {
			const { buttons } = client;
			const { customId } = interaction;
			const button = buttons.get(customId);
			if(!button) return new Error("Ce n'est pas un button")
			
			try {
				await button.execute(interaction, client);
			} catch (err) {
				console.error(err)
			}
		}

		if (interaction.isSelectMenu()) {
			const selected = interaction.values[0];

			await interaction.update(selected);
		} 

		if (interaction.isModalSubmit()) {
			if (interaction.customId === 'myModal') {
				const favoriteColor = interaction.fields.getTextInputValue('favoriteColorInput');
				const hobbies = interaction.fields.getTextInputValue('hobbiesInput');
				console.log({ favoriteColor, hobbies });

				await interaction.reply({ content: `Ta couleur préférée est ${favoriteColor} et ta passion préféré est ${hobbies}` });
			}
		}

		

		if (interaction.isChatInputCommand()) {
			const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
			console.log("JE PASSE ICI ?")
			await command.execute(interaction, client);
		} catch (error) {
			console.error(`Error executing ${interaction.commandName}`);
			console.error(error);
		}

		} else if (interaction.isAutocomplete()) {
			const command = interaction.client.commands.get(interaction.commandName);
	
			if (!command) {
				console.error(`No command matching ${interaction.commandName} was found.`);
				return;
			}
	
			try {
				await command.autocomplete(interaction);
			} catch (error) {
				console.error(error);
			}
		}
	},
};