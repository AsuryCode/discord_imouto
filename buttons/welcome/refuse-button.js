module.exports = {
	name: "refuse-button",
	async runInteraction(client, interaction) {
		try {
			await interaction.member.send("You didn't accept rules.");
		} catch (e) {
			await interaction.reply(`Member ${interaction.member.displayName} didn't accept rules.`);
		}

		//await interaction.member.kick("Didn't accept rules.");
	}
};