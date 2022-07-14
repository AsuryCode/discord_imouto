const mongoose = require("mongoose");

const guildSchema = mongoose.Schema({
	id: String,
	prefix: {"type": String, "default": "!"},
	logChannel: {"type": String, "default": "995466331543572490"},
	testChannel: {"type": String, "default": "817618272232013834"},
});

module.exports = mongoose.model("Guild", guildSchema);