module.exports = {
	name: "messageCreate",
	async execute(interaction, client) {
		if (interaction.author.bot) return;

		let message = interaction.content;
		const words = ["Quoi", "quoi", "QUOI", "Oui", "oui", "OUI", "Ouais", "ouais", "OUAIS", "Non", "non", "NON"];
		const ends = ["", ".", " !", " ?", "...", " ???", " !!!", " ??!", " ?!!"];
		let isFound = false;
		let word;

		for (let i = 0; i < words.length; i++) {
			for (let j = 0; j < ends.length; j++) {
				if (message.indexOf(words[i] + ends[j], message.length - (words[i].length + ends[j])) >= 0) {
					isFound = true;
					word = words[i];
				}
			}
		}

		if (!isFound) return;

		let replies;

		switch (word) {
			case "Quoi":
			case "quoi":
			case "QUOI":
				replies = ["feur", "driceps", "drilatère", "shi"];
				break;
			case "Oui":
			case "oui":
			case "OUI":
				replies = ["stiti", "ghours"];
				break;
			case "Ouais":
			case "ouais":
			case "OUAIS":
				replies = ["stern"];
				break;
			case "Non":
			case "non":
			case "NON":
				replies = ["bril"];
				break;

			default:
				break;
		}

		try {
			await interaction.reply(replies[Math.floor(Math.random() * replies.length)]);
		} catch (error) {
			console.log(`${error}`);
			await interaction.reply({
				content: `Une erreur est survenue lors de la réponse.`,
				ephmeral: true,
			});
		}
	},
};
