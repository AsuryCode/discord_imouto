module.exports = {
	name: "slowmode",
	category: "moderation",
	permissions: ["MANAGE_MESSAGES"],
	ownerOnly: false,
	usage: "slowmode [duration]",
	examples: ["slowmode 50", "slowmode 0"],
	description: "Activate or deactivate slowmode on the channel.",
	async run(client, message, args) {
		const value = args[0];
		if (isNaN(value) || !args[0]) return message.reply("Please define rate limit.");

		if (value == 0) {
			await message.channel.setRateLimitPerUser(0);
			return message.reply({content: "Slowmode deactivated."});
		} else {
			await message.channel.setRateLimitPerUser(value);
			return message.reply({content: `Slowmode activated for ${value}s.`});
		}
	},
	options: [
		{
			name: "value",
			description: "Slowmode duration.",
			type: "NUMBER",
			required: true,
		}
	],
	async runInteraction(client, interaction) {
		const value = interaction.options.getNumber("value");

		if (value == 0) {
			await interaction.channel.setRateLimitPerUser(0);
			return interaction.reply({content: "Slowmode deactivated.", ephemeral: true});
		} else {
			await interaction.channel.setRateLimitPerUser(value)
			return interaction.reply({content: `Slowmode activated: ${value}s.`, ephemeral: true});
		}
	}
};