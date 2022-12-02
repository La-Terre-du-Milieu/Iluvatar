const { Events, Client, GatewayIntentBits } = require('discord.js');

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.login(process.env.TOKEN);

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {

		if (interaction.isChatInputCommand()) {
			const command = interaction.client.commands.get(interaction.commandName);

		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}

		try {
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