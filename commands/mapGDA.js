const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const puppeteer = require('puppeteer');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction, client) {
        



        async function takeScreenshot() {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto('https://events.laterredumilieu.fr/gda')
          
            // Wait for the "map" element to be rendered
            await page.waitForSelector('.map');
          
            // Take a screenshot of the "map" element
            const element = await page.$('.map');
            const screenshot = await element.screenshot();
          
            // Save the screenshot to a file
            require('fs').writeFileSync('screenshot.png', screenshot);
          
            await browser.close();
          }
          
          await takeScreenshot();


  
        interaction.reply("screenshot.png")
	},
};



