const fs = require("node:fs");
const { Client, Collection, Intents } = require("discord.js");
const { token } = require("./config.json");

const client = new Client({
	intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"],
	presence: {
		status: "dnd",
		activities: [
			{
				name: "Work in progress...",
				type: "PLAYING",
				url: "https://youtu.be/iik25wqIuFo",
			},
		],
	},
});

const handlers = fs.readdirSync("./handlers").filter(file => file.endsWith(".js"));
const events = fs.readdirSync("./events").filter(file => file.endsWith(".js"));
const commands = fs.readdirSync("./commands");

client.commands = new Collection();

(async () => {
	for (handler of handlers) require(`./handlers/${handler}`)(client);

	client.handleEvents(events, "./events");
	client.handleCommands(commands, "./commands");
	client.login(token);
})();
