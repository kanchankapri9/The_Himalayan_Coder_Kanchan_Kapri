const mongoose = require("mongoose");

const venueSchema = new mongoose.Schema(
  {
    organizer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
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

    addressLine1: {
      type: String,
      required: true,
      trim: true,
    },

    addressLine2: {
      type: String,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      trim: true,
    },

    country: {
      type: String,
      required: true,
      trim: true,
    },

    postalCode: {
      type: String,
      trim: true,
    },

    latitude: {
      type: Number,
    },

    longitude: {
      type: Number,
    },

    landmark: {
      type: String,
      trim: true,
    },

    capacity: {
      type: Number,
      min: 0,
      default: 0,
    },

    isVirtual: {
      type: Boolean,
      default: false,
    },

    virtualLink: {
      type: String,
      trim: true,
    },

    contactName: {
      type: String,
      trim: true,
    },

    contactPhone: {
      type: String,
      trim: true,
    },

    amenities: [{ type: String, trim: true }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Venue", venueSchema);