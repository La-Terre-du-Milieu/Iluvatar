const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');


const BinaryFile = require('binary-file');
const fetch = require('node-fetch');
const url = require('url');
const https = require("https");
const fs = require("fs");
const { setTimeout } = require('node:timers/promises');
const moment = require('moment');

let dictionnaireArmy = {
	"-2": "Observer",
	"-1": "Aléatoire",
	3: "Homme",
	5: "Elfe",
	6: "Nain", 
	7: "Isengard", 
	8: "Mordor",
	9: "Gobelin",
	10: "Angmar"
  }
  
  let dictionnaireArmies = {
	1: "Homme",
	2: "Elfe",
	3: "Nain", 
	4: "Isengard", 
	5: "Mordor",
	6: "Gobelin",
	7: "Angmar"
  }
  
  function isNullOrWhitespace( input ) {
	return !input || !input.trim();
  }
  
  async function Read1ByteString(_reader) {
	let stringBuilder = []
  
		while (true)
		{
			let characterValue = await _reader.readInt8();
  
			if (characterValue == 0)
			{
				break;
			}
  
  
			stringBuilder.push(characterValue);
		}
  
		return stringBuilder.map(v => String.fromCodePoint(v)).join('');
  }
  
  async function Read2ByteString(_reader) {
	  let stringBuilder = []
  
		  while (true)
		  {
			  let characterValue = await _reader.readInt16();
  
			  if (characterValue == 0)
			  {
				  break;
			  }
  
			  stringBuilder.push(characterValue);
		  }
  
		  return stringBuilder.map(v => String.fromCodePoint(v)).join('');
  }
  
  async function ParsePlayerData(player)
		  {
			  let playerData = player.split(',');
			  let ApiPlayer = {
				  Name: playerData[0].substring(1),
				  ArmyReplayId: parseInt(playerData[5]),
				  Team: parseInt(playerData[7]),
				  Color: parseInt(playerData[4]),
				  Spot: parseInt(playerData[6])
			  };
			  return ApiPlayer
		  }
  
  
  async function ParsePlayers(playerData) {
	  var players = []
  
	  if (isNullOrWhitespace(playerData) || playerData.substring(1, 2) == "S=")
	  {
		  return players;
	  }
  
	  for (const player of playerData.substring(2, playerData.length - 2).split(':')) {
		if(isNullOrWhitespace(player)) {
		  continue;
		}
  
		let isPlayer = player.substring(0, 1) == "H"
  
		if (!isPlayer)
		{
			continue;
		}
		players.push(await ParsePlayerData(player));
	  }
	  return players;
  }
  
  async function ExtractInformations(playerData) {
	
	const newPlayerData = []
  
	for (const player of playerData) {
	  
	  player.ArmyReplayId = dictionnaireArmy[player.ArmyReplayId] 
	  player.Color = dictionnaireColor[player.Color] 
	  newPlayerData.push(player)
	}
  
	return newPlayerData
  
  }

