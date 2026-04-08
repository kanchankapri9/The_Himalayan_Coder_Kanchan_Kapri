const mongoose = require("mongoose");

const ticketTypeSchema = new mongoose.Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    currency: {
      type: String,
      default: "INR",
      trim: true,
    },

    totalQuantity: {
      type: Number,
      required: true,
      min: 0,
    },

    soldQuantity: {
      type: Number,
      default: 0,
      min: 0,
    },

    maxPerUser: {
      type: Number,
      default: 1,
      min: 1,
    },

    salesStart: {
      type: Date,
    },

    salesEnd: {
      type: Date,
    },

    benefits: [{ type: String, trim: true }],

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("TicketType", ticketTypeSchema);