const { prefix } = require("../config.json");

module.exports = {
	name: "interactionCreate",
	async execute(interaction, client) {
		if (!interaction.isCommand()) return;

		const command = client.commands.get(interaction.commandName);
		if (!command) return;

		try {
			console.log(`~ Nouvelle interaction: ${interaction.user.tag} a utilisé la commande ${interaction} dans #${interaction.channel.name}`);
			await command.execute(interaction, interaction.client);
		} catch (error) {
			console.log(`${error}`);
			await interaction.reply({
				content: `Une erreur est survenue lors de l'utilisation de la commande.`,
				ephmeral: true,
			});
		}
	},
};
