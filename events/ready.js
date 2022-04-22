module.exports = {
	name: "ready",
	once: true,
	execute(client) {
		console.log(`Le bot est en ligne en tant que ${client.user.tag} ✅`);
	},
};
