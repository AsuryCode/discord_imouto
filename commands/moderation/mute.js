const ms = require("ms")

module.exports = {
	name: "mute",
	category: "moderation",
	permissions: ["MODERATE_MEMBERS"],
	ownerOnly: false,
	usage: "mute [@member] [duration] [reason]",
	examples: ["mute @member 4 minutes why not"],
	description: "Mutes member temporarily.",
	async run(client, message, args) {
		if (!args[0]) return message.reply("Enter an user to mute.")
		if (!args[1] || !args[2]) return message.reply("Enter a mute duration.")
		if (!args[3]) return message.reply("Enter a reason.")

		const target = message.mentions.members.find(m => m.id)
		const duration = args.slice(1, 3).join(" ")
		const convertedTime = ms(duration)
		const reason = args.slice(3).join(" ")

		if (!target.moderatable) return message.reply("User cannot be muted.")
		if (!convertedTime) return message.reply("Enter a valid time.")

		target.timeout(convertedTime, reason)
		message.channel.send(`Member ${target} has been muted for ${duration} because: ${reason}.`)
	},
	options: [
		{
			name: "target",
			description: "User to mute.",
			type: "USER",
			required: true,
		},
		{
			name: "duration",
			description: "Mute duration.",
			type: "STRING",
			required: true,
		},
		{
			name: "reason",
			description: "Mute reason.",
			type: "STRING",
			required: true,
		},
	],
	async runInteraction(client, interaction) {
		const target = interaction.options.getMember("target")
		const duration = interaction.options.getString("duration")
		const convertedTime = ms(duration)
		const reason = interaction.options.getString("reason")

		if (!target.moderatable) return interaction.reply("User cannot be muted.")
		if (!convertedTime) return interaction.reply("Enter a valid time.")

		target.timeout(convertedTime, reason)
		interaction.reply(`Member ${target} has been muted for ${duration} because: ${reason}.`)
	}
}