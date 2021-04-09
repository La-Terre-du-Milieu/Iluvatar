const Canvas = require('canvas');
module.exports = {
	name: 'test',
	async execute(message, args) {

        const applyText = (canvas, text) => {
            const ctx = canvas.getContext('2d');
        
            // Declare a base size of the font
            let fontSize = 70;
        
            do {
                // Assign the font to the context and decrement it so it can be measured again
                ctx.font = `${fontSize -= 10}px sans-serif`;
                // Compare pixel width of the text to the canvas minus the approximate avatar size
            } while (ctx.measureText(text).width > canvas.width - 300);
        
            // Return the result to use in the actual canvas
            return ctx.font;
        };

        const canvas = Canvas.createCanvas(700, 500);
        const ctx = canvas.getContext('2d');

        const background = await Canvas.loadImage('http://3.bp.blogspot.com/-_PesGjgWYB8/URGdwaqX4xI/AAAAAAAAAbg/73zShyM_hS8/s1600/minas-tirith-image-001.jpg');
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = '#74037b';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);

        // Slightly smaller text placed above the member's display name
        ctx.font = '40px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText('BOBBY', canvas.width / 1.2, canvas.height / 1.8);

        // Add an exclamation point here and below
        ctx.font = '40px sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(`ELROHIR!`, canvas.width / 2.5, canvas.height / 1.8);

        ctx.beginPath();
        ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();

        // const avatar = await Canvas.loadImage(message.user.displayAvatarURL({ format: 'jpg' }));
        const avatar = await Canvas.loadImage('https://cdn.discordapp.com/attachments/647478928427974679/816689802815602729/logo.png');
        ctx.drawImage(avatar, 25, 25, 200, 200);

        const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'http://3.bp.blogspot.com/-_PesGjgWYB8/URGdwaqX4xI/AAAAAAAAAbg/73zShyM_hS8/s1600/minas-tirith-image-001.jpg');

        message.channel.send(`Tothor il est mauvais`, attachment);
	},
};
