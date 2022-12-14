module.exports = {
	name: "messageCreate",
	async execute(interaction, client) {
		if (interaction.author.bot) return;

		const message = interaction.content;
		const roleMention = "<@&744346177658683403>";
		const authorId = interaction.author.id;
		const replies = [
			"C'est pas humain de se prendre des vents comme ça. Ça va faire 2 heures là quand même. 😔",
			"Bah je crois que ça veut pas hein...",
			"https://tenor.com/view/wind-windy-gif-14972041",
			"Non dsl, je joue qu'avec des forts 😜. Mais au moins moi je réponds. 😉"
		];

		if(message.includes(roleMention)) {
			const filter = m => m.author.id !== authorId
			const hours = 1000 * 60 * 60
			
			try {
				interaction.channel.awaitMessages({ filter, time: hours * 2 , max: 1 })
				.then((collected) => {
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
