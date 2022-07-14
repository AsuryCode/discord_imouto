module.exports = {
	name: "danger-button",
	async runInteraction(client, interaction) {
		await interaction.reply({content: "Danger button."});
	}
};