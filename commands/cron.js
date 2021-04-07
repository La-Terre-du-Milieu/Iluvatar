var CronJob = require('cron').CronJob;
module.exports = {
	name: 'cron',
	async execute(message, args) {
		const job = new CronJob('0 0 18 ? * WED *', function() {
			const gdaChannel = message.guild.channels.cache.get("796757076666744873")
			console.log('ATTENTION');
			gdaChannel.channel.send("Attention dans une heure (19h00), c'est la fin pour remplir les doodles des matchs !")
		}, null, true, 'Europe/Paris');
		job.start();
	},
};