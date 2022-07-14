module.exports = {
	name: "primary-button",
	async runInteraction(client, interaction) {
		await interaction.reply({content: "Primary button."});
	}
};