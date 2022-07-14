module.exports = {
	name: "ban",
	category: "moderation",
	permissions: ["BAN_MEMBERS"],
	ownerOnly: false,
	usage: "ban [@member] [reason]",
	examples: ["ban @member non tolerated behaviour"],
	description: "Delete specified user.",
	async run(client, message, args) {
		if (!args[0]) return message.reply("Enter an user to ban.")
		if (!args[1]) return message.reply("Enter ban reason.")

		const target = message.mentions.members.find(m => m.id)
		const reason = args.slice(1).join(" ")

		if (!target.bannable) return message.reply("User cannot be banned.")

		target.ban({reason})
		message.channel.send(`Member ${target} has been banned.`)
	},
	options: [
		{
			name: "target",
			description: "User to ban.",
			type: "USER",
			required: true,
		},
		{
			name: "reason",
			description: "Ban reason..",
			type: "STRING",
			required: true,
		},
	],
	async runInteraction(client, interaction) {
		const target = interaction.options.getMember("target")
		const reason = interaction.options.getString("reason")

		if (!target.bannable) return interaction.reply("User cannot be banned.")

		target.ban(reason)
		interaction.reply(`Member ${target} has been banned.`)
	}
}