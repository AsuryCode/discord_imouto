const {MessageEmbed} = require("discord.js")

module.exports = {
	name: "ping",
	category: "utils",
	permissions: ["SEND_MESSAGES"],
	ownerOnly: false,
	usage: "ping",
	examples: ["ping"],
	description: "Returns bot's and API's latency.",
	async run(client, message, args) {
		const tryPong = await message.channel.send("Trying to pong.")

		const embed = new MessageEmbed()
			.setTitle("Pong")
			.setImage(client.user.displayAvatarURL())
			.setThumbnail(client.user.displayAvatarURL())
			.addFields(
				{name: "Latence API", value: `\`\`\`${client.ws.ping}ms\`\`\``, inline: true},
				{name: "Latence BOT", value: `\`\`\`${tryPong.createdTimestamp - message.createdTimestamp}ms\`\`\``, inline: true}
			)
			.setTimestamp()
			.setFooter({text: message.author.username, iconURL: message.author.displayAvatarURL()})

		tryPong.edit({content: " ", embeds: [embed]})
	},
	async runInteraction(client, interaction) {
		const tryPong = await interaction.reply({content: "Trying to pong.", fetchReply: true})

		const embed = new MessageEmbed()
			.setTitle("Pong")
			.setImage(client.user.displayAvatarURL())
			.setThumbnail(client.user.displayAvatarURL())
			.addFields(
				{name: "Latence API", value: `\`\`\`${client.ws.ping}ms\`\`\``, inline: true},
				{name: "Latence BOT", value: `\`\`\`${tryPong.createdTimestamp - interaction.createdTimestamp}ms\`\`\``, inline: true}
			)
			.setTimestamp()
			.setFooter({text: interaction.user.username, iconURL: interaction.user.displayAvatarURL()})

		interaction.editReply({content: " ", embeds: [embed]})
	}
}