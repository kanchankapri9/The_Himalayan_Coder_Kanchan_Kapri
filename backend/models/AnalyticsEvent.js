const mongoose = require("mongoose");

const analyticsEventSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    type: {
      type: String,
      enum: ["page_view", "ticket_view", "registration", "payment", "checkin", "share", "custom"],
      required: true,
    },

    metricName: {
      type: String,
      trim: true,
    },

    count: {
      type: Number,
      default: 1,
      min: 1,
    },

    value: {
      type: Number,
      default: 0,
    },

    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    occurredAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

analyticsEventSchema.index({ event: 1, type: 1, occurredAt: -1 });

module.exports = mongoose.model("AnalyticsEvent", analyticsEventSchema);