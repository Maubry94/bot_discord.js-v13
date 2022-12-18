const { apiKey } = require("../../config.json");
const Tenor = require('tenorjs').client({
    "Key": apiKey.tenor, 
    "Filter": "off", 
    "Locale": "en_US", 
    "MediaFilter": "minimal", 
    "DateFormat": "D/MM/YYYY - H:mm:ss A"
});
const Giphy = require('giphy-js-sdk-core');
const giphy = Giphy(apiKey.giphy);

const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("gif")
		.setDescription(`Générer un GIF aléatoire`)
		.addStringOption(option => option.setName("recherche").setDescription("Type de GIF")),
	async execute(interaction, bot) {
		let searchQuery = interaction.options.getString("recherche");

        Tenor.Search.Query(searchQuery, "10")
            .then(results => {

            giphy.search('gifs', {"q": searchQuery})
            .then((response) => {

                const allResults = [...results, ...response.data];
                
                const randomGif = allResults[Math.floor(Math.random() * allResults.length)];

                interaction.reply(randomGif.url);
            })
            .catch((error) => {
                console.log(error);
            });
        })
        .catch(console.error);
	},
	name: "gif",
	description: "Génère un GIF aléatoire.",
	usage: "[recherche]",
};
