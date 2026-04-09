const Event = require("../models/Event");
require("../models/OrganizerProfile");
require("../models/Venue");
const { createCrudController } = require("../utils/controllerFactory");

// Event controller powers event creation, listing, details, update, and delete flows.
// It also populates organizer and venue data so responses are frontend-ready.
module.exports = createCrudController(Event, {
	resourceName: "Event",
	searchableFields: ["title", "description", "category", "tags"],
	uploadField: "featuredImage",
	populate: [
		{ path: "organizer", select: "name email role avatar" },
		{ path: "organizerProfile" },
		{ path: "venue" },
	],
	defaultSort: "-createdAt",
});
