module.exports = {
	name: "info",
	aliases: ["Où était le Gondor lorsque l'Ouestfolde est tombé ?"],
	description: 'info.',
	execute(message) {
        let res = 'de';
		if(message === "Où était le Gondor lorsque l'Ouestfolde est tombé ?") {
            res = "Dans le GONDOR"
        }

		message.channel.send(res);
	},
};
