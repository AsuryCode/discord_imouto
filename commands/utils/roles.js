const {MessageActionRow, MessageSelectMenu} = require("discord.js")

const selectMenu = new MessageActionRow()
	.addComponents(
		new MessageSelectMenu()
			.setCustomId("roles-menu")
			.setPlaceholder("Choose a role in the list.")
			.setMinValues(1)
			.setMaxValues(3)
			.addOptions([
				{
					label: "Green",
					description: "Choose green color.",
					value: "995842211667259494"
				},
				{
					label: "Red",
					description: "Choose red color.",
					value: "995842309952393327"
				},
				{
					label: "Orange",
					description: "Choose orange color.",
					value: "995842337303433296"
				}
			])
	)

module.exports = {
	name: "roles",
	category: "utils",
	permissions: ["SEND_MESSAGES"],
	ownerOnly: false,
	usage: "roles",
	examples: ["roles"],
	description: "roles",
	async run(client, message, args) {
		await message.channel.send({content: "Choose a role.", components: [selectMenu]})
	},
	async runInteraction(client, interaction) {
		await interaction.reply({content: "Choose a role.", components: [selectMenu]})
	}
}