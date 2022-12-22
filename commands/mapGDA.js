const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder, PermissionFlagsBits  } = require('discord.js');
const puppeteer = require('puppeteer');
const fetch = require('node-fetch');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('maptest')
		.setDescription('Replies with Pong!')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
	async execute(interaction, client) {

    await interaction.reply({ content: 'Recherche' });

          const browser = await puppeteer.launch();
          const page = await browser.newPage();
          await page.goto('https://events.laterredumilieu.fr/gda')
        
          // Click on the element with the attribute aria-valuetext="Terre_Desolee"
          await page.click('#desactiveHUD');

          // Wait for the "map" element to be rendered
          await page.waitForSelector('.map');
        
          // Take a screenshot of the "map" element
          const element = await page.$('.map');
          const screenshot = await element.screenshot();
        
          // Save the screenshot to a file
          require('fs').writeFileSync('screenshot.png', screenshot);
        
          await browser.close();

          const file = new AttachmentBuilder('screenshot.png');


        let nbPlayers = 0;
        let nbPlayerHomme = "";
        let nbPlayerElfe = "";
        let nbPlayerNain = "";
        let nbPlayerMordor = "";
        let nbPlayerIsengard = "";
        let nbPlayerGobelin = "";
        let nbPlayerAngmar = "";


        await fetch("https://api.npoint.io/7a210a01331f3c385ed7")
        .then(res => res.json())
        .then((json) => {
            console.log(json)

            for (var key in json) {
                var obj = json[key];
          
                if (obj.hasOwnProperty("players") && obj.players.length > 0) {
                  let obj2 = JSON.parse(JSON.stringify(obj["players"]));
                  for (var player in obj2) {
                    console.log(obj2, "dejdie")
                    switch (obj2[player]["faction"]) {
                      case 1:
                        nbPlayerHomme += `\n${obj2[player]["name"]}`;
                        nbPlayers += 1;
                        break;
                      case 2:
                        nbPlayerElfe += `\n${obj2[player]["name"]}`;
                        nbPlayers += 1;
                        break;
                      case 3:
                        nbPlayerNain += `\n${obj2[player]["name"]}`;
                        nbPlayers += 1;
                        break;
                      case 4:
                        nbPlayerMordor += `\n${obj2[player]["name"]}`;
                        nbPlayers += 1;
                        break;
                      case 5:
                        nbPlayerIsengard += `\n${obj2[player]["name"]}`;
                        nbPlayers += 1;
                        break;
                      case 6:
                        nbPlayerGobelin += `\n${obj2[player]["name"]}`;
                        nbPlayers += 1;
                        break;
                      case 7:
                        nbPlayerAngmar += `\n${obj2[player]["name"]}`;
                        nbPlayers += 1;
                        break;
                      default:
                        break;
                    }
                  }
                }
        }})

        console.log(nbPlayerMordor, "nbPlayerMordor")

          // inside a command, event listener, etc.
          const exampleEmbed = new EmbedBuilder()
          .setColor("#E700FF")
          .setTitle("La Guerre de l'Anneau")
          // .setURL('https://discord.js.org/')
          // .setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
          .setDescription('En Préparation')
          // .setThumbnail('https://i.imgur.com/AfFp7pu.png')
          .addFields(
            { name: 'Homme', value: nbPlayerHomme, inline: true },
            { name: 'Elfe', value: nbPlayerElfe, inline: true },
            { name: 'Nain', value: nbPlayerNain, inline: true },
            { name: 'Mordor', value: nbPlayerMordor, inline: true },
            { name: 'Isengard', value: nbPlayerIsengard, inline: true },
            { name: 'Gobelin', value: nbPlayerGobelin, inline: true },
            { name: 'Angmar', value: nbPlayerAngmar, inline: true },
          )
          .setColor('#E700FF')
          // .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
          .setImage('attachment://screenshot.png')
          .setTimestamp();
          // .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' });

          await interaction.editReply({ content: '', embeds: [exampleEmbed], files: [file] });
          // await interaction.editReply('Pong again!');
	},
};



