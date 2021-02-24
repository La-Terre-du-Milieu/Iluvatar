const { prefix, token } = require('./config.json')

// require the discord.js module
const Discord = require('discord.js');

// create a new Discord client
const client = new Discord.Client();

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
    client.user.setPresence({ activity: { name: 'REGARDE LA TERRE DU MILIEU' }, status: 'idle' });
});

// login to Discord with your app's token
client.login(token);

client.on('message', message => {
	if (message.content === `${prefix}server`) {
        message.channel.send(`This server's name is: ${message.guild.name}`);
    }
});
