const fs = require('node:fs');
const path = require('node:path');
// Require the necessary discord.js classes
const { Client, Events, GatewayIntentBits, Collection } = require('discord.js');
require('dotenv').config();

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent, GatewayIntentBits.GuildMessageReactions] });

client.commands = new Collection();
client.buttons = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

client.on("messageCreate", (message) => {
	if(message.content == "<:gollum:646777565469736960>") {
		message.react('646777565469736960');
	}
	if(message.channelId == "646687718491029505") {
		message.react('646777565469736960');
		message.react('647780678704037949');
	}

	message.react('1158072394875928658');

  });

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args, client));
	} else {
		client.on(event.name, (...args) => event.execute(...args, client));
	}
}

const componentsPath = path.join(__dirname, 'components');
const componentFolders = fs.readdirSync(componentsPath)

for (const folder of componentFolders) {
	const componentFiles = fs.readdirSync(`${componentsPath}/${folder}`).filter(file => file.endsWith('.js'));

	const { buttons } = client;

	switch (folder) {
		case "buttons":
			for (const file of componentFiles) {
				const button = require(`${componentsPath}/${folder}/${file}`);
				buttons.set(button.data.name, button);
			}
		
		default:
			break;
	}
}

// Log in to Discord with your client's token
client.login(process.env.TOKEN);