module.exports = {
	data: new SlashCommandBuilder()
		.setName('replay')
		.setDescription('Replies with Pong!')
		.addAttachmentOption(option => 
			option.setName('replay')
				.setDescription('Choisir un replay')
				.setRequired(true)),
	async execute(interaction, client) {
        // console.log(interaction, "de")
		// console.log(interaction.options.getFocused(true))
		const target = interaction.options.getAttachment('replay')
		console.log(target)
		// const pingembed = new EmbedBuilder()
        // .setTitle('Commande ping')
        // .setDescription(`🌍 Bot latency **${Date.now() - interaction.createdTimestamp}ms** \n🔧  API Latency **${Math.round(client.ws.ping)}ms**`)
        // .setColor('Blurple')

		// const response = await fetch(target.url);

		// console.log(response, "dkedokek")

		// const body = await response.text();

		// console.log(body, "jdeide");
		

		// console.log(response, "djeidje")

		// const newUrl = url.fileURLToPath(target.url)

		// const file = fs.createWriteStream("replay.BfME2Replay");

		// const request = https.get(
		// 	target.url,
		// 	function (response) {
		// 	  response.pipe(file);
		// 	}
		// );

		// console.log(request, file, "jdeijdiejidej")
		
		// const file = fs.createWriteStream(target.name);
		// https.get(target.proxyURL, function (response) {
		// 	console.log(response, "dejidjedje")
		// 	response.pipe(file);
		// });

		async function getRemoteFile(file, url) {
			let localFile = fs.createWriteStream(file);
			const request = https.get(url, function(response) {
				response.pipe(localFile);
			});
		}

		let test = getRemoteFile(target.name, target.url)

		console.log(test, "test")

		await setTimeout(1000);
  		console.log("Waited 5s");

		// console.log("alallala")
		// console.log(newUrl, "newurl")

		const myBinaryFile = new BinaryFile(target.name, 'r', true);
		(async function () {
		try {
			let replayData = new Object();

			await myBinaryFile.open();
			const fileType = await myBinaryFile.readString(8); // BFME2RPL

			replayData.ReplayFileType = fileType; // BFME2RPL

			replayData.TimestampStart = await myBinaryFile.readUInt32() // 1669235905
			replayData.TimestampEnd = await myBinaryFile.readUInt32() // 1669237648
			
			replayData.Unknown1 = await myBinaryFile.read(21); // Unknown1

			replayData.FileName = await Read2ByteString(myBinaryFile); // File name

			await myBinaryFile.readUInt16(); // Unknown2
			await myBinaryFile.readUInt16(); // Unknown2 
			await myBinaryFile.readUInt16(); // Unknown2 
			await myBinaryFile.readUInt16(); // Unknown2 
			await myBinaryFile.readUInt16(); // Unknown2 
			await myBinaryFile.readUInt16(); // Unknown2 
			await myBinaryFile.readUInt16(); // Unknown2 
			await myBinaryFile.readUInt16(); // Unknown2 

			replayData.Version = await Read2ByteString(myBinaryFile); // Version
			replayData.BuildDate = await Read2ByteString(myBinaryFile); // Date du build
			replayData.VersionMinor = await myBinaryFile.readUInt16(); // Version minor
			replayData.VersionMajor = await myBinaryFile.readUInt16(); // Version major

			await myBinaryFile.read(13); // MagicHash Buffer

			replayData.HeaderRawData = await Read1ByteString(myBinaryFile); // Header

			if (!isNullOrWhitespace(replayData.HeaderRawData))
			{
				const headerRawData = replayData.HeaderRawData.split(';');

				let headerFields = {
				MapName: headerRawData[0].substring(6), // Name map
				MapCrc: headerRawData[1].replace("MC=", ""),
				MapFileSize: headerRawData[2].replace("MS=", ""), // Size
				Seed: headerRawData[3].replace("SD=", ""),
				MatchId: headerRawData[4].replace("GSID=", ""),
				Gt: headerRawData[5].replace("GT=", ""),
				Si: headerRawData[6].replace("SI=", ""),
				Gr: headerRawData[7].replace("GR=", ""),
				Unknown1: headerRawData[9]
				}
				
				headerFields.Players = await ParsePlayers(headerRawData[8]); // Parse Player

				try {
				const parsedSeed = parseInt(headerFields.Seed);

				const _mask = 0xFFFFFFFF;
				let _currentSeed;

				console.log(parsedSeed, "parsedSeed")

				if (parsedSeed > 0)
				{

					async function PerformMask(largenumber) {
						//return largenumber & _mask;
						return (largenumber & _mask) >>> 0
					} 

					async function multiply_uint32(a, b) {
						var ah = (a >> 16) & 0xffff, al = a & 0xffff;
						var bh = (b >> 16) & 0xffff, bl = b & 0xffff;
						var high = ((ah * bl) + (al * bh)) & 0xffff;
						return ((high << 16)>>>0) + (al * bl);
					}

					async function NextRng() {

						_currentSeed = BigInt(_currentSeed);

						// Generate the xorfactor
						let xorFactor = _currentSeed * 134775813n >> 32n;
						
						var xorFactorMasked = xorFactor & 0xFFFFFFFFn;
						
						var _currentSeed2 = (_currentSeed * 134775813n + 1n) & 0xFFFFFFFFn;

						_currentSeed = Number(_currentSeed2);

						// Return random value
						return Number(_currentSeed2 ^ xorFactorMasked);
					} 

					
					// let rng = new RotwkRngService(parsedSeed);
					_currentSeed = await PerformMask(await multiply_uint32(parsedSeed, 0x7FFFFFED));

					if(!headerFields.Players.some(x => x.Spot >= 0)){
						await NextRng()
					}

					let occupiedColors = []

					for (const player of headerFields.Players) {
						if (player.Color >= 0) // -1 means random
						occupiedColors.push(player.Color);
					}

					let obsCount = headerFields.Players.filter((p) => p.ArmyReplayId === -2).length

					async function RepeatAction(repeatCout, action) {

						for (let i = 0; i < repeatCout; i++) {
						console.log("ACTION", repeatCout)
						action();
						}
					} 

					RepeatAction(obsCount, () => NextRng());

					let skip = parsedSeed % 7;

					async function NextRngInRange(start, end) {

						let next = await NextRng();

						let modu = next % (end - start + 1);

						return start + modu;
			
					} 

					async function FromRandom(factionId) {

						let i = 0;
						for (let f = 0; f < 7; f++) {
						if (factionId == i)
							{
								return f;
							}
							i++;
						}
						return null;

					} 

					async function NextRandomFaction() {

						var r = await NextRngInRange(0, 1000);

						var faction = r % 7;

						return await FromRandom(faction);
			
					} 

					for (const player of headerFields.Players) {

						let factionInReplay = dictionnaireArmy[player.ArmyReplayId];

						console.log(factionInReplay, "djedjedeji", skip, player)
						if (factionInReplay == "Aléatoire")
						{
							// RNG skip the engine does, we don't know why.
							RepeatAction(skip, () => NextRng());

							let resolvedFaction = await NextRandomFaction();
							console.log(resolvedFaction, "resolve")
							player.Army = dictionnaireArmies[resolvedFaction];
						}
						else
						{
							player.Army = factionInReplay.toString();
						}

						if (player.Color == -1)
						{
							while (true)
							{
								var randomColor = await NextRngInRange(0, 11 - 1);
								if (!occupiedColors.includes(randomColor))
								{
									occupiedColors.push(randomColor);
									console.log(randomColor, "randomColor")
									player.Color = randomColor;

									break;
								}
							}
						}


					}
				}

				} catch (e) {
				console.log(e)
				}

				replayData.HeaderFields = headerFields;
			}

			console.log(replayData, replayData.HeaderFields)

			await myBinaryFile.close();
			console.log('File closed');
			fs.unlinkSync( target.name )

			console.log("je passe là", replayData.HeaderFields)

			let newField = replayData.HeaderFields.Players.map(p => {
				return {
					name: `${p.Name}`,
					value: `${p.Army}`,
					inline: p.ArmyReplayId != -2 ? true : false
				}
			})
			const replayEmbed = new EmbedBuilder()
				.setTitle(replayData?.FileName)
				.setDescription(`🗺️ Carte : ${replayData.HeaderFields.MapName}\n`)
				.addFields(newField)
				.setColor('#E74C3C')
				.setTimestamp()
				.setFooter({ text: `⌛ Durée de la partie : ${Math.ceil(moment.duration(moment.unix(replayData.TimestampEnd).diff(moment.unix(replayData.TimestampStart))).asMinutes())} minutes` });
				// .addFields(
				// 	{ name: 'Homme', value: nbPlayerHomme, inline: true },
				// 	{ name: 'Elfe', value: nbPlayerElfe, inline: true },
				// 	{ name: 'Nain', value: nbPlayerNain, inline: true },
				// 	{ name: 'Mordor', value: nbPlayerMordor, inline: true },
				// 	{ name: 'Isengard', value: nbPlayerIsengard, inline: true },
				// 	{ name: 'Gobelin', value: nbPlayerGobelin, inline: true },
				// 	{ name: 'Angmar', value: nbPlayerAngmar, inline: true },
				// )
				// .setImage("https://cdn.discordapp.com/attachments/974023030865006662/1043959875706826802/Polish_20221114_233227252.jpg")
				// .setThumbnail('https://cdn.discordapp.com/attachments/647478928427974679/816689802815602729/logo.png')
	
			console.log("je passe là 2")
			interaction.reply({embeds:[replayEmbed]})

		} catch (err) {
			console.log(`There was an error: ${err}`);
		}
		})();

  
        
	},
};