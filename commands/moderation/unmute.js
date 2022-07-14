const ms = require("ms")

module.exports = {
	name: "unmute",
	category: "moderation",
	permissions: ["MODERATE_MEMBERS"],
	ownerOnly: false,
	usage: "mute [@member]",
	examples: ["mute @member"],
	description: "Unmutes member.",
	async run(client, message, args) {
		if (!args[0]) return message.reply("Enter an user to unmute.")

		const target = message.mentions.members.find(m => m.id)

		if (!target.isCommunicationDisabled()) return message.reply("User is not muted.")

		target.timeout(null)
		message.channel.send(`Member ${target} has been unmuted.`)
	},
	options: [
		{
			name: "target",
			description: "User to mute.",
			type: "USER",
			required: true,
		}
	],
	async runInteraction(client, interaction) {
		const target = interaction.options.getMember("target")

		if (!target.isCommunicationDisabled()) return interaction.reply("User is not muted.")

		target.timeout(null)
		interaction.reply(`Member ${target} has been unmuted.`)
	}
}