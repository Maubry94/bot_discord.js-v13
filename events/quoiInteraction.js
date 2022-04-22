module.exports = {
	name: "messageCreate",
	async execute(interaction, client) {
		if (interaction.author.bot) return;

		let message = interaction.content;
		const words = ["Quoi", "quoi", "QUOI"];
		const ends = ["", ".", " !", " ?", "...", " ???", " !!!", " ??!", " ?!!"];
		let isFound = false;

		for (let i = 0; i < words.length; i++) {
			for (let j = 0; j < ends.length; j++) {
				if (message.indexOf(words[i] + ends[j], message.length - (words[i].length + ends[j])) >= 0) isFound = true;
			}
		}

		if (!isFound) return;

		try {
			await interaction.reply("feur");
		} catch (error) {
			console.log(`${error}`);
			await interaction.reply({
				content: `Une erreur est survenue lors de la réponse.`,
				ephmeral: true,
			});
		}
	},
};
