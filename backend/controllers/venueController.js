const Venue = require("../models/Venue");
const { createCrudController } = require("../utils/controllerFactory");

// Venue controller stores the physical or virtual place where an event happens.
module.exports = createCrudController(Venue, {
  resourceName: "Venue",
  searchableFields: ["name", "city", "state", "country", "landmark"],
  populate: [{ path: "organizer", select: "name email role avatar" }],
});