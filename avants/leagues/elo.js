// const Elo = require('@pelevesque/elo');
// const elo = new Elo()

// // 50 pour les joueurs en dessous de 500
// // 30 pour les joueurs au dessus de 500

// module.exports = {
// 	name: 'elo2',
// 	description: 'elo',
// 	execute(message) {
//         let win = 1658
//         let lose = 1433

       
//         let outcome;

//         console.log(win - lose, "deff");

//         if((win - lose) <= -200){
//             console.log(",,,")
//             outcome = elo.getOutcome(win, lose, 1, 100, 200)
//         } else if ((win - lose) >= 200) {
//             console.log("dekodkeo");
//             outcome = elo.getOutcome(win, lose, 1, 10, 800)
//         } else {
//             outcome = elo.getOutcome(win, lose, 1, 50, 800)
//         }
//         // const rating = elo.getRating(1800, 2005, 1, 20, 400)
//         const newRatingA = Math.ceil(outcome.a.rating)
//         console.log(win, lose, outcome)
        
//         // const outcome2 = elo.getOutcome(104, 75, 1)
//         // const newRatingA2 = outcome2.a.rating
//         // console.log(elo, outcome2, newRatingA2)

//         // const outcome3 = elo.getOutcome(115, 63, 1)
//         // const newRatingA3 = outcome3.a.rating
//         // console.log(elo, outcome3, newRatingA3)

//         // const outcome4 = elo.getOutcome(52, 125, 1)
//         // const newRatingA4 = outcome4.a.rating
//         // console.log(elo, outcome4, newRatingA4)
//     },
// };