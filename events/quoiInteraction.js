module.exports = {
	name: "messageCreate",
	async execute(interaction, client) {
		if (interaction.author.bot) return;

		let message = interaction.content;
		const words = ["quoi", "oui", "ouais", "non", 'qui'];
		const ends = ["", ".", " !", " ?", "...", " ???", " !!!", " ??!", " ?!!"];
		let isFound = false;
		let word;

		for (let i = 0; i < words.length; i++) {
			for (let j = 0; j < ends.length; j++) {
				if (message.toLowerCase().indexOf(words[i] + ends[j], message.length - (words[i].length + ends[j])) >= 0) {
					isFound = true;
					word = words[i].toLowerCase();
				}
			}
		}

		if (!isFound) return;

		let replies;

		switch (word) {
			case "quoi":
				replies = ["feur 🤣 🤣 🤣", "driceps 🤣 🤣 🤣", "drilatère 🤣 🤣 🤣", "shi 🤣 🤣 🤣"];
				break;
			case "oui":
				replies = ["stiti 🤣 🤣 🤣", "ghours 🤣 🤣 🤣"];
				break;
			case "ouais":
				replies = ["stern 🤣 🤣 🤣"];
				break;
			case "non":
				replies = ["bril 🤣 🤣 🤣"];
				break;
			case "qui":
				replies = ["quette 🤣 🤣 🤣"];

			default:
				break;
		}

		try {
			await interaction.reply(replies[Math.floor(Math.random() * replies.length)]);
		} catch (error) {
			console.log(`${error}`);
			await interaction.reply({
				content: `J'ai bugué je pense... 🫤`,
				ephmeral: true,
			});
		}
	},
};
