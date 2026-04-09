const Registration = require("../models/Registration");
const Event = require("../models/Event");
const Pass = require("../models/Pass");
const crypto = require("crypto");
const { createCrudController } = require("../utils/controllerFactory");
const { USER_ROLES } = require("../constants/enums");

// Registration controller tracks attendee bookings for events and ticket types.
// This is the core booking record linked to payment and pass generation.
const crud = createCrudController(Registration, {
  resourceName: "Registration",
  searchableFields: ["registrationNumber", "status", "currency"],
  uploadField: "attendeeDetails.photo",
  populate: [
    { path: "event", select: "title status startDate endDate" },
    { path: "user", select: "name email phone college" },
    { path: "ticketType", select: "name price currency" },
  ],
});

const buildListMeta = async (filter, page, limit) => {
  const total = await Registration.countDocuments(filter);
  const pages = total === 0 ? 0 : Math.ceil(total / limit);
  return { total, pages };
};

const getMyRegistrations = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Access denied. Authenticate first.",
      });
    }

    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limit = Math.max(parseInt(req.query.limit || "20", 10), 1);
    const search = (req.query.search || "").trim();
    const sort = req.query.sort || "-createdAt";

    const filter = req.user.role === USER_ROLES.ADMIN ? {} : { user: req.user._id };

    if (search) {
      filter.$or = [
        { registrationNumber: { $regex: search, $options: "i" } },
        { status: { $regex: search, $options: "i" } },
      ];
    }

    const { total, pages } = await buildListMeta(filter, page, limit);

    const data = await Registration.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate({ path: "event", select: "title status startDate endDate featuredImage" })
      .populate({ path: "user", select: "name email phone college" })
      .populate({ path: "ticketType", select: "name price currency" });

    return res.status(200).json({
      success: true,
      message: "Your registrations loaded successfully.",
      count: data.length,
      total,
      page,
      pages,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to load your registrations.",
      error: error.message,
    });
  }
};

const getRegistrationsByEvent = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Access denied. Authenticate first.",
      });
    }

    const { eventId } = req.params;
    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limit = Math.max(parseInt(req.query.limit || "20", 10), 1);
    const search = (req.query.search || "").trim();
    const sort = req.query.sort || "-createdAt";

    const event = await Event.findById(eventId).select("organizer");
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    const isAdmin = req.user.role === USER_ROLES.ADMIN;
    const isOwnerOrganizer = String(event.organizer) === String(req.user._id);

    if (!isAdmin && !isOwnerOrganizer) {
      return res.status(403).json({
        success: false,
        message: "Access denied. You can view registrations only for your own event.",
      });
    }

    const filter = { event: eventId };
    if (search) {
      filter.$or = [
        { registrationNumber: { $regex: search, $options: "i" } },
        { status: { $regex: search, $options: "i" } },
      ];
    }

    const { total, pages } = await buildListMeta(filter, page, limit);

    const data = await Registration.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate({ path: "event", select: "title status startDate endDate featuredImage" })
      .populate({ path: "user", select: "name email phone college" })
      .populate({ path: "ticketType", select: "name price currency" });

    return res.status(200).json({
      success: true,
      message: "Event registrations loaded successfully.",
      count: data.length,
      total,
      page,
      pages,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to load event registrations.",
      error: error.message,
    });
  }
};

const ensureOrganizerOwnership = async (registration, user) => {
  if (user.role === USER_ROLES.ADMIN) {
    return { allowed: true };
  }

  if (user.role !== USER_ROLES.ORGANIZER) {
    return {
      allowed: false,
      status: 403,
      message: "Access denied. Organizer role required.",
    };
  }

  const event = await Event.findById(registration.event).select("organizer startDate endDate title");
  if (!event) {
    return {
      allowed: false,
      status: 404,
      message: "Event not found for this registration.",
    };
  }

  if (String(event.organizer) !== String(user._id)) {
    return {
      allowed: false,
      status: 403,
      message: "Access denied. You can manage registrations only for your own events.",
    };
  }

  return { allowed: true, event };
};

const generateUniquePassNumber = async () => {
  let passNumber;
  let exists = true;

  while (exists) {
    passNumber = `PASS-${Date.now()}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
    exists = await Pass.exists({ passNumber });
  }

  return passNumber;
};

const approveRegistration = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Access denied. Authenticate first.",
      });
    }

    const { id } = req.params;
    const registration = await Registration.findById(id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Registration not found.",
      });
    }

    const ownership = await ensureOrganizerOwnership(registration, req.user);
    if (!ownership.allowed) {
      return res.status(ownership.status).json({
        success: false,
        message: ownership.message,
      });
    }

    if (["cancelled", "refunded"].includes(registration.status)) {
      return res.status(400).json({
        success: false,
        message: `Cannot approve a ${registration.status} registration.`,
      });
    }

    registration.status = "confirmed";
    await registration.save();

    let pass = await Pass.findOne({ registration: registration._id });

    if (!pass) {
      const passNumber = await generateUniquePassNumber();
      const qrCode = `QR-${crypto.randomBytes(16).toString("hex").toUpperCase()}`;

      pass = await Pass.create({
        registration: registration._id,
        event: registration.event,
        user: registration.user,
        passNumber,
        qrCode,
        status: "active",
        issuedAt: new Date(),
        validFrom: ownership.event?.startDate,
        validUntil: ownership.event?.endDate,
      });
    }

    const updatedRegistration = await Registration.findById(registration._id)
      .populate({ path: "event", select: "title status startDate endDate featuredImage" })
      .populate({ path: "user", select: "name email phone college" })
      .populate({ path: "ticketType", select: "name price currency" });

    const populatedPass = await Pass.findById(pass._id)
      .populate({ path: "registration", select: "registrationNumber status" })
      .populate({ path: "event", select: "title startDate endDate status" })
      .populate({ path: "user", select: "name email phone" });

    return res.status(200).json({
      success: true,
      message: "Registration approved successfully.",
      data: {
        registration: updatedRegistration,
        pass: populatedPass,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to approve registration.",
      error: error.message,
    });
  }
};

const rejectRegistration = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Access denied. Authenticate first.",
      });
    }

    const { id } = req.params;
    const registration = await Registration.findById(id);

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Registration not found.",
      });
    }

    const ownership = await ensureOrganizerOwnership(registration, req.user);
    if (!ownership.allowed) {
      return res.status(ownership.status).json({
        success: false,
        message: ownership.message,
      });
    }

    if (registration.status === "cancelled") {
      return res.status(200).json({
        success: true,
        message: "Registration is already rejected/cancelled.",
        data: registration,
      });
    }

    if (!["pending", "waitlisted"].includes(registration.status)) {
      return res.status(400).json({
        success: false,
        message: `Only pending or waitlisted registrations can be rejected. Current status is ${registration.status}.`,
      });
    }

    registration.status = "cancelled";
    await registration.save();

    const updatedRegistration = await Registration.findById(registration._id)
      .populate({ path: "event", select: "title status startDate endDate featuredImage" })
      .populate({ path: "user", select: "name email phone college" })
      .populate({ path: "ticketType", select: "name price currency" });

    return res.status(200).json({
      success: true,
      message: "Registration rejected successfully.",
      data: updatedRegistration,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to reject registration.",
      error: error.message,
    });
  }
};

module.exports = {
  ...crud,
  getMyRegistrations,
  getRegistrationsByEvent,
  approveRegistration,
  rejectRegistration,
};