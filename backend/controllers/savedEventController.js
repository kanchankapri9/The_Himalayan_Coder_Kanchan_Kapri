const SavedEvent = require("../models/SavedEvent");
const { createCrudController } = require("../utils/controllerFactory");
const { USER_ROLES } = require("../constants/enums");

// Saved event controller manages user bookmarks (wishlist of events).
// It maps a user to the events they want to revisit later.
const crud = createCrudController(SavedEvent, {
  resourceName: "SavedEvent",
  searchableFields: [],
  populate: [
    { path: "user", select: "name email phone college" },
    { path: "event", select: "title status startDate endDate featuredImage category eventType" },
  ],
});

const getMySavedEvents = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Access denied. Authenticate first.",
      });
    }

    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limit = Math.max(parseInt(req.query.limit || "20", 10), 1);
    const sort = req.query.sort || "-savedAt";

    const filter = req.user.role === USER_ROLES.ADMIN ? {} : { user: req.user._id };
    const total = await SavedEvent.countDocuments(filter);
    const pages = total === 0 ? 0 : Math.ceil(total / limit);

    const data = await SavedEvent.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate({ path: "event", select: "title status startDate endDate featuredImage category eventType" })
      .populate({ path: "user", select: "name email phone college" });

    return res.status(200).json({
      success: true,
      message: "Saved events loaded successfully.",
      count: data.length,
      total,
      page,
      pages,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to load saved events.",
      error: error.message,
    });
  }
};

const createOne = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Access denied. Authenticate first.",
      });
    }

    const { event } = req.body;
    if (!event) {
      return res.status(400).json({
        success: false,
        message: "Validation failed.",
        errors: [{ field: "event", message: "event is required." }],
      });
    }

    const existing = await SavedEvent.findOne({ user: req.user._id, event });
    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Event is already saved.",
      });
    }

    const item = await SavedEvent.create({ user: req.user._id, event });
    const populatedItem = await SavedEvent.findById(item._id)
      .populate({ path: "event", select: "title status startDate endDate featuredImage category eventType" })
      .populate({ path: "user", select: "name email phone college" });

    return res.status(201).json({
      success: true,
      message: "Event saved successfully.",
      data: populatedItem,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Failed to save event.",
      error: error.message,
    });
  }
};

const deleteByEventId = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Access denied. Authenticate first.",
      });
    }

    const { eventId } = req.params;
    const filter = { event: eventId };
    if (req.user.role !== USER_ROLES.ADMIN) {
      filter.user = req.user._id;
    }

    const deleted = await SavedEvent.findOneAndDelete(filter);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Saved event not found for this user and event.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Event unsaved successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to unsave event.",
      error: error.message,
    });
  }
};

module.exports = {
  ...crud,
  createOne,
  getMySavedEvents,
  deleteByEventId,
};