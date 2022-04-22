const { embeds } = require("../../config.json");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder().setName("ping").setDescription(`Tester la latence du client et de l'API en ms`),
	async execute(interaction, client) {
		let emb = new MessageEmbed().setColor(embeds.colors.yellow).setTitle(`**⏰ | Latences**`).setDescription(`Client: **\`${
			Date.now() - interaction.createdTimestamp
		}ms\`**
			API: **\`${Math.round(client.ws.ping)}ms\`**`);
		await interaction.reply({ embeds: [emb] });
	},
	name: "ping",
	description: "Test la latence du client et de l'API.",
};
