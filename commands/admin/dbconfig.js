module.exports = {
	name: "dbconfig",
	category: "admin",
	permissions: ["ADMINISTRATOR"],
	ownerOnly: true,
	usage: "dbconfig [key] <value>",
	examples: ["dbconfig", "dbconfig prefix ?", "dbconfig prefix"],
	description: "Configure data of database.",
	async run(client, message, args, guildSettings) {
		if (!args[0] || !args[0].match(/^(prefix|logChannel|testChannel)$/)) return message.reply("Please enter a valid key (\`prefix\`/\`logChannel\`\`testChannel\`)");
		const value = args[1];

		if (args[0] == "prefix") {
			if (value) {
				await client.updateGuild(message.guild, {prefix: value});
				return message.reply({content: `New prefix value: ${value}`});
			}
			message.reply({content: `Prefix value: ${guildSettings.prefix}`});
		} else if (args[0] == "logChannel") {
			if (value) {
				await client.updateGuild(message.guild, {logChannel: value});
				return message.reply({content: `New logChannel value: ${value}`});
			}
			message.reply({content: `logChannel value: ${guildSettings.logChannel}`});
		}
		else if (args[0] == "testChannel") {
			if (value) {
				await client.updateGuild(message.guild, {testChannel: value});
				return message.reply({content: `New testChannel value: ${value}`});
			}
			message.reply({content: `testChannel value: ${guildSettings.testChannel}`});
		}
	},
	options: [
		{
			name: "key",
			description: "Key to modify or display.",
			type: "STRING",
			required: true,
			choices: [
				{
					name: "prefix",
					value: "prefix"
				},
				{
					name: "logChannel",
					value: "logChannel"
				}
				,
				{
					name: "testChannel",
					value: "testChannel"
				}
			]
		},
		{
			name: "value",
			description: "Choose a value for the key.",
			type: "STRING",
		}
	],
	async runInteraction(client, interaction, guildSettings) {
		const key = interaction.options.getString("key")
		const value = interaction.options.getString("value")

		if (key == "prefix") {
			if (value) {
				await client.updateGuild(interaction.guild, {prefix: value});
				return interaction.reply({content: `New prefix value: ${value}`});
			}
			interaction.reply({content: `Prefix value: ${guildSettings.prefix}`});
		} else if (key == "logChannel") {
			if (value) {
				await client.updateGuild(interaction.guild, {logChannel: value});
				return interaction.reply({content: `New logChannel value: ${value}`});
			}
			interaction.reply({content: `logChannel value: ${guildSettings.logChannel}`});
		}
		else if (key == "testChannel") {
			if (value) {
				await client.updateGuild(interaction.guild, {testChannel: value});
				return interaction.reply({content: `New testChannel value: ${value}`});
			}
			interaction.reply({content: `testChannel value: ${guildSettings.testChannel}`});
		}
	}
}