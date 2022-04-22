const { embeds } = require("../../config.json");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("poll")
		.setDescription("Céer un sondage")
		.addStringOption(option => option.setName("question").setDescription("Question du sondage").setRequired(true))
		.addStringOption(option => option.setName("options").setDescription("Options du sondage. Séparées par des | ").setRequired(true)),
	async execute(interaction, client) {
		let question = interaction.options.getString("question");

		if (!question) return interaction.reply({ embeds: [client.errorEmbed(`Vous devez poser une question pour le sondage.`)] });

		let options = interaction.options.getString("options").split(" | ");

		if (options.length < 2) return interaction.reply({ embeds: [client.errorEmbed(`Le sondage doit comporter au deux un choix.`)] });

		if (options.length > 20) return interaction.reply({ embeds: [client.errorEmbed(`Il ne peut pas y avoir plus de 20 choix.`)] });

		let reactions = ["🇦", "🇧", "🇨", "🇩", "🇪", "🇫", "🇬", "🇭", "🇮", "🇯", "🇰", "🇱", "🇲", "🇳", "🇴", "🇵", "🇶", "🇷", "🇸", "T"];

		let emb = new MessageEmbed()
			.setColor(embeds.colors.yellow)
			.setTitle(question)
			.setDescription(options.map((choice, i) => `${reactions[i]} ${choice}`).join("\n\n"))
			.addField("Auteur", `**\`${interaction.member.user.tag}\`**`, true)
			.setTimestamp();

		await interaction.reply(`Nouveau sondage !`);

		let msg = await interaction.channel.send({ embeds: [emb] });

		for (i = 0; i < options.length; i++) {
			msg.react(reactions[i]);
		}

		return;
	},
	name: "poll",
	description: "Crée un sondage.",
	usage: "[question] [option 1 | option 2]",
};
