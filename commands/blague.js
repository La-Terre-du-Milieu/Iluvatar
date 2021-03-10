module.exports = {
	name: 'blague',
	description: 'Une bonne blague',
	execute(message) {
        const citation = [
            "Un jour, Chuck Norris a perdu son alliance \nDepuis, c’est le bordel dans les terres du milieu",
            "Pourquoi les elfes ne jouent pas aux legos ?\nParce que les legos lassent !",
      ]
      message.channel.send(citation[Math.floor(Math.random() * citation.length)])    
    },
};