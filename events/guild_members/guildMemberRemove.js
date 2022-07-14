const {MessageEmbed} = require("discord.js")

module.exports = {
	name: "guildMemberRemove",
	once: false,
	async execute(client, member) {
		const fetchGuild = await client.getGuild(member.guild);
		const fetchKickLog = await member.guild.fetchAuditLogs({
			limit: 1,
			type: "MEMBER_KICK"
		});

		const kickLog = fetchKickLog.entries.first();
		const {target, reason} = kickLog;
		let isMemberKick = false;

		if (target.id === member.id) isMemberKick = true;

		const embed = new MessageEmbed()
			.setAuthor({name: `${member.user.tag} (${member.id})`, iconURL: member.displayAvatarURL()})
			.setColor("#dc143c")
			.setDescription(`■ Username: ${member.displayName}
			■ Created: <t:${parseInt(member.user.createdTimestamp / 1000)}:f> (<t:${parseInt(member.user.createdTimestamp / 1000)}:R>)
			■ Joined: <t:${parseInt(member.joinedTimestamp / 1000)}:f> (<t:${parseInt(member.joinedTimestamp / 1000)}:R>)
			■ Left: <t:${parseInt(Date.now() / 1000)}:f> (<t:${parseInt(Date.now() / 1000)}:R>
			■ Kick?: ${isMemberKick ? `🟢 (reason: ${reason})` : "🔴"}
			`)
			.setTimestamp()
			.setFooter({text: "User left"})

		const logChannel = client.channels.cache.get(fetchGuild.testChannel)
		logChannel.send({embeds : [embed]})
	}
}