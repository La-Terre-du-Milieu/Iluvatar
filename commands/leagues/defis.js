const qs = require('qs');
const axios = require('axios').default;
const client = new Discord.Client();
const { MessageMentions: { USERS_PATTERN } } = require('discord.js');

// function getUserFromMention(mention) {
// 	if (!mention) return;

// 	if (mention.startsWith('<@') && mention.endsWith('>')) {
// 		mention = mention.slice(2, -1);

// 		if (mention.startsWith('!')) {
// 			mention = mention.slice(1);
// 		}

// 		return client.users.cache.get(mention);
// 	}
// }

module.exports = {
	name: 'defis',
	description: 'bobby',
	async execute(message, args) {
		// message.delete({ timeout: 100 });

		console.log(message, args)
		//CHANNEL ID
		let gdaChannel = message.guild.channels.cache.get("985211699416137779")
		
		// //MESSAGE ID
		gdaChannel.messages.fetch("985211816156233858")
		.then(msg => {
				// console.log(msg.embeds[0].fields)
			
				
				if(args && args.length == 2){
					let newFields = []
					// console.log(args)
					let addField = {
						name: `[${new Date().toLocaleString("fr")}] ${args[0]} VS ${args[1]}`,
						value: `${new Date().valueOf()}`
					}
					newFields.push(addField)

					if(msg.embeds[0].fields && msg.embeds[0].fields.length > 0){
						// let fields = msg.embeds[0].fields.filter(f => f.value != args[0]);
						// console.log(fields, "NEW FIELDS")
						const exampleEmbed = {
							color: 0x31d0c6,
							title: 'Liste des défis en cours de la Ligue 🐉',
							description: 'Commandes :\ndefis joueurA joueurB \n(exemple : defis bobby gollum)\nsupprimer un defis : defis id du défis\n(exemple : defis 486468488)',
							fields: [...newFields, ...msg.embeds[0].fields],
							timestamp: new Date()
						};
						msg.edit({ embed: exampleEmbed }	);
					} else {
						const exampleEmbed = {
							color: 0x31d0c6,
							title: 'Liste des défis en cours de la Ligue 🐉',
							description: 'Commandes :\ndefis joueurA joueurB \n(exemple : defis bobby gollum)\nsupprimer un defis : defis id du défis\n(exemple : defis 486468488)',
							fields: newFields,
							timestamp: new Date()
						};
						msg.edit({ embed: exampleEmbed }	);
					}
				} 

				if(args && args.length == 1){
					if(msg.embeds[0].fields && msg.embeds[0].fields.length > 0){
						let fields = msg.embeds[0].fields.filter(f => f.value != args[0]);
						console.log(fields, "NEW FIELDS")
						const exampleEmbed = {
							color: 0x31d0c6,
							title: 'Liste des défis en cours de la Ligue 🐉',
							description: 'Commandes :\ndefis joueurA joueurB \n(exemple : defis bobby gollum)\nsupprimer un defis : defis id du défis\n(exemple : defis 486468488)',
							fields: fields,
							timestamp: new Date()
						};
						msg.edit({ embed: exampleEmbed }	);
					} else {
						const exampleEmbed = {
							color: 0x31d0c6,
							title: 'Liste des défis en cours de la Ligue 🐉',
							description: 'Commandes :\ndefis joueurA joueurB \n(exemple : defis bobby gollum)\nsupprimer un defis : defis id du défis\n(exemple : defis 486468488)',
							// fields: fields,
							timestamp: new Date()
						};
						msg.edit({ embed: exampleEmbed }	);
					}
				}

				
		})
		.catch(console.error);
    },
};