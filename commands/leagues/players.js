const qs = require('qs');
const axios = require('axios').default;

module.exports = {
	name: 'lfa',
	description: 'bobby',
	async execute(message) {
		message.delete({ timeout: 100 });
        const query = qs.stringify({
            fields: '*',
            populate: "*",
            pagination: {
                page: 1,
                pageSize: 50,
            },
        }, {
        encodeValuesOnly: true,
        });

		// console.log(moment(new Date()).format("DD/MM"))

		const { data } = await axios.get(`https://api.laterredumilieu.fr/api/players?${query}`); 
		console.log(data) 


		let fields = []

		let test = {}
		

		for (const [index, player] of data.data.sort((a, b) => b.attributes.elo - a.attributes.elo).entries()) {
			console.log(player, "o", index, test, fields, data.data.length - 1)
			if (index === data.data.length - 1) {
				test.name = `[${index + 1}] ${player.attributes.name} (${player.attributes.elo} points)`
				test.value = `---------------`
			} else {
				if((index + 1) % 2 == 0) {
					let position = `[${index + 1}]`;
					if(index+1 === 2){
						position = "🥈";
					}
					test.value = `${position} ${player.attributes.name} (${player.attributes.elo} points)`
					fields.push(test)
					test = {}
				} else {
					let position = `[${index + 1}]`;
					if(index+1 === 1){
						position = "🥇";
					}
					if(index+1 === 3){
						position = "🥉";
					}
					test.name = `${position} ${player.attributes.name} (${player.attributes.elo} points)`
				}
			}	
		}


		console.log(fields, "fields")

		const exampleEmbed = {
			color: 0x31d0c6,
			title: 'Classement de la Ligue 🐉',
			description: '------',
			fields: fields,
			timestamp: new Date(),
			footer: {
				text: "Pour actualiser le tableau suffit de d'écrire 'lfa'   "
			},
		};

		//CHANNEL ID
		let gdaChannel = message.guild.channels.cache.get("984087817451876414")
		
		// //MESSAGE ID
		gdaChannel.messages.fetch("984194857574731786")
		.then(msg => {
				msg.edit({ embed: exampleEmbed }	);
		})
		.catch(console.error);	
		// }
		
		// message.channel.send({ embed: exampleEmbed }).then(() => {
            // message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
            //     .then(collected => {
            //         message.channel.send(`${collected.first().author} Bravo <:pippinjoy:647780678704037949> tu as trouvé !`);
            //     })
            //     .catch(collected => {
            //         message.channel.send("On dirait que personne n'a eu la réponse cette fois-ci.");
            //     });
        // }); 
    },
};