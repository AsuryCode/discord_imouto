const {MessageEmbed} = require("discord.js");
const {readdirSync} = require("fs");
const commandFolder = readdirSync("./commands");

const contextDescription = {
	userinfo: "Return user's informations"
}

module.exports = {
	name: "help",
	category: "utils",
	permissions: ["SEND_MESSAGES"],
	ownerOnly: false,
	usage: "help <command>",
	examples: ["help ping, help poll"],
	description: "Returns a command list filtered by category.",
	async run(client, message, args, guildSettings) {
		const prefix = guildSettings.prefix;

		if (!args.length) {
			const noArgsEmbed = new MessageEmbed()
				.setColor("#f54ea7")
				.addField("Command list", `List of all available categories and their commands\nFor for more informations on a command, enter \`${prefix}help <command>\``)

			for (const category of commandFolder) {
				noArgsEmbed.addField(
					`${category.replace(/(^\w|\s\w)/g, firstLetter => firstLetter.toUpperCase())}`,
					`\`${client.commands.filter(cmd => cmd.category == category.toLowerCase()).map(cmd => cmd.name).join(", ")}\``
				)
			}

			return message.channel.send({embeds: [noArgsEmbed]})
		}

		const cmd = client.commands.get(args[0])
		if (!cmd) return message.reply("This command doesn't exist.")

		return message.channel.send(`
\`\`\`makefile
[Help: Command -> ${cmd.name}] ${cmd.ownerOnly ? "/!\\ For bot's admins only" : "" }

${cmd.description ? cmd.description : contextDescription[`${cmd.name}`]}

Permissions: ${cmd.permissions.join(", ")}
Usage: ${prefix}${cmd.usage}
Examples: ${prefix}${cmd.examples.join(` | ${prefix}`)}

---

${prefix} = prefix used for the bot (/commands also available)
{} = child command(s) available | [] = required option(s) | <> optional option(s)
Do not include : {}, [] and <> in commands
\`\`\``)
	},
	options: [
		{
			name: "command",
			description: "Enter command name",
			type: "STRING",
			required: false,
		}
	],
	async runInteraction(client, interaction, guildSettings) {
		const prefix = guildSettings.prefix;
		const cmdName = interaction.options.getString("command")

		if (!cmdName) {
			const noArgsEmbed = new MessageEmbed()
				.setColor("#f54ea7")
				.addField("Command list", `List of all available categories and their commands\nFor for more informations on a command, enter \`${prefix}help <command>\``)

			for (const category of commandFolder) {
				noArgsEmbed.addField(
					`${category.replace(/(^\w|\s\w)/g, firstLetter => firstLetter.toUpperCase())}`,
					`\`${client.commands.filter(cmd => cmd.category == category.toLowerCase()).map(cmd => cmd.name).join(", ")}\``
				)
			}

			return interaction.reply({embeds: [noArgsEmbed], ephemeral: true})
		}

		const cmd = client.commands.get(cmdName)
		if (!cmd) return interaction.reply({content: "This command doesn't exist.", ephemeral: true})

		return interaction.reply({content: `
\`\`\`makefile
[Help: Command -> ${cmd.name}] ${cmd.ownerOnly ? "/!\\ For bot's admins only" : "" }

${cmd.description ? cmd.description : contextDescription[`${cmd.name}`]}

Permissions: ${cmd.permissions.join(", ")}
Usage: ${prefix}${cmd.usage}
Examples: ${prefix}${cmd.examples.join(` | ${prefix}`)}

---

${prefix} = prefix used for the bot (/commands also available)
{} = child command(s) available | [] = required option(s) | <> optional option(s)
Do not include : {}, [] and <> in commands
\`\`\``, ephemeral: true})
	}
}