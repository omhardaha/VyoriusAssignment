const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema(
	{
		notice: {
			type: String,
			required: true,
		},
		desc: {
			type: String,
		},
		username: {
			type: String,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("notice", noticeSchema);
