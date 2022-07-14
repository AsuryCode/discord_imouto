const {MessageEmbed} = require("discord.js")

module.exports = {
	name: "userinfo",
	category: "contextual",
	permissions: ["SEND_MESSAGES"],
	ownerOnly: false,
	usage: "Use Discord's context menu",
	examples: ["Use Discord's context menu"],
	type: "USER",
	async runInteraction(client, interaction) {
		const member = await interaction.guild.members.fetch(interaction.targetId)

		const embed = new MessageEmbed()
			.setAuthor({name: `${member.user.tag} (${member.id})`, iconURL: member.user.bot ? "https://media.discordapp.net/attachments/888354624661225483/995691870678155305/unknown.png" : "https://media.discordapp.net/attachments/888354624661225483/995691968321572864/unknown.png"})
			.setColor("#8e48f7")
			.setImage(member.user.displayAvatarURL())
			.addFields(
				{name: "Name", value: `${member.displayName}`, inline: true},
				{name: "Moderator", value: `${member.kickable ? "🔴" : "🟢"}`, inline: true},
				{name: "Bot", value: `${member.user.bot ? "🟢" : "🔴"}`, inline: true},
				{name: "Roles", value: `${member.roles.cache.map(role => role).join(", ").replace(", @everyone", " ")}`},
				{name: "Account created", value: `<t:${parseInt(member.user.createdTimestamp / 1000)}:f> (<t:${parseInt(member.user.createdTimestamp / 1000)}:R>)`},
				{name: "Joined server", value: `<t:${parseInt(member.joinedTimestamp / 1000)}:f> (<t:${parseInt(member.joinedTimestamp / 1000)}:R>)`},

			)

		interaction.reply({embeds: [embed], ephemeral: true})
	}
}