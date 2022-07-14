module.exports = {
	name: "lock",
	category: "moderation",
	permissions: ["MANAGE_CHANNELS"],
	ownerOnly: false,
	usage: "lock",
	examples: ["lock"],
	description: "Locks a channel.",
	async run(client, message, args) {
		await message.channel.permissionOverwrites.edit(message.guild.id, {SEND_MESSAGES: false});
		await message.reply({content: "Channel locked."});
	},
	async runInteraction(client, interaction) {
		await interaction.channel.permissionOverwrites.edit(interaction.guild.id, {SEND_MESSAGES: false});
		await interaction.reply({content: "Channel locked.", ephemeral: true});
	}
}