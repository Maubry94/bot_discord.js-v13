module.exports = {
	name: "messageCreate",
	async execute(interaction, client) {
		if (interaction.author.bot) return;

		let message = interaction.content;
		let mention = "<@&744346177658683403>";
		let replies = [
			"C'est pas humain de se prendre des vents comme ça. Ça va faire 2 heures là quand même. 😔",
			"Bah je crois que ça veut pas hein...",
			"https://tenor.com/view/wind-windy-gif-14972041",
			"Non dsl, je joue qu'avec des fort 😜. Mais au moins moi je réponds. 😉"
		];

		if(message.includes(mention)) {
			const filter = m => m.content;
			const collector = interaction.channel.createMessageCollector({ filter, time: 7200000, max: 1 });

			try {
				// collector.on('collect', m => {
				// 	console.log(`Collected ${m.content}`);
				// });

				collector.on('end', collected => {
					if(collected.size > 0) return;
					return interaction.reply(replies[Math.floor(Math.random() * replies.length)]);
				});
			} catch (error) {
				console.log(`${error}`);
				await interaction.reply({
					content: `J'ai bugué je pense... 🫤`,
					ephmeral: true,
				});
			}
		}
	},
};
