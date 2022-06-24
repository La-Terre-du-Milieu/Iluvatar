const qs = require('qs');
const axios = require('axios').default;
const moment = require('moment');
moment.locale('fr')
module.exports = {
	name: 'liguegame',
	description: 'bobby',
	async execute(message) {
		message.delete({ timeout: 100 });
        const query = qs.stringify({
            fields: '*',
			sort: ['date:desc'],
			populate: {
				populate: "*",
				replays: {
                    populate: '*'
                },
			},
            pagination: {
                page: 1,
                pageSize: 50,
            },
        }, {
        encodeValuesOnly: true,
        });

		// console.log(moment(new Date()).format("DD/MM"))

		const { data } = await axios.get(`https://api.laterredumilieu.fr/api/games?${query}`); 
		console.log(data) 


		let fields = []

		let test = {
			name: "",
			value: ""
		}
		

		for (const [index, player] of data.data.entries()) {
			
			console.log(player, "jdeijdiedjei", player.attributes.replays)

			console.log(player.attributes.replays[0].faction_win.data.attributes.name)

			test.name = `${moment(player.attributes.date).format("dddd Do MMMM à HH:mm")} - BO${player.attributes.bo}`

			for await (const [index, replay] of player.attributes.replays.entries()){
				console.log(replay)
				// test.value += `Ma`
				test.value += `Match ${index+1} ${replay.player_win.data.attributes.name} (${replay.faction_win.data.attributes.name}) VS (${replay.faction_lose.data.attributes.name}) ${replay.player_lose.data.attributes.name}\n`
			}
			
			fields.push(test);
			test = {
				name: "",
				value: ""
			}
		}


		console.log(fields, "fields")

		const exampleEmbed = {
			color: 0x31d0c6,
			title: 'Historique de la Ligue 🐉',
			description: 'joueur (victoire) - faction vs faction - joueur (défaite)',
			fields: fields.slice(0, 25).reverse(),
			timestamp: new Date(),
			footer: {
				text: "Pour actualiser le tableau suffit de d'écrire 'liguegame'   "
			},
		};

		//CHANNEL ID
		let gdaChannel = message.guild.channels.cache.get("984564579751325737")
		
		// //MESSAGE ID
		gdaChannel.messages.fetch("984564687230361600")
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