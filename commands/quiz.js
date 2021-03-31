module.exports = {
	name: 'quiz',
	description: 'quiz!',
	async execute(message) {
        message.delete({ timeout: 100 });
		const quiz = require('../quiz/quiz_1.json');
        // const quiz = await mongoose.quizz.find();
        const item = quiz[Math.floor(Math.random() * quiz.length)];
        // const item = quiz[0]
        const filter = response => {
            return item.answers.some(answer => answer.toLowerCase() === response.content.toLowerCase());
        };

        // QUIZ EMBED 

        const EmbedQuiz = {
            color: 0x0099ff,
            title: item.question,
            image: {
                url: item.img,
            },
            timestamp: new Date()
        };

        message.channel.send({ embed: EmbedQuiz }).then(() => {
            message.channel.awaitMessages(filter, { max: 1, time: 30000, errors: ['time'] })
                .then(collected => {
                    message.channel.send(`${collected.first().author} Bravo <:pippinjoy:647780678704037949> tu as trouvé !`);
                })
                .catch(collected => {
                    message.channel.send("On dirait que personne n'a eu la réponse cette fois-ci.");
                });
        });
	}
}

