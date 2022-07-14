const {MessageEmbed, MessageActionRow, MessageButton} = require("discord.js")

const buttons = new MessageActionRow()
	.addComponents(
		new MessageButton()
			.setCustomId("accept-button")
			.setLabel("Accept")
			.setStyle("SUCCESS"),

		new MessageButton()
			.setCustomId("refuse-button")
			.setLabel("Refuse")
			.setStyle("DANGER")
	)

const welcomeEmbed = new MessageEmbed()
	.setTitle("Server chart")
	.setDescription("Rules...")
	.setFooter({text: "Welcome on the server"})
	.setTimestamp()

module.exports = {
	name: "welcome",
	category: "utils",
	permissions: ["SEND_MESSAGES"],
	ownerOnly: false,
	usage: "welcome",
	examples: ["welcome"],
	description: "Sends rules description.",
	async run(client, message, args) {
		await message.channel.send({embeds: [welcomeEmbed], components: [buttons]})
	},
	async runInteraction(client, interaction) {
		await interaction.reply({embeds: [welcomeEmbed], components: [buttons]})
	}
}