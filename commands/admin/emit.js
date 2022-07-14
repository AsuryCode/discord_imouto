module.exports = {
	name: "emit",
	category: "admin",
	permissions: ["ADMINISTRATOR"],
	ownerOnly: true,
	usage: "emit [eventName]",
	examples: ["emit guildCreate"],
	description: "Emit an event.",
	run(client, message, args) {
		if (!args[0] || !args[0].match(/^(guildMemberAdd|guildMemberRemove)$/)) return message.reply("Please enter a valid event (\`guildMemberAdd\`/\`guildMemberRemove\`)");

		if (args[0] == "guildMemberAdd") {
			client.emit("guildMemberAdd", message.member)
			message.reply("Event guildMemberAdd emitted")
		} else if (args[0] == "guildCreate") {
			client.emit("guildCreate", message.guild)
			message.reply("Event guildCreate emitted")
		} else {
			client.emit("guildMemberRemove", message.member)
			message.reply("Event guildMemberRemove emitted")
		}
	},
	options: [
		{
			name: "event",
			description: "Choose an event to emit",
			type: "STRING",
			required: true,
			choices: [
				{
					name: "guildMemberAdd",
					value: "guildMemberAdd"
				},
				{
					name: "guildCreate",
					value: "guildCreate"
				},
				{
					name: "guildMemberRemove",
					value: "guildMemberRemove"
				}
			]
		}
	],
	runInteraction(client, interaction) {
		const evtChoices = interaction.options.getString("event")

		if (evtChoices == "guildMemberAdd") {
			client.emit("guildMemberAdd", interaction.member)
			interaction.reply({content: "Event guildMemberAdd emitted", ephemeral: true})
		} else if (evtChoices == "guildCreate") {
			client.emit("guildCreate", interaction.guild)
			interaction.reply({content: "Event guildCreate emitted", ephemeral: true})
		} else {
			client.emit("guildMemberRemove", interaction.member)
			interaction.reply({content: "Event guildMemberRemove emitted", ephemeral: true})
		}
	}
}