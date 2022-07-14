module.exports = {
	name: "thread",
	category: "thread",
	permissions: ["MANAGE_THREADS"],
	ownerOnly: false,
	usage: "thread [join|leave|archive|unarchive|delete]",
	examples: ["thread join", "thread leave"],
	description: "Thread command.",
	async run(client, message, args) {
		let thread = message.channel;
		if (!thread.isThread()) return message.reply("Command only usable in a thread.");
		if (!args[0] || !args[0].match(/^(join|leave|archive|unarchive|delete)$/)) return message.reply("Please enter a valid sub-command (\`join|leave|archive|unarchive|delete\`)");

		if (args[0] === "join") {
			message.reply("Bot joined the thread.");
			if (thread.joinable) await thread.join();
		} else if (args[0] === "leave") {
			message.reply("Bot left the thread.");
			await thread.leave();
		} else if (args[0] === "archive") {
			await message.reply("Bot archived the thread.");
			await thread.setArchived(true);
		} else if (args[0] === "unarchive") {
			message.reply("Bot unarchived the thread.");
			await thread.setArchived(false);
		} else if (args[0] === "delete") {
			const channelId = args[1]
			if (!args[1]) return message.reply("Please enter a channel ID");
			const logChannel = client.channel.cache.get(channelId);
			await logChannel.send(`Bot deleted thread: ${thread.name}`);
			await thread.delete();
		}
	},
	options: [
		{
			name: "join",
			description: "Join a thread.",
			type: "SUB_COMMAND",
		},
		{
			name: "leave",
			description: "Leave a thread.",
			type: "SUB_COMMAND",
		},
		{
			name: "archive",
			description: "Archive a thread.",
			type: "SUB_COMMAND",
		},
		{
			name: "unarchive",
			description: "Unarchive a thread.",
			type: "SUB_COMMAND",
		},
		{
			name: "delete",
			description: "Delete a thread.",
			type: "SUB_COMMAND",
			options: [
				{
					name: "channel",
					type: "STRING",
					description: "Channel ID",
					required: true
				}
			]
		},

	],
	async runInteraction(client, interaction) {
		let thread = interaction.channel;
		if (!thread.isThread()) return interaction.reply("Command only usable in a thread.");

		if (interaction.options.getSubcommand() === "join") {
			interaction.reply("Bot joined the thread.");
			if (thread.joinable) await thread.join();
		} else if (interaction.options.getSubcommand() === "leave") {
			interaction.reply("Bot left the thread.");
			await thread.leave();
		} else if (interaction.options.getSubcommand() === "archive") {
			await interaction.reply("Bot archived the thread.");
			await thread.setArchived(true);
		} else if (interaction.options.getSubcommand() === "unarchive") {
			interaction.reply("Bot unarchived the thread.");
			await thread.setArchived(false);
		} else if (interaction.options.getSubcommand() === "delete") {
			const channelId = interaction.options.getString("channel");
			const logChannel = client.channels.cache.get(channelId);
			await logChannel.send(`Bot deleted thread: ${thread.name}`);
			await thread.delete();
		}
	}
}