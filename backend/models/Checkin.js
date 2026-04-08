const mongoose = require("mongoose");

const checkinSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    registration: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Registration",
      required: true,
    },

    pass: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Pass",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    checkedInBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    status: {
      type: String,
      enum: ["success", "failed", "duplicate", "manual"],
      default: "success",
    },

    checkInTime: {
      type: Date,
      default: Date.now,
    },

    gate: {
      type: String,
      trim: true,
    },

    deviceInfo: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    location: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },

    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

checkinSchema.index({ event: 1, registration: 1, checkInTime: -1 });

module.exports = mongoose.model("Checkin", checkinSchema);