const AnalyticsEvent = require("../models/AnalyticsEvent");
const { createCrudController } = require("../utils/controllerFactory");

// Analytics controller stores interaction events used for dashboard insights.
module.exports = createCrudController(AnalyticsEvent, {
  resourceName: "Analytics",
  searchableFields: ["type", "metricName"],
  populate: [
    { path: "event", select: "title status startDate endDate" },
    { path: "organizer", select: "name email role" },
  ],
});
