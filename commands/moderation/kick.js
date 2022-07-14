module.exports = {
	name: "kick",
	category: "moderation",
	permissions: ["KICK_MEMBERS"],
	ownerOnly: false,
	usage: "kick [@member] [reason]",
	examples: ["kick @member non tolerated behaviour"],
	description: "Delete specified user.",
	async run(client, message, args) {
		if (!args[0]) return message.reply("Enter an user to kick.")
		if (!args[1]) return message.reply("Enter kick reason.")

		const target = message.mentions.members.find(m => m.id)
		const reason = args.slice(1).join(" ")

		if (!target.kickable) return message.reply("User cannot be kicked.")

		target.kick(reason)
		message.channel.send(`Member ${target} has been kicked.`)
	},
	options: [
		{
			name: "target",
			description: "User to kick.",
			type: "USER",
			required: true,
		},
		{
			name: "reason",
			description: "Kick reason.",
			type: "STRING",
			required: true,
		},
	],
	async runInteraction(client, interaction) {
		const target = interaction.options.getMember("target")
		const reason = interaction.options.getString("reason")

		if (!target.kickable) return interaction.reply("User cannot be kicked.")

		target.kick(reason)
		interaction.reply(`Member ${target} has been kicked.`)
	}
}