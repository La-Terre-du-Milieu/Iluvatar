module.exports = {
	name: 'bobbyadieu',
	description: 'Ping!',
	execute(message) {
    message.delete({ timeout: 100 });
		message.channel.send('Je pars vers Valinor à Demain.');
	}
}