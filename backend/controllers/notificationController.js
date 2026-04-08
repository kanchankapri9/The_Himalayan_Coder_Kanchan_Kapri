const Notification = require("../models/Notification");
const { createCrudController } = require("../utils/controllerFactory");

// Notification controller manages user inbox messages and alerts.
// It supports read/unread state and optional action payload data.
module.exports = createCrudController(Notification, {
  resourceName: "Notification",
  searchableFields: ["title", "message", "type"],
  populate: [
    { path: "recipient", select: "name email role" },
    { path: "sender", select: "name email role" },
  ],
});