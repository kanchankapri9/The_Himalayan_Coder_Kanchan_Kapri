const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
	{
		organizer: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},

		organizerProfile: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "OrganizerProfile",
		},

		title: {
			type: String,
			required: true,
			trim: true,
		},

		slug: {
			type: String,
			trim: true,
			unique: true,
			sparse: true,
		},

		description: {
			type: String,
			required: true,
			trim: true,
		},

		category: {
			type: String,
			required: true,
			trim: true,
		},

		tags: [{ type: String, trim: true }],

		status: {
			type: String,
			enum: ["draft", "published", "completed", "cancelled"],
			default: "draft",
		},

		eventType: {
			type: String,
			enum: ["offline", "online", "hybrid"],
			default: "offline",
		},

		venue: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Venue",
		},

		startDate: {
			type: Date,
			required: true,
		},

		endDate: {
			type: Date,
			required: true,
		},

		timezone: {
			type: String,
			default: "Asia/Kolkata",
		},

		capacity: {
			type: Number,
			min: 0,
			default: 0,
		},

		featuredImage: {
			type: String,
		},

		gallery: [{ type: String }],

		ticketingEnabled: {
			type: Boolean,
			default: true,
		},

		featured: {
			type: Boolean,
			default: false,
		},

		visibility: {
			type: String,
			enum: ["public", "private", "unlisted"],
			default: "public",
		},
	},
	{ timestamps: true }
);

eventSchema.index({ title: "text", description: "text", category: "text", tags: "text" });

module.exports = mongoose.model("Event", eventSchema);
