const Payment = require("../models/Payment");
const { createCrudController } = require("../utils/controllerFactory");

// Payment controller stores transaction history for each registration.
// It supports payment status tracking like success, failure, and refunds.
module.exports = createCrudController(Payment, {
  resourceName: "Payment",
  searchableFields: ["transactionId", "orderId", "provider", "status"],
  populate: [
    { path: "registration", select: "registrationNumber status amount currency" },
    { path: "user", select: "name email phone" },
    { path: "event", select: "title status" },
  ],
});