const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    ticketType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TicketType",
      required: true,
    },

    quantity: {
      type: Number,
      default: 1,
      min: 1,
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "refunded", "waitlisted"],
      default: "pending",
    },

    registrationNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    currency: {
      type: String,
      default: "INR",
      trim: true,
    },

    attendeeDetails: {
      fullName: { type: String, trim: true },
      email: { type: String, trim: true },
      phone: { type: String, trim: true },
      college: { type: String, trim: true },
      photo: { type: String, trim: true },
    },

    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

registrationSchema.index({ event: 1, user: 1, ticketType: 1 });

module.exports = mongoose.model("Registration", registrationSchema);