const Event = require("../models/Event");
const { createCrudController } = require("../utils/controllerFactory");
const { USER_ROLES } = require("../constants/enums");

// Event controller powers event creation, listing, details, update, and delete flows.
// It also populates organizer and venue data so responses are frontend-ready.
const crud = createCrudController(Event, {
	resourceName: "Event",
	searchableFields: ["title", "description", "category", "tags"],
	uploadField: "featuredImage",
	populate: [
		{ path: "organizer", select: "name email role avatar" },
		{ path: "organizerProfile", select: "organizationName verified city" },
		{ path: "venue", select: "name addressLine1 city state country latitude longitude" },
	],
	defaultSort: "-createdAt",
});

const getAll = async (req, res) => {
	try {
		const page = Math.max(parseInt(req.query.page || "1", 10), 1);
		const limit = Math.max(parseInt(req.query.limit || "20", 10), 1);
		const sort = req.query.sort || "-createdAt";
		const search = (req.query.search || "").trim();

		const filter = {};

		if (search) {
			filter.$or = [
				{ title: { $regex: search, $options: "i" } },
				{ description: { $regex: search, $options: "i" } },
				{ category: { $regex: search, $options: "i" } },
				{ tags: { $regex: search, $options: "i" } },
			];
		}

		if (req.query.category) {
			filter.category = req.query.category;
		}

		if (req.query.status) {
			filter.status = req.query.status;
		}

		if (req.query.eventType) {
			filter.eventType = req.query.eventType;
		}

		if (req.query.featured !== undefined) {
			filter.featured = String(req.query.featured).toLowerCase() === "true";
		}

		if (req.query.city) {
			const cityRegex = new RegExp(req.query.city, "i");
			const cityEvents = await Event.find()
				.populate({ path: "venue", select: "city" })
				.select("_id venue")
				.lean();

			const venueMatchedEventIds = cityEvents
				.filter((item) => item.venue && cityRegex.test(item.venue.city || ""))
				.map((item) => item._id);

			filter._id = { $in: venueMatchedEventIds };
		}

		const total = await Event.countDocuments(filter);
		const pages = total === 0 ? 0 : Math.ceil(total / limit);

		const data = await Event.find(filter)
			.sort(sort)
			.skip((page - 1) * limit)
			.limit(limit)
			.populate({ path: "organizer", select: "name email role avatar" })
			.populate({ path: "organizerProfile", select: "organizationName verified city" })
			.populate({ path: "venue", select: "name addressLine1 city state country latitude longitude" });

		return res.status(200).json({
			success: true,
			message: "Event list loaded successfully.",
			count: data.length,
			total,
			page,
			pages,
			data,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Failed to load event list.",
			error: error.message,
		});
	}
};

const getMyEvents = async (req, res) => {
	try {
		if (!req.user) {
			return res.status(401).json({
				success: false,
				message: "Access denied. Authenticate first.",
			});
		}

		if (req.user.role !== USER_ROLES.ORGANIZER && req.user.role !== USER_ROLES.ADMIN) {
			return res.status(403).json({
				success: false,
				message: "Access denied. Organizer role required.",
			});
		}

		const page = Math.max(parseInt(req.query.page || "1", 10), 1);
		const limit = Math.max(parseInt(req.query.limit || "20", 10), 1);
		const search = (req.query.search || "").trim();
		const sort = req.query.sort || "-createdAt";

		const filter = req.user.role === USER_ROLES.ADMIN ? {} : { organizer: req.user._id };

		if (search) {
			filter.$or = [
				{ title: { $regex: search, $options: "i" } },
				{ description: { $regex: search, $options: "i" } },
				{ category: { $regex: search, $options: "i" } },
			];
		}

		const total = await Event.countDocuments(filter);
		const pages = total === 0 ? 0 : Math.ceil(total / limit);

		const data = await Event.find(filter)
			.sort(sort)
			.skip((page - 1) * limit)
			.limit(limit)
			.populate({ path: "organizer", select: "name email role avatar" })
			.populate({ path: "organizerProfile", select: "organizationName verified city" })
			.populate({ path: "venue", select: "name addressLine1 city state country latitude longitude" });

		return res.status(200).json({
			success: true,
			message: "Your events loaded successfully.",
			count: data.length,
			total,
			page,
			pages,
			data,
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: "Failed to load your events.",
			error: error.message,
		});
	}
};

module.exports = {
	...crud,
	getAll,
	getMyEvents,
};
