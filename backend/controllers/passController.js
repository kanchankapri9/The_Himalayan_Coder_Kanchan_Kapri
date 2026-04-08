const Pass = require("../models/Pass");
const { createCrudController } = require("../utils/controllerFactory");

// Pass controller manages QR-based event passes issued after successful registration.
// Pass records are used during gate check-in verification.
module.exports = createCrudController(Pass, {
  resourceName: "Pass",
  searchableFields: ["passNumber", "qrCode", "status"],
  populate: [
    { path: "registration", select: "registrationNumber status" },
    { path: "event", select: "title status startDate endDate" },
    { path: "user", select: "name email phone" },
  ],
});