const TicketType = require("../models/TicketType");
const { createCrudController } = require("../utils/controllerFactory");

// Ticket controller manages event ticket tiers (price, quantity, sale windows).
module.exports = createCrudController(TicketType, {
  resourceName: "Ticket",
  searchableFields: ["name", "description", "currency"],
  populate: [{ path: "event", select: "title status startDate endDate" }],
});
