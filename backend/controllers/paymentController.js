const Payment = require("../models/Payment");
const Event = require("../models/Event");
const User = require("../models/User");
const Registration = require("../models/Registration");
const { createCrudController } = require("../utils/controllerFactory");
const { USER_ROLES } = require("../middleware/roleMiddleware");

// Base CRUD controller
const baseCrud = createCrudController(Payment, {
  resourceName: "Payment",
  searchableFields: ["transactionId", "orderId", "provider", "status"],
  populate: [
    { path: "registration", select: "registrationNumber status amount currency" },
    { path: "user", select: "name email phone" },
    { path: "event", select: "title status organizer" },
  ],
});

// Helper: check if user is event organizer or admin
const isEventOwner = async (userId, eventId, userRole) => {
  if (userRole === USER_ROLES.ADMIN) return true;
  const event = await Event.findById(eventId);
  if (!event) throw new Error("Event not found");
  return event.organizer.toString() === userId.toString();
};

// Get attendee's own payments
const getMyPayments = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    const payments = await Payment.find({ user: userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate([
        { path: "registration", select: "registrationNumber status" },
        { path: "event", select: "title date venue" },
      ]);

    const total = await Payment.countDocuments({ user: userId });

    res.status(200).json({
      success: true,
      message: "Attendee payments retrieved successfully",
      data: payments,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

// Get payments for organizer's event
const getPaymentsByEvent = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;
    const { page = 1, limit = 10, status } = req.query;

    // Check ownership
    const owner = await isEventOwner(userId, eventId, userRole);
    if (!owner) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to view payments for this event",
      });
    }

    const skip = (page - 1) * limit;

    // Build filter
    const filter = { event: eventId };
    if (status) filter.status = status;

    const payments = await Payment.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate([
        { path: "registration", select: "registrationNumber status" },
        { path: "user", select: "name email phone" },
      ]);

    const total = await Payment.countDocuments(filter);

    res.status(200).json({
      success: true,
      message: "Event payments retrieved successfully",
      data: payments,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

// Mark payment as complete (for manual/cash payments)
const markPaymentComplete = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { transactionId, paidAt } = req.body;
    const userId = req.user.id;
    const userRole = req.user.role;

    const payment = await Payment.findById(id).populate("event");
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    // Check ownership
    const owner = await isEventOwner(userId, payment.event._id, userRole);
    if (!owner) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to update this payment",
      });
    }

    // Update payment
    payment.status = "success";
    if (transactionId) payment.transactionId = transactionId;
    payment.paidAt = paidAt || new Date();

    await payment.save();

    res.status(200).json({
      success: true,
      message: "Payment marked as complete",
      data: payment,
    });
  } catch (error) {
    next(error);
  }
};

// Initiate refund
const initiateRefund = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { refundAmount } = req.body;
    const userId = req.user.id;
    const userRole = req.user.role;

    const payment = await Payment.findById(id).populate("event");
    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    // Check ownership
    const owner = await isEventOwner(userId, payment.event._id, userRole);
    if (!owner) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to refund this payment",
      });
    }

    if (payment.status === "refunded") {
      return res.status(400).json({
        success: false,
        message: "This payment is already fully refunded",
      });
    }

    // Calculate refund amount
    const amountToRefund = refundAmount || payment.amount;
    if (amountToRefund > payment.amount - payment.refundAmount) {
      return res.status(400).json({
        success: false,
        message: "Refund amount exceeds available balance",
      });
    }

    payment.refundAmount += amountToRefund;
    payment.refundedAt = new Date();
    payment.status =
      payment.refundAmount >= payment.amount ? "refunded" : "partial_refund";

    await payment.save();

    res.status(200).json({
      success: true,
      message: "Refund initiated successfully",
      data: payment,
    });
  } catch (error) {
    next(error);
  }
};

// Get event revenue summary
const getEventRevenueStats = async (req, res, next) => {
  try {
    const { eventId } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;

    // Check ownership
    const owner = await isEventOwner(userId, eventId, userRole);
    if (!owner) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to view revenue for this event",
      });
    }

    // Aggregate stats
    const ObjectId = require("mongoose").Types.ObjectId;
    const stats = await Payment.aggregate([
      { $match: { event: new ObjectId(eventId) } },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
          total: { $sum: "$amount" },
          refunded: { $sum: "$refundAmount" },
        },
      },
    ]);

    // Total stats
    const allPayments = await Payment.find({ event: eventId });
    const totalRevenue = allPayments.reduce((sum, p) => sum + p.amount, 0);
    const totalRefunded = allPayments.reduce((sum, p) => sum + p.refundAmount, 0);
    const netRevenue = totalRevenue - totalRefunded;

    const statusBreakdown = {};
    stats.forEach((stat) => {
      statusBreakdown[stat._id] = {
        count: stat.count,
        gross: stat.total,
        refunded: stat.refunded,
        net: stat.total - stat.refunded,
      };
    });

    res.status(200).json({
      success: true,
      message: "Event revenue statistics retrieved successfully",
      data: {
        eventId,
        summary: {
          totalRevenue,
          totalRefunded,
          netRevenue,
          totalTransactions: allPayments.length,
        },
        byStatus: statusBreakdown,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  ...baseCrud,
  getMyPayments,
  getPaymentsByEvent,
  markPaymentComplete,
  initiateRefund,
  getEventRevenueStats,
};