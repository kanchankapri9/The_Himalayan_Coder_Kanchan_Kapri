const Checkin = require("../models/Checkin");
const { createCrudController } = require("../utils/controllerFactory");

// Check-in controller records pass scans at entry gates.
// It helps organizers monitor attendance and detect duplicate scans.
module.exports = createCrudController(Checkin, {
  resourceName: "Checkin",
  searchableFields: ["status", "gate", "notes"],
  populate: [
    { path: "event", select: "title status startDate endDate" },
    { path: "registration", select: "registrationNumber status" },
    { path: "pass", select: "passNumber qrCode status" },
    { path: "user", select: "name email phone" },
    { path: "checkedInBy", select: "name email role" },
  ],
});