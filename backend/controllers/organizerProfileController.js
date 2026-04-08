const OrganizerProfile = require("../models/OrganizerProfile");
const { createCrudController } = require("../utils/controllerFactory");

// Organizer profile data connects a user account to a public organizer identity.
module.exports = createCrudController(OrganizerProfile, {
  resourceName: "OrganizerProfile",
  searchableFields: ["organizationName", "bio", "city", "contactEmail"],
  populate: [{ path: "user", select: "name email role avatar" }],
});