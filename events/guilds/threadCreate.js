module.exports = {
	name: "threadCreate",
	once: false,
	async execute(client, thread) {
		if (thread.isText()) thread.join();
		const logChannel = client.channels.cache.get("995466331543572490");
		logChannel.send(`Thread name ${thread.name}`);
	}
}