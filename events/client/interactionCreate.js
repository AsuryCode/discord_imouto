const ownerId = "817099621754601482"

module.exports = {
	name: "interactionCreate",
	once: false,
	async execute(client, interaction) {
		let guildSettings = await client.getGuild(interaction.guild);

		if (!guildSettings) {
			await client.createGuild(interaction.guild);
			guildSettings = await client.getGuild(interaction.guild)
			return interaction.reply("Bot updated database, reuse command.")
		}

		if (interaction.isCommand() ||interaction.isContextMenu()) {
			const cmd = client.commands.get(interaction.commandName);
			if (!cmd) return interaction.reply("This command doesn't exist.");

			if (cmd.ownerOnly) {
				if (interaction.user.id != ownerId) return interaction.reply("Only bot's admins can use this command.");
			}

			if (!interaction.member.permissions.has([cmd.permissions])) return interaction.reply({content: `One or more permission required missing to use the command (\`${cmd.permissions.join(", ")}\`)`, ephemeral: true});

			cmd.runInteraction(client, interaction, guildSettings);
		} else if (interaction.isButton()) {
			const btn = client.buttons.get(interaction.customId);
			if (!btn) return interaction.reply("This button doesn't exist.");
			btn.runInteraction(client, interaction, guildSettings);
		} else if (interaction.isSelectMenu()) {
			const selectMenu = client.selects.get(interaction.customId);
			if (!selectMenu) return interaction.reply("This menu doesn't exist.");
			selectMenu.runInteraction(client, interaction, guildSettings);
		}
	},
};