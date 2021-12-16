// var EloRank = require('elo-rank');
// var elo = new EloRank(50);

// module.exports = {
// 	name: 'elroligue',
// 	async execute(message, args) {
// 		message.delete({ timeout: 100 });
// 		if (message.member.roles.cache.has('646700553648340993' || '646687065597149189')) {
// 		// Embed creation 
// 		if(args[0] === "embed"){
// 			const exampleEmbed = new Discord.MessageEmbed()
// 			.setColor('#476C9B')
// 			.setTitle('Classement 1vs1 ROTWK FR')
// 			.setDescription("\
// 			Ressources : 1000\
// 			Points de commandement : 1x")
// 			// .addField('WAOU', 'DIJIDEIDJEI', true)
// 			.setThumbnail('https://cdn.discordapp.com/attachments/647478928427974679/826713327250047036/logowithshadow3.png')
// 			.setImage("https://cdn.discordapp.com/attachments/647478928427974679/826714297186385930/570078-rotwk_wallpaper4_10x7.png")
// 			.setTimestamp()
// 			.setFooter("Classement 1vs1", 'https://cdn.discordapp.com/attachments/647478928427974679/816674472689532938/rotwk.png')

// 			message.channel.send(exampleEmbed);
// 		}
// 		if(message.mentions.users.first()){
// 			const player = message.mentions.users.first();
// 			if(args[1]){
// 				console.log(args)
// 				console.log(message.mentions.users.first())
// 				let count = 0;
// 				let user2;
// 				message.mentions.users.forEach(user => {
// 					console.log(user)
// 					count++
// 					if (count === 1) return;
// 					else user2 = user
// 				});
// 				console.log(user2);

// 				const Player1 = await Rank.findOneAndUpdate(
// 					{ player: player.username },
// 					{
						
// 					},
// 					{ new: true, upsert: true }
// 				 )
				
// 				// const Player2 = await Rank.findOne({ player: user2});

// 				const Player2 = await Rank.findOneAndUpdate(
// 					{ player: user2.username },
// 					{
						
// 					},
// 					{ new: true, upsert: true }
// 				 )

// 				console.log(Player1);
// 				console.log(Player2);

// 				//Gets expected score for first parameter
// 				const expectedScoreA = elo.getExpected(Player1.point, Player2.point);
// 				const expectedScoreB = elo.getExpected(Player2.point, Player1.point);
				
// 				console.log(expectedScoreA);
// 				console.log(expectedScoreB);

// 				//update score, 1 if won 0 if lost
// 				newScoreplayerA = elo.updateRating(expectedScoreA, 1, Player1.point);
// 				newScoreplayerB = elo.updateRating(expectedScoreB, 0, Player2.point);
				
// 				console.log(newScoreplayerA);
// 				console.log(newScoreplayerB);

// 				message.channel.send(`Nouveau Match dans la Elroligue !\n\n${player.toString()} passe de ${Player1.point} points à ${newScoreplayerA} points\n${user2.toString()} passe de ${Player2.point} points à ${newScoreplayerB} points`)

// 				await Rank.findOneAndUpdate(
// 					{ player: player.username },
// 					{
// 						$inc: { win: 1},
// 						point: newScoreplayerA
// 					},
// 					{ new: true, upsert: true }
// 				 )
// 				.then((info) => console.log(info))
// 				.catch((error) => console.log(error))

// 				await Rank.findOneAndUpdate(
// 					{ player: user2.username },
// 					{
// 						$inc: { lose: 1},
// 						point: newScoreplayerB
// 					},
// 					{ new: true, upsert: true }
// 				 )
// 				.then((info) => console.log(info))
// 				.catch((error) => console.log(error))


// 			}
// 			else {
// 			if (args[0] === "delete"){
// 				await Rank.deleteOne({ player: player.username})
// 				.then((info) => console.log(info))
// 				.catch((error) => console.log(error))
// 			}else if (args[1] === "win"){
// 				await Rank.findOneAndUpdate(
// 					{ player: player.username },
// 					{
// 						$inc: { win: 1, point: 50}
// 					},
// 					{ new: true, upsert: true }
// 				 )
// 				.then((info) => console.log(info))
// 				.catch((error) => console.log(error))
// 			}else if (args[1] === "lose"){
// 				await Rank.findOneAndUpdate(
// 					{ player: player.username },
// 					{
// 						$inc: { lose: 1, point: -50}
// 					},
// 					{ new: true, upsert: true }
// 				 )
// 				.then((info) => console.log(info))
// 				.catch((error) => console.log(error))
// 			}else{
// 				let point = 0;
// 				if(typeof args[1]) point = args[1]
// 				await Rank.findOneAndUpdate(
// 					{ player: player.username },
// 					{ point: point },
// 					{ new: true, upsert: true }
// 				 )
// 				.then((info) => console.log(info))
// 				.catch((error) => console.log(error))
// 			}
// 			}
// 		}

// 		// console.log(Rank.find({}))

// 		const docs = await Rank.find({}).sort({point: -1});

// 		const newArray = docs.map((doc, index) => {
// 			let pourcentage = (doc.win/(doc.win + doc.lose) * 100)
// 			let name = `#${index+1} ${doc.player} (${doc.point} pts)`
// 			let value = `${doc.win} - ${doc.lose} | (${pourcentage.toFixed()}%)`
// 			return {
// 				name: name,
// 				value: value, 
// 				inline: true
// 			}
// 		})

// 		//CHANNEL ID
// 		let gdaChannel = message.guild.channels.cache.get("826797824820772895")
		
// 		// //MESSAGE ID
// 		gdaChannel.messages.fetch("826798088201961534")
// 		.then(msg => {

// 				const newEmbed = new Discord.MessageEmbed()
// 				.setColor('#476C9B')
// 				.setTitle('Classement 1vs1 ROTWK FR')
// 				.setDescription("BETA si vous voulez des informations c'est ici #replay-rotwk-league")
// 				.addField("Les Règles", "💰 Ressources: 1000\n ✨ Points de Commandements: 1\n 🎲 Faction : Aléatoire\n 🗺️ Map au choix de l'Host Neutre\n ✅ Host Neutre Obligatoire")
// 				.setThumbnail('https://cdn.discordapp.com/attachments/647478928427974679/826713327250047036/logowithshadow3.png')
// 				.setImage("https://cdn.discordapp.com/attachments/647478928427974679/826714297186385930/570078-rotwk_wallpaper4_10x7.png")
// 				.addFields(newArray)
// 				.setTimestamp()
// 				.setFooter("Classement 1vs1", 'https://cdn.discordapp.com/attachments/647478928427974679/816674472689532938/rotwk.png')

// 				msg.edit(newEmbed);
// 		})
// 		.catch(console.error);	
// 		}
// 	},
// };