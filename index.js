const fs = require('fs');
global.mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
require('dotenv').config();

// eslint-disable-next-line no-undef
mongoose.connect(process.env.dataURL, { useNewUrlParser: true, useUnifiedTopology: true });
// eslint-disable-next-line no-undef
mongoose.connection.on('connected', ()=>{
	console.log('[✅ DataBase] Connected!');
});

global.Rank = require('./data/ranked/rank.js');
global.Match = require('./data/ranked/match.js');
global.Matchsurprise = require('./data/ranked/matchsurprise.js');
global.Elfe = require('./data/ranked/elfe.js');
global.Gda = require('./data/ranked/gda.js');

// require the discord.js module
global.Discord = require('discord.js');
// create a new Discord client
const client = new Discord.Client();
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
    client.user.setActivity('LA TERRE DU MILIEU', { type: 'LISTENING' });
});

// login to Discord with your app's token
client.login(process.env.TOKEN);

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('message', message => {
		
		const email = client.user.email;
		console.log(client);

		//BANWORD
		// const banwords =/\ ?kaamelott?/g ;
		// const testingRegex = banwords.test(message.content);
		// if(testingRegex){
		// 	message.delete();
		// 	message.channel.send('C est la sainte journée');
		// }

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


