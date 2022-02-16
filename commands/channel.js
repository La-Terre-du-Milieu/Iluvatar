const GSheetReader = require("g-sheets-api");
const fetch = require("node-fetch");
const Discord = require('discord.js');

module.exports = {
	name: 'gdetest42',
	description: '494',
	async execute(message) {


        const options = {
            apiKey: 'AIzaSyBIYggQiFUmP8l_KlG6gJ51xEwGQQ5aXkM',
            sheetId: '1r4bV8-CQoE1zEUxKI2eBrWwZ03szyNYqcNc-A6IrW98',
            sheetName: 'Réponses au formulaire 1'
          }


        const factions = [[1, 'Arnor'], [2, 'Gondor'], [3, 'Rohan'], 
        [4, 'Elfe'], [5, 'Nain'], [6, 'Mordor'], [7, 'Isengard'],
        [8, 'Gobelin'], [9, 'Angmar']];
        const factionsIcon = [[1, '<:arnor:889393697094004736>'], [2, '<:gondor:646704301497909270>'], [3, '<:rohan:646704340551073842>'],
        [4, '<:elfe:889393972919812106>'], [5, '<:nain:646704282896302122>'], [6, '<:mordor:889395650339418172>'], [7, '<:isengard:646704088150573076>'],
        [8, '<:gobelin:646704470226370571>'], [9, '<:angmar:646704322033483776>']];
        const mapType = [[2, '\:one:  \:vs:  \:one:'], [4, '\:two:  \:vs:  \:two:'], [6, '\:three:  \:vs:  \:three:']];


        const Factions = new Map(factions);
        const FactionsLogo = new Map(factionsIcon);
        const MapType = new Map(mapType);

        const Dictionnaire = new Map();

        mySet2 = new Set([1, 2, 3, 4]);

        await GSheetReader(
            options,
            results => {
                // console.log(results)
                results.map(result => {
                Dictionnaire.set(result['Pseudo en jeu et sur la carte'], result['Identifiant Discord'])
                }) 
            },
            error => {
                console.log(error)
            }
          );

          
        // console.log(Dictionnaire, "dico")
        // console.log(Dictionnaire.get("Elessar"), "Elessar")
        // console.log(Dictionnaire.get("Elrohir"), "Elrohir")
        

        let listMatch = []

        await fetch("https://api.npoint.io/2eeb1bea715cd907d7bc")
        .then((response) => response.json())
        .then((data) => {
            for (let d in data) {
                if(data[d].hasOwnProperty("fight") && data[d]["fight"] === "inline") {
                    listMatch.push(data[d])
                }
            }

        }).catch(err => {
            console.log(err)
        });

        // message.channel.send(listMatch);
        console.log(listMatch, "LISTE MATCH")

        let factionsPlayer = []

        await fetch("https://api.npoint.io/2eeb1bea715cd907d7bc/factions")
        .then((response) => response.json())
        .then((data) => {
            for (let d in data) {
                factionsPlayer.push(data[d])
            }
        }).catch(err => {
            console.log(err)
        });


        console.log(factionsPlayer, "LISTE factions")
        

        listMatch.map(async region => {
            let players = []
            let playersEmbed = []
            let chefdeFaction = []
            let chefdeFactionEmbed = []
            let error = []
            let factions = []

            for (let player of region["players"]) {


                console.log(Dictionnaire.get(player["name"].trim()), "???")

                if(Dictionnaire.get(player["name"].trim())) {

                    console.log("JE PASSE ICI ?")
                    
                    let r = Dictionnaire.get(player["name"].trim())
                    console.log(r)
                    
                    await message.guild.members.fetch({ user:[r], cache: false })
                    .then(member => {
                        console.log(member.first().user.id, "member.first().user.id")
                        players.push({
                            id: member.first().user.id,
                            allow: ['VIEW_CHANNEL']
                        })
                        playersEmbed.push({
                            name: player["name"].trim() + FactionsLogo.get(parseInt(player["faction"])),
                            faction: Factions.get(parseInt(player["faction"]))
                        })
                        if (!factions.includes(parseInt(player["faction"]))) {
                            factions.push(parseInt(player["faction"]));
                        }
                    })
                    .catch(console.error);



                } else {
                    error.push(region["name"] + " " + player["name"].trim())
                }
            };

            // const obj = players.find(x => x.id === 2)

            console.log(players, playersEmbed, "players")
              
            for (let p of factionsPlayer) {
                console.log(factions.some(x => x == p.id), "idjeidieide")

                if(factions.some(x => x == p.id)){
                    console.log("JE PASSE ???")
                    let r = Dictionnaire.get(p.chef.trim())
                    console.log(r, p.chef.trim())
    
                    await message.guild.members.fetch({ user:[r], cache: false })
                        .then(member => {
                            console.log(member.first().user.id, "CHEF DE FACTION")
                            chefdeFaction.push({
                                id: member.first().user.id,
                                allow: ['VIEW_CHANNEL']
                            })
                            chefdeFactionEmbed.push({
                                name: p.chef.trim() + FactionsLogo.get(parseInt(p.id)),
                                faction: Factions.get(parseInt(p.id))
                            })
                        })
                        .catch(console.error);
                }
            }


            let msg = players.map(p => {
                return `<@${p.id}>`
            })

            let Fields = playersEmbed.map(p => {
                return {
                    name: `${p.name}`,
                    value: `${p.faction}`,
                    inline: true
                }
            })

            let Fields2 = chefdeFactionEmbed.map(p => {
                return {
                    name: `${p.name}`,
                    value: `${p.faction}`,
                    inline: true
                }
            })

            console.log(msg)

            console.log("PERMISSOON", chefdeFaction, players, [...chefdeFaction, ...players])

            if(players){
                await message.guild.channels.create(region["name"], { //Create a channel
                    type: 'text', //Make sure the channel is a text channel
                    parent: '646688762595901450', //catégorie La Guerre de l'Eriador 
                    topic: region["description"],
                    permissionOverwrites: [...chefdeFaction, ...players],
                }).then(channel => {

                    let color = region["color"];

                    if(region["color"] === "#3300000") {
                        console.log("djeijdiedeji")
                        color = '#737273'
                    }
    
                    let embed = new Discord.MessageEmbed()
                    .setTitle(region["name"])
                    .setDescription(region["description"])
                    .addField("Région <:gameGDE:814863462609453076>", region["region"])
                    .addField("Type de carte \:map:", MapType.get(region["map"]))
                    .addField("Joueurs dans la région \:crossed_swords:", Fields.length)
                    .addFields(Fields)
                    .addField("Chefs de faction", Fields2.length)
                    .addFields(Fields2)
                    .setColor(color)
                    .setImage(region["img"])
                    .attachFiles(new Discord.MessageAttachment("https://cdn.discordapp.com/attachments/910888414306529321/936224043433074728/logo.png", 'thumbnail.png'))
                    .setThumbnail('attachment://thumbnail.png')
                    .setFooter('Eru Ilúvatar');
                    
                    channel.send(embed)
                    // channel.send(`Nouveau match ${msg}\n\n Veuillez remplir le doodle avant mercredi 18h\n\nBonne chance !`);
                    channel.send(`Liste des erreur ${error}.`);
                }).catch(console.error)
            };          
        })
    },
};

