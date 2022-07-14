const {Guild} = require("../../models/index")

module.exports = {
	name: "update",
	category: "admin",
	permissions: ["ADMINISTRATOR"],
	ownerOnly: true,
	usage: "update",
	examples: ["update"],
	description: "Update new data.",
	async run(client, message, args) {
		await Guild.updateMany({}, {"$set": {"testChannel": "817618272232013834"}, upsert: true});
		message.reply("New data added.")
	},
	async runInteraction(client, interaction) {
		await Guild.updateMany({}, {"$set": {"testChannel": "817618272232013834"}, upsert: true});
		interaction.reply("New data added.")
	}
}