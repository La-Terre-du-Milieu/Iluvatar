module.exports = {
    data: {
        name: `sub-yt`
    },
    async execute(interaction, client) {
        const message = await interaction.update({
            content: `${interaction.user.username} est le dernier à avoir cliqué sur le bouton`,
            fetchReply: true
        });

        message.react('😄');
        
    }
}