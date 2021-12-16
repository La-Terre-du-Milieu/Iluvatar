// var CronJob = require('cron').CronJob;
// module.exports = {
// 	name: 'cron',
// 	async execute(message, args) {
// 		const job = new CronJob('30 12 12 ** * * *', function() {
// 			const gdaChannel = message.guild.channels.cache.get("646699608138973204")
// 			console.log('ATTENTION');
// 			gdaChannel.channel.send("TEST")
// 		}, null, true, 'Europe/Paris');
// 		job.start();
// 	},
// };