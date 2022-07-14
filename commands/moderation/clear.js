module.exports = {
	name: "clear",
	category: "moderation",
	permissions: ["MANAGE_MESSAGES"],
	ownerOnly: false,
	usage: "clear [amount] <@member>",
	examples: ["clear 50", "clear 50 @member"],
	description: "Delete specified amount of messages on a channel or by an user.",
	async run(client, message, args) {
		const amountToDelete = args[0];
		if (isNaN(amountToDelete) || !args[0] || amountToDelete > 100 || amountToDelete < 2) return message.reply("Number must be greater than 1 and lesser than 100.");
		const target = message.mentions.users.find(u => u.id);
		await message.delete();

		const messagesToDelete = await message.channel.messages.fetch();

		if (target) {
			let i = 0
			const filteredTargetMessages = [];
			
			(await messagesToDelete).filter(msg => {
				if (msg.author.id == target.id && amountToDelete > i) {
					filteredTargetMessages.push(msg); i++
				}
			});

			await message.channel.bulkDelete(filteredTargetMessages, true).then(messages => {
				message.channel.send(`Deleted ${messages.size} messages of the user ${target}.`);
			});
		} else {
			await message.channel.bulkDelete(amountToDelete, true).then(messages => {
				message.channel.send(`Deleted ${messages.size} messages on this channel.`);
			});
		};
	},
	options: [
		{
			name: "message",
			description: "Number of messages to delete.",
			type: "NUMBER",
			required: true,
		},
		{
			name: "target",
			description: "Select an user for message deletion.",
			type: "USER",
			required: false,
		},
	],
	async runInteraction(client, interaction) {
		const amountToDelete = interaction.options.getNumber("message");
		if (amountToDelete > 100 || amountToDelete < 2) return interaction.reply("Number must be greater than 1 and lesser than 100.");
		const target = interaction.options.getMember("target");

		const messagesToDelete = await interaction.channel.messages.fetch();

		if (target) {
			let i = 0;
			const filteredTargetMessages = [];
			
			(await messagesToDelete).filter(msg => {
				if (msg.author.id == target.id && amountToDelete > i) {
					filteredTargetMessages.push(msg); i++;
				}
			});

			await interaction.channel.bulkDelete(filteredTargetMessages, true).then(messages => {
				interaction.reply(`Deleted ${messages.size} messages of the user ${target}.`);
			});
		} else {
			await interaction.channel.bulkDelete(amountToDelete, true).then(messages => {
				interaction.reply(`Deleted ${messages.size} messages on this channel.`);
			});
		};
	}
};