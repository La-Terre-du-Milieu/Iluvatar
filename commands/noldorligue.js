var Noldor = require('elo-rank');
var elo = new Noldor(50);

module.exports = {
	name: 'noldorligue',
	async execute(message, args) {
		message.delete({ timeout: 100 });
		// if (message.member.roles.cache.has('646700553648340993' || '646687065597149189')) {
		if (true) {
		// Embed creation 
		if(args[0] === "embed"){
			const exampleEmbed = new Discord.MessageEmbed()
			.setColor('#476C9B')
			.setTitle('Classement 1vs1 ROTWK FR')
			.setDescription("\
			Ressources : 1000\
			Points de commandement : 1x")
			// .addField('WAOU', 'DIJIDEIDJEI', true)
			.setThumbnail('https://cdn.discordapp.com/attachments/647478928427974679/826713327250047036/logowithshadow3.png')
			.setImage("https://cdn.discordapp.com/attachments/647478928427974679/826714297186385930/570078-rotwk_wallpaper4_10x7.png")
			.setTimestamp()
			.setFooter("Classement 1vs1", 'https://cdn.discordapp.com/attachments/647478928427974679/816674472689532938/rotwk.png')

			message.channel.send(exampleEmbed);
		}
		if(message.mentions.users.first()){
			const player = message.mentions.users.first();
			if(args[1]){
				let count = 0;
				let user2;
				message.mentions.users.forEach(user => {
					console.log(user)
					count++
					if (count === 1) return;
					else user2 = user
				});

				const Player1 = await Elfe.findOneAndUpdate(
					{ player: player.username },
					{
						
					},
					{ new: true, upsert: true }
				 )

				const Player2 = await Elfe.findOneAndUpdate(
					{ player: user2.username },
					{
						
					},
					{ new: true, upsert: true }
				 )

				//Gets expected score for first parameter
				const expectedScoreA = elo.getExpected(Player1.point, Player2.point);
				const expectedScoreB = elo.getExpected(Player2.point, Player1.point);

				//update score, 1 if won 0 if lost
				newScoreplayerA = elo.updateRating(expectedScoreA, 1, Player1.point);
				newScoreplayerB = elo.updateRating(expectedScoreB, 0, Player2.point);

				message.channel.send(`Nouveau Match dans la Noldor Ligue !\n\n${player.toString()} passe de ${Player1.point} points à ${newScoreplayerA} points\n${user2.toString()} passe de ${Player2.point} points à ${newScoreplayerB} points`)

				await Elfe.findOneAndUpdate(
					{ player: player.username },
					{
						$inc: { win: 1},
						point: newScoreplayerA
					},
					{ new: true, upsert: true }
				 )
				.then((info) => console.log(info))
				.catch((error) => console.log(error))

				await Elfe.findOneAndUpdate(
					{ player: user2.username },
					{
						$inc: { lose: 1},
						point: newScoreplayerB
					},
					{ new: true, upsert: true }
				 )
				.then((info) => console.log(info))
				.catch((error) => console.log(error))
			}
		}

		const docs = await Elfe.find({}).sort({point: -1});

		const newArray = docs.map((doc, index) => {
			let pourcentage = (doc.win/(doc.win + doc.lose) * 100)
			let name = `#${index+1} ${doc.player} (${doc.point} pts)`
			let value = `${doc.win} - ${doc.lose} | (${pourcentage.toFixed()}%)`
			return {
				name: name,
				value: value, 
				inline: true
			}
		})

		//CHANNEL ID
		let gdaChannel = message.guild.channels.cache.get("834506477712441344")
		
		// //MESSAGE ID
		gdaChannel.messages.fetch("834704933081186344")
		.then(msg => {

				const newEmbed = new Discord.MessageEmbed()
				.setColor('#476C9B')
				.setTitle('NOLDOR LIGUE !')
				.setDescription("Pour mettre une game suffit d'écrire dans l'ordre victoire défaite 'noldorligue @joueurA @joueur B'")
				.addField("Les Règles", "💰 Ressources: 1000\n ✨ Points de Commandements: 1\n 🎲 Faction : Aléatoire\n 🗺️ Map au choix")
				.setThumbnail('https://cdn.discordapp.com/attachments/647478928427974679/826713327250047036/logowithshadow3.png')
				.setImage("https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/514e7a49-35f5-4378-bbc3-73d36b9a10e6/d87ti10-9a38f230-3e83-44ba-a5c5-2bdabc8cad8e.jpg/v1/fill/w_1280,h_610,q_75,strp/gate_of_the_noldor_by_jonathanguzi_d87ti10-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOiIsImlzcyI6InVybjphcHA6Iiwib2JqIjpbW3siaGVpZ2h0IjoiPD02MTAiLCJwYXRoIjoiXC9mXC81MTRlN2E0OS0zNWY1LTQzNzgtYmJjMy03M2QzNmI5YTEwZTZcL2Q4N3RpMTAtOWEzOGYyMzAtM2U4My00NGJhLWE1YzUtMmJkYWJjOGNhZDhlLmpwZyIsIndpZHRoIjoiPD0xMjgwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.JUa8ewk3Ma9msW6NfdOKPtEtLrmdL8w-l5oPBv3np80")
				.addFields(newArray)
				.setTimestamp()
				.setFooter("Noldor Ligue", 'https://cdn.discordapp.com/emojis/646704226096906270.png?v=1')

				msg.edit(newEmbed);
		})
		.catch(console.error);	
		}
	},
};