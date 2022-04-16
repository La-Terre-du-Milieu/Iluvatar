const fs = require('fs');
const cron = require('cron');

global.mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
require('dotenv').config();
// global.strapi = mongoose.createConnection(process.env.dataURLStrapi, { useNewUrlParser: true, useUnifiedTopology: true });
global.ltdm = mongoose.createConnection(process.env.dataURL, { useNewUrlParser: true, useUnifiedTopology: true });

const qs = require('qs');
const axios = require('axios').default;
const moment = require('moment');
// // eslint-disable-next-line no-undef
// mongoose.connect(process.env.dataURL, { useNewUrlParser: true, useUnifiedTopology: true });
// // eslint-disable-next-line no-undef
// mongoose.connection.on('connected', ()=>{
// 	console.log('[✅ DataBase] Connected!');
// });

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

function delay(t, val) {
	return new Promise(function(resolve) {
		setTimeout(function() {
			resolve(val);
		}, t);
	});
}

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');

	let scheduledMessage = new cron.CronJob('00 38 11 * * *', async () => {
			const guild = client.guilds.cache.get('646686225737973770');
			const channel = guild.channels.cache.get('646686225737973773');

			const query = qs.stringify({
				populate: '*',
				filters: {
					date: {
					$eq: moment(new Date()).format("DD/MM"),
					},
				},
			}, {
			encodeValuesOnly: true,
			});

			console.log(moment(new Date()).format("DD/MM"))

			const { data } = await axios.get(`https://api.laterredumilieu.fr/api/tdms?${query}`); 
			console.log(data) 

			if(data && data.data && data.data.length > 0){
				for (let information of data.data) {
					console.log(information.attributes)
					let TDM = information.attributes
					console.log(TDM, TDM.img.data.attributes.url);
					let embed = new Discord.MessageEmbed()
					.setTitle(TDM.title)
					.setDescription(TDM.desc)
					.setColor("#ff6347")
					.setImage(`https://api.laterredumilieu.fr${TDM.img.data.attributes.url}`)
					.setAuthor(`ANNÉE ${TDM.year}`)
					.setFooter(`Aujourd'hui en Terre du Milieu • ${TDM.date}`);
					channel.send(embed)
					await delay(1800000);
				}
			}
		});

		// When you want to start it, use:
		scheduledMessage.start()

	// client.users.cache.find(user => user.id === 'USER-ID')
	// const user = client.users.fetch('931280660746879066').then(member => {

	// 	console.log(member)
		
	// })
	// .catch(console.error);
	
    client.user.setActivity('LA TERRE DU MILIEU', { type: 'LISTENING' });
});

// login to Discord with your app's token
client.login(process.env.TOKEN);

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.on('message', async (message) => {
	
		
		const email = client.user.email;
		// console.log(client);

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
		await client.commands.get(command).execute(message, args);
	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}
});


