module.exports = {
	name: 'woke',
	description: 'woke',
	execute(message) {
		message.delete({ timeout: 100 });
		message.reply("https://tenor.com/view/umm-what-ewoks-star-wars-what-gif-14696500")    
    },
};