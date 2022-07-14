module.exports = {
	name: "accept-button",
	async runInteraction(client, interaction) {
		await interaction.member.roles.add("995806946022141974");
		await interaction.reply({content: "Rules accepted.", ephemeral: true});
	}
};