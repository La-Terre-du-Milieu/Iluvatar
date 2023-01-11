const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('aide')
		.setDescription('basouibasouibasouibasouibasoui')
    .addStringOption(option =>
      option.setName('query')
        .setDescription('Phrase to search for')
        .setRequired(true)
        .setAutocomplete(true)),
    async autocomplete(interaction) {
      const focusedValue = interaction.options.getFocused();
      const choices = ['ping', 'Sharding: Getting started', 'Library: Voice Connections', 'Interactions: Replying to slash commands', 'Popular Topics: Embed preview'];
      const filtered = choices.filter(choice => choice.startsWith(focusedValue));
      await interaction.respond(
        filtered.map(choice => ({ name: choice, value: choice })),
      );
    },
	async execute(interaction) {
		
    const query = interaction.options.getString('query');
    console.log(query, "query")


    function getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    }
    const factions = [
        "Bobby", "Elfe", "Nain", "Homme", "Mordor", "Isengard", "Gobelin", "Angmar", "<:gollum:646777565469736960>"
      ]
      let best = factions[Math.floor(Math.random() * factions.length)];
      let phrase;
      switch (best) {
        case "Elfe":
          let elfe = getRandomInt(3)
          let ElfeFaction;
          elfe === 2 ? ElfeFaction='Lindon' : elfe === 1 ? ElfeFaction='Lorien' : elfe === 0 ? ElfeFaction='Fondcombe' : ElfeFaction='La Forêt Noire'
          phrase = `Tu es né pour être un elfe de ${ElfeFaction}`
          break;
        case "Homme":
          let homme = getRandomInt(2)
          let MenFaction;
          homme === 1 ? MenFaction='du Gondor' : homme === 0 ? MenFaction="d'Arnor" : MenFaction='du Rohan'
          phrase = `Tu es né pour être un homme ${MenFaction}`
          break;
        case "Nain":
          phrase = "Tu es né pour être un petit gras barbu"
          break;
        case "Arnor":
          phrase = "Tu es né pour être dans l'Arnor"
          break
        default:
          phrase = `Tu es né pour être ${best}`
          break;
      }

		await interaction.reply(phrase);
	},
};