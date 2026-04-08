const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    registration: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Registration",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },

    provider: {
      type: String,
      enum: ["razorpay", "stripe", "cash", "manual", "other"],
      default: "razorpay",
    },

    transactionId: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },

    orderId: {
      type: String,
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

    status: {
      type: String,
      enum: ["pending", "success", "failed", "refunded", "partial_refund"],
      default: "pending",
    },

    paymentMethod: {
      type: String,
      trim: true,
    },

    paidAt: {
      type: Date,
    },

    refundedAt: {
      type: Date,
    },

    refundAmount: {
      type: Number,
      min: 0,
      default: 0,
    },

    metadata: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", paymentSchema);