const GSheetReader = require("g-sheets-api");
const fetch = require("node-fetch");
const Discord = require('discord.js')
const client = new Discord.Client();
module.exports = {
	name: 'gdetest',
	description: '494',
	async execute(message) {


        const options = {
            apiKey: 'AIzaSyBIYggQiFUmP8l_KlG6gJ51xEwGQQ5aXkM',
            sheetId: '1r4bV8-CQoE1zEUxKI2eBrWwZ03szyNYqcNc-A6IrW98',
            sheetName: 'Réponses au formulaire 1'
          }


        const Dictionnaire = new Map();

        // const readerOptions = {
        //     sheetId: "1innwKbd8HFpXSF3FVH90NiIG5nCACNHf587Vxw1bN3E",
        //     returnAllResults: true
        //   };

        // reader(readerOptions, (results) => {
        //     results.map(result => {
        //         Dictionnaire.set(result['Pseudo GDA'], result['Identifiant Discord (Elrohir#8420)'])
        //     })  
        // }); 

        await GSheetReader(
            options,
            results => {
                console.log(results)
                results.map(result => {
                Dictionnaire.set(result['Pseudo en jeu et sur la carte'], result['Identifiant Discord'])
                }) 
            },
            error => {
                console.log(error)
            }
          );

          
        console.log(Dictionnaire, "dico")

        let newArray = []

        await fetch("https://api.npoint.io/2eeb1bea715cd907d7bc")
        .then((response) => response.json())
        .then((data) => {
            // console.log(data)
            // console.log("dedededede")

            for (let d in data) {
                if(data[d].hasOwnProperty("fight") && data[d]["fight"] === "inline") {
                    newArray.push(data[d])
                }
            }

        }).catch(err => {
            console.log(err)
        });


        let error = [] 
        newArray.map(async region => {
            let players = []

            for (player of region["players"]) {
                if(Dictionnaire.get(player["name"])) {
                    let username = Dictionnaire.get(player["name"]).split('#')[0];
                    await message.guild.members.fetch({query: username, limit: 1})
                    .then(members => {
                       const member = members.first();
                       players.push({
                           id: member.id,
                           allow: ['VIEW_CHANNEL']
                       })
                    })
                    .catch(console.error);
                } else {
                    error.push(region["name"] + " " + player["name"])
                }
                
            }

            console.log(players)

            await message.guild.channels.create(region["name"], { //Create a channel
                type: 'text', //Make sure the channel is a text channel
                topic: region["description"]
            }).then(channel => {
                channel.overwritePermissions(players)
                let category = message.guild.channels.cache.find(c => c.name == "Matchs GDA" && c.type == "category");
                if (!category) throw new Error("Category channel does not exist");
                channel.setParent(category.id);
            }).catch(console.error);
            
        })
        
        message.channel.send(error);

        // await message.guild.members.fetch({query: "Thieuthieu De Rune", limit: 1})
        //     .then(members => {
        //         const member = members.first();
        //         console.log(member)
        //     })

        // await message.guild.channels.create("name", { //Create a channel
        //     type: 'text', //Make sure the channel is a text channel
        //     topic: "description",
        //     permissionOverwrites: [
        //         { 
        //             id: '350677634847473676', 
        //             allow: [ 'VIEW_CHANNEL' ] 
        //         }
        //       ]
        // }).then(channel => {
        //     let category = message.guild.channels.cache.find(c => c.name == "Staff 💫" && c.type == "category");
        //     if (!category) throw new Error("Category channel does not exist");
        //     channel.setParent(category.id);
        // }).catch(console.error);
    },
};

