module.exports = {
	name: 'sacrifie',
	async execute(message, args) {
		// message.delete({ timeout: 100 });
		if (message.member.roles.cache.has('646700553648340993' || '646687065597149189')) {
			let sacrifie = []
			message.mentions.users.forEach(user => {
				console.log(user)
				sacrifie.push(user)
			});
			let playerToSacrifie = sacrifie[Math.floor(Math.random() * sacrifie.length)]
			message.channel.send("Attention...")
			message.channel.send(`Le joueur sacrifié est ${playerToSacrifie.toString()}`)
		}
	},
};