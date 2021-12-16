// const fetch = require("node-fetch");
// module.exports = {
// 	name: 'ressources',
// 	description: 'ressources!',
// 	async execute(message) {
//         message.delete({ timeout: 100 });

//         let factions = []

//         let gda = []

// 		await fetch("https://api.npoint.io/38a2899b98818d89418c")
//         .then((response) => response.json())
//         .then((data) => {
//             gda = data
//             for (let d in data) {
//                 if(data[d].hasOwnProperty("elfe")){
//                     let faction = data[d]
//                     for (let y in faction) {
//                         factions.push(faction[y])
//                     }
//                 }
//             }
//         }).catch(err => {
//             console.log(err)
//         });  
        
//         let messageResult = "";

        

//         let elfeRessource = 0;
//         let rohanRessource = 0;
//         let mordorRessource = 0;
//         let gobelinRessource = 0;



//         for (let region in gda) {
//             if(gda[region].hasOwnProperty("structures") || gda[region].hasOwnProperty("outpost") || gda[region].hasOwnProperty("fortress") || gda[region].hasOwnProperty("capital")) {
                
                
//                 //ELFE
                
//                 if(gda[region]["color"] === "#00bfff") {
//                     if(gda[region].hasOwnProperty("outpost")) {
//                         elfeRessource += 250
//                     }
//                     if(gda[region].hasOwnProperty("foundation")) {
//                         if(gda[region].hasOwnProperty("structures")) {
//                             gda[region]["structures"].map(structure => {
//                                 if(structure.name === "Ferme") {
//                                     switch (structure.level) {
//                                         case 1:
//                                             elfeRessource += 300
//                                             break;
//                                         case 2:
//                                             elfeRessource += 400
//                                             break;
//                                         case 3:
//                                             elfeRessource += 500
//                                             break;
                                    
//                                         default:
//                                             break;
//                                     }
//                                 }
//                             })
//                         }
//                     }
//                     if(gda[region].hasOwnProperty("citadel")) {
//                         elfeRessource += 150
//                         if(gda[region].hasOwnProperty("structures")) {
//                             gda[region]["structures"].map(structure => {
//                                 if(structure.name === "Ferme") {
//                                     switch (structure.level) {
//                                         case 1:
//                                             elfeRessource += 300
//                                             break;
//                                         case 2:
//                                             elfeRessource += 400
//                                             break;
//                                         case 3:
//                                             elfeRessource += 500
//                                             break;
                                    
//                                         default:
//                                             break;
//                                     }
//                                 }
//                             })
//                         }
//                     }
//                     if(gda[region].hasOwnProperty("fortress")) {
//                         elfeRessource += 150
//                         if(gda[region].hasOwnProperty("structures")) {
//                             gda[region]["structures"].map(structure => {
//                                 if(structure.name === "Ferme") {
//                                     switch (structure.level) {
//                                         case 1:
//                                             elfeRessource += 300
//                                             break;
//                                         case 2:
//                                             elfeRessource += 400
//                                             break;
//                                         case 3:
//                                             elfeRessource += 500
//                                             break;
                                    
//                                         default:
//                                             break;
//                                     }
//                                 }
//                             })
//                         }
//                     }

                    
//                 }

//                 // Rohan


//                 if(gda[region]["color"] === "#0bff00") {
//                     if(gda[region].hasOwnProperty("outpost")) {
//                         rohanRessource += 250
//                     }
//                     if(gda[region].hasOwnProperty("foundation")) {
//                         if(gda[region].hasOwnProperty("structures")) {
//                             gda[region]["structures"].map(structure => {
//                                 if(structure.name === "Ferme") {
//                                     switch (structure.level) {
//                                         case 1:
//                                             rohanRessource += 300
//                                             break;
//                                         case 2:
//                                             rohanRessource += 400
//                                             break;
//                                         case 3:
//                                             rohanRessource += 500
//                                             break;
                                    
//                                         default:
//                                             break;
//                                     }
//                                 }
//                             })
//                         }
//                     }
//                     if(gda[region].hasOwnProperty("citadel")) {
//                         rohanRessource += 150
//                         if(gda[region].hasOwnProperty("structures")) {
//                             gda[region]["structures"].map(structure => {
//                                 if(structure.name === "Ferme") {
//                                     switch (structure.level) {
//                                         case 1:
//                                             rohanRessource += 300
//                                             break;
//                                         case 2:
//                                             rohanRessource += 400
//                                             break;
//                                         case 3:
//                                             rohanRessource += 500
//                                             break;
                                    
//                                         default:
//                                             break;
//                                     }
//                                 }
//                             })
//                         }
//                     }
//                     if(gda[region].hasOwnProperty("fortress")) {
//                         rohanRessource += 150
//                         if(gda[region].hasOwnProperty("structures")) {
//                             gda[region]["structures"].map(structure => {
//                                 if(structure.name === "Ferme") {
//                                     switch (structure.level) {
//                                         case 1:
//                                             rohanRessource += 300
//                                             break;
//                                         case 2:
//                                             rohanRessource += 400
//                                             break;
//                                         case 3:
//                                             rohanRessource += 500
//                                             break;
                                    
//                                         default:
//                                             break;
//                                     }
//                                 }
//                             })
//                         }
//                     }

                    
//                 }

//                 // Mordor

