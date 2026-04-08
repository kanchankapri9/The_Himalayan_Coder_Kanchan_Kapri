const Registration = require("../models/Registration");
const { createCrudController } = require("../utils/controllerFactory");

// Registration controller tracks attendee bookings for events and ticket types.
// This is the core booking record linked to payment and pass generation.
module.exports = createCrudController(Registration, {
  resourceName: "Registration",
  searchableFields: ["registrationNumber", "status", "currency"],
  uploadField: "attendeeDetails.photo",
  populate: [
    { path: "event", select: "title status startDate endDate" },
    { path: "user", select: "name email phone college" },
    { path: "ticketType", select: "name price currency" },
  ],
});