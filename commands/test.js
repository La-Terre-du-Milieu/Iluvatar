module.exports = {
	name: 'test',
	async execute(message, args) {
		message.delete({ timeout: 100 });
		
		// Embed creation 
		if(args[0] === "embed"){
			const exampleEmbed = new Discord.MessageEmbed()
			.setColor('#476C9B')
			.setTitle('Classement 1vs1 ROTWK FR')
			.setDescription("Classement des joueurs")
			// .addField('WAOU', 'DIJIDEIDJEI', true)
			.setThumbnail('https://cdn.discordapp.com/attachments/647478928427974679/826713327250047036/logowithshadow3.png')
			.setImage("https://cdn.discordapp.com/attachments/647478928427974679/826714297186385930/570078-rotwk_wallpaper4_10x7.png")
			.setTimestamp()
			.setFooter("Classement 1vs1", 'https://cdn.discordapp.com/attachments/647478928427974679/816674472689532938/rotwk.png')

			message.channel.send(exampleEmbed);
		}
		if(message.mentions.users.first()){
			console.log(args);
			let player = message.mentions.users.first();
			if (args[0] === "delete"){
				await Rank.deleteOne({ player: player.username})
				.then((info) => console.log(info))
				.catch((error) => console.log(error))
			}else{
				let point = 0;
				if(typeof args[1]) point = args[1]
				await Rank.findOneAndUpdate(
					{ player: player.username },
					{ point: point },
					{ new: true, upsert: true }
				 )
				.then((info) => console.log(info))
				.catch((error) => console.log(error))
			}
		}

		// console.log(Rank.find({}))

		const docs = await Rank.find({}).sort({point: -1});

		const newArray = docs.map((doc) => {
			return {
				name: doc.player,
				value: doc.point, 
				inline: true
			}
		})
		console.log(newArray)
		console.log("djkeiodjeidj")
		// message.channel.send(docs);


		//CHANNEL ID
		let gdaChannel = message.guild.channels.cache.get("818445025410809887")
		
		// //MESSAGE ID
		gdaChannel.messages.fetch("826714566050054144")
		.then(msg => {

				const newEmbed = new Discord.MessageEmbed()
				.setColor('#476C9B')
				.setTitle('Classement 1vs1 ROTWK FR')
				.setDescription("Classement des joueurs")
				.setThumbnail('https://cdn.discordapp.com/attachments/647478928427974679/826713327250047036/logowithshadow3.png')
				.setImage("https://cdn.discordapp.com/attachments/647478928427974679/826714297186385930/570078-rotwk_wallpaper4_10x7.png")
				.addFields(newArray)
				.setTimestamp()
				.setFooter("Classement 1vs1", 'https://cdn.discordapp.com/attachments/647478928427974679/816674472689532938/rotwk.png')

				msg.edit(newEmbed);
		})
		.catch(console.error);
	},
};