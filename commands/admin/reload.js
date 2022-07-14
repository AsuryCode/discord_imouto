const {Guild} = require("../../models/index")

module.exports = {
	name: "reload",
	category: "admin",
	permissions: ["ADMINISTRATOR"],
	ownerOnly: true,
	usage: "reload",
	examples: ["reload"],
	description: "Reload bot.",
	async run(client, message, args) {
		// const devGuild = await client.guilds.cache.get("817101564207693844");
		// devGuild.commands.set([]);
		await interaction.reply("Bot reloaded successfully.");
		return process.exit();
	},
	async runInteraction(client, interaction) {
		// const devGuild = await client.guilds.cache.get("817101564207693844");
		// devGuild.commands.set([]);
		await interaction.reply("Bot reloaded successfully.");
		return process.exit();
	}
}