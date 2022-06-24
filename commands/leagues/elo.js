const Elo = require('@pelevesque/elo');
const elo = new Elo()

// 50 pour les joueurs en dessous de 500
// 30 pour les joueurs au dessus de 500

module.exports = {
	name: 'elo',
	description: 'elo',
	execute(message) {
        let win = 600
        let outcome;
        if(win >= 500){
            outcome = elo.getOutcome(15, -15, 1, 30, 400)
        } else {
            outcome = elo.getOutcome(600, 200, 1, 50, 1)
        }
        // const rating = elo.getRating(1800, 2005, 1, 20, 400)
        const newRatingA = Math.ceil(outcome.a.rating)
        console.log(outcome, newRatingA)
        
        // const outcome2 = elo.getOutcome(104, 75, 1)
        // const newRatingA2 = outcome2.a.rating
        // console.log(elo, outcome2, newRatingA2)

        // const outcome3 = elo.getOutcome(115, 63, 1)
        // const newRatingA3 = outcome3.a.rating
        // console.log(elo, outcome3, newRatingA3)

        // const outcome4 = elo.getOutcome(52, 125, 1)
        // const newRatingA4 = outcome4.a.rating
        // console.log(elo, outcome4, newRatingA4)
    },
};