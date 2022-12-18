const { prefix, embeds } = require("../../config.json");
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const fs = require("node:fs");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("help")
		.setDescription(`Afficher les commandes disponibles`)
		.addStringOption(option => option.setName("command").setDescription("Nom de la commande").setRequired(false)),
	async execute(interaction, client) {
		const arg = interaction.options.getString("command");

		if (!arg) {
			let categories = [];

			fs.readdirSync("./commands").forEach(dir => {
				const commands = fs.readdirSync(`./commands/${dir}/`).filter(file => file.endsWith(".js"));

				const tpmDir = dir;
				const majDir = tpmDir.charAt(0).toUpperCase() + tpmDir.slice(1);

				const cmds = commands.map(command => {
					let file = require(`../../commands/${dir}/${command}`);

					if (!file.name) return "La commande n'a pas de nom.";

					let name = file.name.replace(".js", "");

					return `\`${prefix}${name}\``;
				});

				let data = new Object();

				data = {
					name: majDir,
					value: cmds.length === 0 ? "En cours..." : cmds.join(" "),
				};

				categories.push(data);
			});

			const emb = new MessageEmbed()
				.setThumbnail(client.user.displayAvatarURL())
				.setAuthor({ name: "Liste des commandes :", iconURL: client.user.displayAvatarURL() })
				.addFields(categories)
				.setDescription(
					`Utiliser \`${prefix}help\` suivi du nom de la commande pour obtenir plus d'informations. Par exemple : \`${prefix}help ball\`.`
				)
				.setFooter({ text: `Demandé par ${interaction.member.user.tag}`})
				.setColor(embeds.colors.yellow)
				.setTimestamp();

			return interaction.reply({ embeds: [emb] });
		} else {
			const command = client.commands.get(arg.toLowerCase()) || client.commands.find(c => c.aliases && c.aliases.includes(arg.toLowerCase()));

			if (!command) {
				const emb = new MessageEmbed()
					.setTitle(`Commande invalide ! Utiliser \`${prefix}help\` pour afficher toutes les commandes !`)
					.setColor(embeds.colors.red);
				return interaction.reply({ embeds: [emb] });
			}

			console.log(command.name);

			const emb = new MessageEmbed()
				.setTitle(`Commande : ${command.name ? command.name : "pas de nom"}`)
				.addFields({ name: 'Description :', value: command.description ? command.description : "Pas de description." })
				.addFields({ name : "Utilisation :", value: command.usage ? `\`${prefix}${command.name} ${command.usage}\`` : `\`${prefix}${command.name}\``})
				.setColor(embeds.colors.yellow);

			return interaction.reply({ embeds: [emb] });
		}
	},
	name: "help",
	description: "Donne des informations sur les autres commandes.",
	usage: "[commande]",
};
