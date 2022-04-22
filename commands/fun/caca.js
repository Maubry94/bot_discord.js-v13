const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder().setName("caca").setDescription("Trouver le caca caché"),

	async execute(interaction) {
		const messages = await interaction.channel.messages.fetch({ limit: 1 });
		let msg = messages.first().content;
		let msgZzCc = "";

		for (let i = 0; i < msg.length; i++) {
			const char = msg[i].toLowerCase();
			if (char == " " /*|| char == "." || char == "?" || char == "!"*/) continue;

			if (msgZzCc.length < 4) {
				if (((msgZzCc.length == 0 || msgZzCc[msgZzCc.length - 1] == "a") && char == "c") || (msgZzCc[msgZzCc.length - 1] == "c" && char == "a")) {
					msgZzCc += char;
					continue;
				}
			}

			msg = msg.substring(0, i) + "." + msg.substring(i + 1);
		}

		let response = "";

		if (msgZzCc.length == 4) {
			response = msg;
		} else {
			response = "Pas de caca 😔";
		}

		await interaction.reply(response);
	},
	name: "caca",
	description: "Trouve le caca.",
};
