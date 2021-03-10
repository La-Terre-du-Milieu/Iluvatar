module.exports = {
	name: 'gollum',
	description: 'gollum!',
	execute(message) {
        let emojiList = []
        message.guild.emojis.cache.map(emoji => {
            emojiList.push(emoji.toString());
        })
        message.channel.send(emojiList[Math.floor(Math.random() * emojiList.length)])
	}
}