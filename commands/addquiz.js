const fs = require("fs");

module.exports = {
	name: 'addquiz',
	description: 'addquiz!',
	execute(message, args) {
        if (!args.length) {
			return message.channel.send(`Tu as oublié de mettre une question ${message.author}!`);
		} 
        console.log("dkekdeo")
        const data = fs.readFileSync('quiz/quiz_1.json', "utf8");  
        const myObject= JSON.parse(data);
        let newData = {
            "question": args[0],
            "img": args[1],
            "answers": [args[2]]
        } 
        myObject.push(newData)

		const newData2 = JSON.stringify(myObject);
        fs.writeFile('data.json', newData2, err => {
            // error checking
            if(err) throw err;
            
            console.log("New data added");
        });  
	}
}