const fs = require('fs');
const fetch = require('node-fetch');

// require the discord.js module
const Discord = require('discord.js');
// create a new Discord client
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
    // client.user.setPresence({ activity: { name: 'REGARDE LA TERRE DU MILIEU' }, status: 'idle' });
    client.user.setActivity('LA TERRE DU MILIEU', { type: 'LISTENING' });
    // const channel = client.channels.cache.get('646687718491029505');
    // channel.send('AU COMMENCEMENT DES JOURS');
});

// login to Discord with your app's token
client.login(process.env.TOKEN);

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('message', message => {
	if (message.author.bot) return; //!message.content.startsWith(prefix) 

	// const args = message.content.slice(prefix.length).trim().split(/ +/);
  const args = message.content.trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (!client.commands.has(command)) return;

	try {
		client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});


