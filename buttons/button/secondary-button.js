module.exports = {
	name: "secondary-button",
	async runInteraction(client, interaction) {
		await interaction.reply({content: "Secondary button."});
	}
};