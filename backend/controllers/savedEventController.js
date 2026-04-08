const SavedEvent = require("../models/SavedEvent");
const { createCrudController } = require("../utils/controllerFactory");

// Saved event controller manages user bookmarks (wishlist of events).
// It maps a user to the events they want to revisit later.
module.exports = createCrudController(SavedEvent, {
  resourceName: "SavedEvent",
  searchableFields: [],
  populate: [
    { path: "user", select: "name email phone college" },
    { path: "event", select: "title status startDate endDate" },
  ],
});