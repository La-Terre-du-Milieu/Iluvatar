const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('factions')
		.setDescription('factions!'),
	async execute(interaction, client) {
        console.log(client, "de")

		await fetch("https://api.npoint.io/7a210a01331f3c385ed7/factions")
        .then(res => res.json())
		.then((json) => {

			let factions = []
			let factionsIco = {
				"homme": "<:homme:1043584166756888636>",
				"elfe": "<:elfe:889393972919812106>",
				"nain": "<:nain:646704282896302122>",
				"mordor": "<:mordor:889395650339418172>",
				"isengard": "<:isengard:646704088150573076>",
				"gobelin": "<:gobelin:646704470226370571>",
				"angmar": "<:angmar:646704322033483776>"
			}

			for (const key in json) {
				const obj = json[key];
				console.log(obj, "obj")
				factions.push({
					name: obj.name.charAt(0).toUpperCase() + obj.name.slice(1) + factionsIco[obj.name] ,
					value: `${obj.capital}`,
					inline: true
				})
			}

			return factions
		})
		.then(factions => {
			const pingembed = new EmbedBuilder()
			.setTitle('Liste des factions de la GDA')
			.addFields(factions)
			.setColor('blue')
	  
			interaction.reply({embeds:[pingembed], ephemeral: true})
		})
	},
};