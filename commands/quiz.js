const { SlashCommandBuilder, MessageActionRow, MessageButton, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('quiz')
    .setDescription('Starts a quiz'),

  async execute(interaction, client) {
    const quizQuestions = [
      {
        question: 'What is the capital of France?',
        options: ['Paris', 'London', 'Berlin', 'Madrid'],
        correctAnswer: 'Paris',
      },
      // Add more questions as needed
    ];

    const questionIndex = Math.floor(Math.random() * quizQuestions.length);
    const questionData = quizQuestions[questionIndex];

    const options = questionData.options.map((option, index) =>
      new MessageButton()
        .setCustomId(`option_${index}`)
        .setLabel(option)
        .setStyle('PRIMARY')
    );

    const row = new MessageActionRow().addComponents(options);

    await interaction.reply({
      content: `Question: ${questionData.question}`,
      components: [row],
      ephemeral: true,
    });

    client.activeQuizzes[interaction.channelId] = {
      questionData,
      correctAnswer: questionData.correctAnswer,
      userId: interaction.user.id,
    };
  },
};
