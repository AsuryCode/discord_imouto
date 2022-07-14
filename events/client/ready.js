const Logger = require("../../utils/Logger")

module.exports = {
	name: "ready",
	once: true,
	async execute(client) {
		let guildsCount = await client.guilds.fetch();
		let userCount = client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)
		
		Logger.client(`Bot used by ${userCount} users on ${guildsCount.size} servers.`);

		client.user.setPresence({activities: [{name: "coding.", type: "PLAYING"}], status: "dnd"});

		// Slash commands on server = instantaneous
		// const devGuild = await client.guilds.cache.get("817101564207693844");
		// devGuild.commands.set(client.commands.map(cmd => cmd));
		
		// Slash command global = 1h
		client.application.commands.set(client.commands.map(cmd => cmd))
	}
}