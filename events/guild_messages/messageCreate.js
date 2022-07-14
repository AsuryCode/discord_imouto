const ownerId = "817099621754601482"

module.exports = {
	name: "messageCreate",
	once: false,
	async execute(client, message) {
		let guildSettings = await client.getGuild(message.guild);

		if (!guildSettings) {
			await client.createGuild(message.guild);
			guildSettings = await client.getGuild(message.guild);
			return message.reply("Bot updated database, reuse command.")
		}
		
		const prefix = guildSettings.prefix;
		if (message.author.bot) return;
		if (!message.content.startsWith(prefix)) return;

		const args = message.content.slice(prefix.length).trim().split(/ +/g);
		const cmdName = args.shift().toLowerCase();
		if (cmdName.length == 0) return;

		let cmd = client.commands.get(cmdName);
		if (!cmd) return message.reply("This command doesn't exist.");

		if (cmd.ownerOnly) {
			if (message.author.id != ownerId) return message.reply("Only bot's admins can use this command.")
		}

		if (!message.member.permissions.has([cmd.permissions])) return message.reply(`One or more permission required missing to use the command (\`${cmd.permissions.join(", ")}\`)`)

		if (cmd) cmd.run(client, message, args, guildSettings)
	}
}