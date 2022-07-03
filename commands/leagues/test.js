// const qs = require('qs');
// const axios = require('axios').default;

// module.exports = {
// 	name: 'pl',
// 	description: 'bobby',
// 	async execute(message) {
// 		message.delete({ timeout: 100 });
//         const query = qs.stringify({
//             fields: '*',
//             populate: "*",
//             pagination: {
//                 page: 1,
//                 pageSize: 50,
//             },
//         }, {
//         encodeValuesOnly: true,
//         });

// 		// console.log(moment(new Date()).format("DD/MM"))

// 		const { data } = await axios.get(`https://api.laterredumilieu.fr/api/players?${query}`); 
// 		console.log(data) 


// 		let fields = []

// 		let test = {}
		

// 		for (const [index, player] of data.data.sort((a, b) => b.attributes.elo - a.attributes.elo).entries()) {
			
//             if(player.attributes.discord == "514692346215137280")
//             await message.guild.members.fetch({ user:[player.attributes.discord], cache: false })
//             .then(member => {
//                 console.log(member, "MEMBER")
//             })
// 		}


// 		console.log(fields, "fields")

// 		// const exampleEmbed = {
// 		// 	color: 0x31d0c6,
// 		// 	title: 'Classement de la Ligue 🐉',
// 		// 	description: '------',
// 		// 	fields: fields,
// 		// 	timestamp: new Date(),
// 		// 	footer: {
// 		// 		text: "Pour actualiser le tableau suffit de d'écrire 'lfa'   "
// 		// 	},
// 		// };

// 		// //CHANNEL ID
// 		// let gdaChannel = message.guild.channels.cache.get("984087817451876414")
		
// 		// // //MESSAGE ID
// 		// gdaChannel.messages.fetch("984194857574731786")
// 		// .then(msg => {
// 		// 		msg.edit({ embed: exampleEmbed }	);
// 		// })
// 		// .catch(console.error);	



// 		// }
		
// 		// message.channel.send({ embed: exampleEmbed }).then(() => {
//             // message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
//             //     .then(collected => {
//             //         message.channel.send(`${collected.first().author} Bravo <:pippinjoy:647780678704037949> tu as trouvé !`);
//             //     })
//             //     .catch(collected => {
//             //         message.channel.send("On dirait que personne n'a eu la réponse cette fois-ci.");
//             //     });
//         // }); 
//     },
// };