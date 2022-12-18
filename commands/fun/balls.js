const { embeds } = require("../../config.json");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("ball")
		.setDescription(`Poser une question`)
		.addStringOption(option => option.setName("question").setDescription("Question à poser").setRequired(true)),
	async execute(interaction, bot) {
		let question = interaction.options.getString("question");

		if (!question) return interaction.reply({ embeds: [bot.errorEmbed(`Vous devez poser une question.`)] });

		const replies = ["Oui !", "Non.", "Peut être...", "Evidemment !"];

		let emb = new MessageEmbed()
			.setColor(embeds.colors.yellow)
			.setTitle(question)
			.setDescription(replies[Math.floor(Math.random() * replies.length)])
			.addFields("Auteur", `**\`${interaction.member.user.tag}\`**`, true);
		await interaction.reply({ embeds: [emb] });
	},
	name: "ball",
	description: "Répond à une question posée.",
	usage: "[question]",
};
