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
      const choices = ['Multijoueur sur BFME', 'Clé BFME', 'Options INI'];
      const filtered = choices.filter(choice => choice.startsWith(focusedValue));
      await interaction.respond(
        filtered.map(choice => ({ name: choice, value: choice })),
      );
    },
	async execute(interaction) {
		
    const query = interaction.options.getString('query');
    console.log(query, "query")

    let phrase;
    switch (query) {
      case "Multijoueur sur BFME":
        phrase = `> Les serveurs d'EA sont fermés depuis longtemps, deux manières de jouer en multijoueur : \n\n**__Gameranger__**\nTélécharger Gameranger ici : https://www.gameranger.com/download
        \n\n __**Radmin VPN**__  \nTélécharger Radmin VPN ici : https://www.radmin-vpn.com/fr\nNom du réseau : LTDM\nMot de passe : gollum`
        break;
      case "Clé BFME":
        phrase = `> **Cette vidéo** contient des clés pour tous les BFME, il suffit de faire pause et de recopier la clé !\n\nhttps://youtu.be/eWg680bt_es`
        break;
      case "Options INI":
        phrase = `Pour ajouter le fichier options.ini
        1️ Télécharger le fichier options.ini : https://drive.google.com/file/d/1wBJC6Lp7u5hf9Nd3dZP8iVsf0Keq0chE/view?usp=sharing 
        2️ Allez dans le dossier roaming, pour ça il faut appuyer simultanément sur la touche Windows et la touche :regional_indicator_r:, puis, dans la fenêtre qui apparait, il faut marquer %appdata%.
        3️ Dans roaming, allez dans le dossier au nom du jeu et placez-y le fichier options.ini (c'est normal s'il est vide)`
        break
      default:
        phrase = `Tu es né pour être ${query}`
        break;
    }

		await interaction.reply(phrase);
	},
};