//                 if(gda[region]["color"] === "#db5461") {
//                     if(gda[region].hasOwnProperty("outpost")) {
//                         mordorRessource += 250
//                     }
//                     if(gda[region].hasOwnProperty("foundation")) {
//                         if(gda[region].hasOwnProperty("structures")) {
//                             gda[region]["structures"].map(structure => {
//                                 if(structure.name === "Ferme") {
//                                     switch (structure.level) {
//                                         case 1:
//                                             mordorRessource += 300
//                                             break;
//                                         case 2:
//                                             mordorRessource += 400
//                                             break;
//                                         case 3:
//                                             mordorRessource += 500
//                                             break;
                                    
//                                         default:
//                                             break;
//                                     }
//                                 }
//                             })
//                         }
//                     }
//                     if(gda[region].hasOwnProperty("citadel")) {
//                         mordorRessource += 150
//                         if(gda[region].hasOwnProperty("structures")) {
//                             gda[region]["structures"].map(structure => {
//                                 if(structure.name === "Ferme") {
//                                     switch (structure.level) {
//                                         case 1:
//                                             mordorRessource += 300
//                                             break;
//                                         case 2:
//                                             mordorRessource += 400
//                                             break;
//                                         case 3:
//                                             mordorRessource += 500
//                                             break;
                                    
//                                         default:
//                                             break;
//                                     }
//                                 }
//                             })
//                         }
//                     }
//                     if(gda[region].hasOwnProperty("fortress")) {
//                         mordorRessource += 150
//                         if(gda[region].hasOwnProperty("structures")) {
//                             gda[region]["structures"].map(structure => {
//                                 if(structure.name === "Ferme") {
//                                     switch (structure.level) {
//                                         case 1:
//                                             mordorRessource += 300
//                                             break;
//                                         case 2:
//                                             mordorRessource += 400
//                                             break;
//                                         case 3:
//                                             mordorRessource += 500
//                                             break;
                                    
//                                         default:
//                                             break;
//                                     }
//                                 }
//                             })
//                         }
//                     }

                    
//                 }

//                 // Gobelin

//                 if(gda[region]["color"] === "#ff6f00") {
//                     if(gda[region].hasOwnProperty("outpost")) {
//                         gobelinRessource += 250
//                     }
//                     if(gda[region].hasOwnProperty("foundation")) {
//                         console.log("kdekdoekdeoe")
//                         if(gda[region].hasOwnProperty("structures")) {
//                             gda[region]["structures"].map(structure => {
//                                 if(structure.name === "Ferme") {
//                                     switch (structure.level) {
//                                         case 1:
//                                             gobelinRessource += 300
//                                             break;
//                                         case 2:
//                                             gobelinRessource += 400
//                                             break;
//                                         case 3:
//                                             gobelinRessource += 500
//                                             break;
                                    
//                                         default:
//                                             break;
//                                     }
//                                 }
//                             })
//                         }
//                     }
//                     if(gda[region].hasOwnProperty("citadel")) {
//                         gobelinRessource += 150
//                         if(gda[region].hasOwnProperty("structures")) {
//                             gda[region]["structures"].map(structure => {
//                                 if(structure.name === "Ferme") {
//                                     switch (structure.level) {
//                                         case 1:
//                                             gobelinRessource += 300
//                                             break;
//                                         case 2:
//                                             gobelinRessource += 400
//                                             break;
//                                         case 3:
//                                             gobelinRessource += 500
//                                             break;
                                    
//                                         default:
//                                             break;
//                                     }
//                                 }
//                             })
//                         }
//                     }
//                     if(gda[region].hasOwnProperty("fortress")) {
//                         gobelinRessource += 150
//                         if(gda[region].hasOwnProperty("structures")) {
//                             gda[region]["structures"].map(structure => {
//                                 if(structure.name === "Ferme") {
//                                     switch (structure.level) {
//                                         case 1:
//                                             gobelinRessource += 300
//                                             break;
//                                         case 2:
//                                             gobelinRessource += 400
//                                             break;
//                                         case 3:
//                                             gobelinRessource += 500
//                                             break;
                                    
//                                         default:
//                                             break;
//                                     }
//                                 }
//                             })
//                         }
//                     }

                    
//                 }
//             }
//         }
        
//         factions.map(faction => {
//             if(faction.money != "0") {
//                 if(faction.color === "#00bfff") {
//                     messageResult+= `\`${faction.name}\` : **${faction.money}** gagne + ${elfeRessource} = **${faction.money + elfeRessource}**  \n`
//                 } 
//                 if(faction.color === "#0bff00") {
//                     messageResult+= `\`${faction.name}\` : **${faction.money}** gagne + ${rohanRessource} = **${faction.money + rohanRessource}**  \n`
//                 }
//                 if(faction.color === "#db5461") {
//                     messageResult+= `\`${faction.name}\` : **${faction.money}** gagne + ${mordorRessource} = **${faction.money + mordorRessource}**  \n`
//                 }
//                 if(faction.color === "#ff6f00") {
//                     messageResult+= `\`${faction.name}\` : **${faction.money}** gagne + ${gobelinRessource} = **${faction.money + gobelinRessource}**  \n`
//                 }
//             }
//         })

//         console.log(messageResult)


//         console.log(elfeRessource)

//         message.channel.send({
//             embed: {
//                 color: 0,
//                 description: `__**Ressources**__ des faction de la Guerre de l'Anneau \n \n ${messageResult}`
//             }
//         })
// 	}
// }