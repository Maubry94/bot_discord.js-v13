const fs = require("fs");
const { token, clientId, guildId } = require("../config.json");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

module.exports = client => {
	client.handleCommands = async (commandFolders, path) => {
		client.commandArray = [];

		for (folder of commandFolders) {
			const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith(".js"));

			for (const file of commandFiles) {
				const command = require(`../commands/${folder}/${file}`);
				client.commands.set(command.data.name, command);
				client.commandArray.push(command.data.toJSON());
			}
		}

		const rest = new REST({ version: "9" }).setToken(token);

		(async () => {
			try {
				console.log(`Rafraichissement des commandes '/'...`);

				await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
					body: client.commandArray,
				});

				console.log(`Rafraichissement réussi !`);
			} catch (error) {
				console.log(`${error}`);
			}
		})();
	};
};
