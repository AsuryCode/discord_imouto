const {MessageEmbed} = require("discord.js")

module.exports = {
	name: "guildMemberAdd",
	once: false,
	async execute(client, member) {
		const fetchGuild = await client.getGuild(member.guild);
		
		const embed = new MessageEmbed()
			.setAuthor({name: `${member.user.tag} (${member.id})`, iconURL: member.displayAvatarURL()})
			.setColor("#22ff44")
			.setDescription(`■ Username: ${member}
			■ Created: <t:${parseInt(member.user.createdTimestamp / 1000)}:f> (<t:${parseInt(member.user.createdTimestamp / 1000)}:R>)
			■ Joined: <t:${parseInt(member.joinedTimestamp / 1000)}:f> (<t:${parseInt(member.joinedTimestamp / 1000)}:R>)
			`)
			.setTimestamp()
			.setFooter({text: "User joined"})

		const logChannel = client.channels.cache.get(fetchGuild.logChannel)
		logChannel.send({embeds : [embed]})
	}
}