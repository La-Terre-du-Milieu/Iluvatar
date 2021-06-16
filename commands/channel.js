const reader = require("g-sheets-api");
const fetch = require("node-fetch");
module.exports = {
	name: 'supertest',
	description: '494',
	async execute(message) {

        const Dictionnaire = new Map();

        const readerOptions = {
            sheetId: "1innwKbd8HFpXSF3FVH90NiIG5nCACNHf587Vxw1bN3E",
            returnAllResults: true
          };

        reader(readerOptions, (results) => {
            results.map(result => {
                Dictionnaire.set(result['Pseudo GDA'], result['Identifiant Discord (Elrohir#8420)'])
            })  
        }); 

        let newArray = []

        await fetch("https://api.npoint.io/38a2899b98818d89418c")
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            console.log("dedededede")

            for (let d in data) {
                if(data[d].hasOwnProperty("fight") && data[d]["fight"] === "inline") {
                    newArray.push(data[d])
                }
            }

        }).catch(err => {
            console.log(err)
        });

        let error = [] 
        newArray.map(region => {
            // Création du channel

            // Ajout des permissions de base

            // Parcourir la liste des joueurs
            
            region["players"].map(player => {
                if(Dictionnaire.get(player["name"])) {
                    console.log(Dictionnaire.get(player["name"]))
                } else {
                    error.push(region["name"] + player["name"])
                }
            })


            
        })

        
		message.channel.send(error);
          

    },
};