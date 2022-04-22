const { channels, embeds } = require("../../config.json");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("quote")
		.setDescription(`Ajouter une citation`)
		.addStringOption(option => option.setName("author").setDescription("Auteur de la citation").setRequired(true))
		.addStringOption(option => option.setName("quote").setDescription("Citation à enregistrer").setRequired(true)),
	async execute(interaction) {
		const author = interaction.options.getString("author");
		const quote = interaction.options.getString("quote");
		let emb;

		if (interaction.channel.id != channels.quote) {
			emb = new MessageEmbed().setColor(embeds.colors.red).setDescription(`Cette commande doit être utilisée dans <#${channels.quote}>`);
		} else {
			emb = new MessageEmbed().setColor(embeds.colors.yellow).setTitle(quote).setDescription(author).setTimestamp();
		}

		await interaction.reply({ embeds: [emb] });
	},
	name: "quote",
	description: "Enregistre une citation.",
	usage: "[auteur] [citation]",
};
