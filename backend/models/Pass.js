const mongoose = require("mongoose");

const passSchema = new mongoose.Schema(
  {
    registration: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Registration",
      required: true,
      unique: true,
    },

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

    passNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    qrCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    status: {
      type: String,
      enum: ["active", "used", "revoked", "expired"],
      default: "active",
    },

    issuedAt: {
      type: Date,
      default: Date.now,
    },

    validFrom: {
      type: Date,
    },

    validUntil: {
      type: Date,
    },

    usedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pass", passSchema);