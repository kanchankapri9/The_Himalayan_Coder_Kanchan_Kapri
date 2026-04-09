const Checkin = require("../models/Checkin");
const Pass = require("../models/Pass");
const Registration = require("../models/Registration");
const Event = require("../models/Event");
const { createCrudController } = require("../utils/controllerFactory");
const { USER_ROLES } = require("../constants/enums");

// Check-in controller records pass scans at entry gates.
// It helps organizers monitor attendance and detect duplicate scans.
const crud = createCrudController(Checkin, {
  resourceName: "Checkin",
  searchableFields: ["status", "gate", "notes"],
  populate: [
    { path: "event", select: "title status startDate endDate" },
    { path: "registration", select: "registrationNumber status" },
    { path: "pass", select: "passNumber qrCode status" },
    { path: "user", select: "name email phone" },
    { path: "checkedInBy", select: "name email role" },
  ],
});

const canManageEventCheckins = async (eventId, user) => {
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

  const event = await Event.findById(eventId).select("organizer");
  if (!event) {
    return {
      allowed: false,
      status: 404,
      message: "Event not found.",
    };
  }

  if (String(event.organizer) !== String(user._id)) {
    return {
      allowed: false,
      status: 403,
      message: "Access denied. You can manage check-ins only for your own events.",
    };
  }

  return { allowed: true, event };
};

const verifyCheckin = async (req, res) => {
  try {
    const { qrCode, passNumber } = req.body || {};

    if (!qrCode && !passNumber) {
      return res.status(400).json({
        success: false,
        message: "Validation failed.",
        errors: [
          {
            field: "qrCode/passNumber",
            message: "Provide either qrCode or passNumber.",
          },
        ],
      });
    }

    const passFilter = qrCode ? { qrCode: String(qrCode).trim() } : { passNumber: String(passNumber).trim() };
    const pass = await Pass.findOne(passFilter)
      .populate({ path: "event", select: "title organizer" })
      .populate({ path: "user", select: "name email" })
      .populate({ path: "registration", select: "status" });

    if (!pass) {
      return res.status(404).json({
        success: false,
        message: "Pass not found.",
        data: {
          valid: false,
          alreadyCheckedIn: false,
        },
      });
    }

    if (req.user) {
      const access = await canManageEventCheckins(pass.event?._id, req.user);
      if (!access.allowed) {
        return res.status(access.status).json({
          success: false,
          message: access.message,
        });
      }
    }

    const priorCheckin = await Checkin.findOne({
      pass: pass._id,
      status: { $in: ["success", "manual"] },
    }).select("_id checkInTime gate");

    const registrationStatus = pass.registration?.status || "unknown";
    const passStatus = pass.status;
    const valid = passStatus === "active" && registrationStatus === "confirmed" && !priorCheckin;

    return res.status(200).json({
      success: true,
      message: "Pass verified successfully.",
      data: {
        valid,
        alreadyCheckedIn: Boolean(priorCheckin),
        passStatus,
        registrationStatus,
        attendeeName: pass.user?.name,
        eventTitle: pass.event?.title,
        passId: pass._id,
        registrationId: pass.registration?._id,
        eventId: pass.event?._id,
        userId: pass.user?._id,
        previousCheckin: priorCheckin
          ? {
              id: priorCheckin._id,
              checkInTime: priorCheckin.checkInTime,
              gate: priorCheckin.gate,
            }
          : null,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to verify pass.",
      error: error.message,
    });
  }
};

const markCheckin = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Access denied. Authenticate first.",
      });
    }

    const { event, registration, pass, user, gate, notes } = req.body || {};
    const missing = ["event", "registration", "pass", "user"].filter((field) => !req.body?.[field]);
    if (missing.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Validation failed.",
        errors: missing.map((field) => ({ field, message: `${field} is required.` })),
      });
    }

    const access = await canManageEventCheckins(event, req.user);
    if (!access.allowed) {
      return res.status(access.status).json({
        success: false,
        message: access.message,
      });
    }

    const passDoc = await Pass.findById(pass).populate({ path: "registration", select: "status" });
    if (!passDoc) {
      return res.status(404).json({
        success: false,
        message: "Pass not found.",
      });
    }

    const registrationDoc = await Registration.findById(registration).select("status event user");
    if (!registrationDoc) {
      return res.status(404).json({
        success: false,
        message: "Registration not found.",
      });
    }

    if (
      String(passDoc.registration?._id || passDoc.registration) !== String(registration) ||
      String(passDoc.event) !== String(event) ||
      String(passDoc.user) !== String(user) ||
      String(registrationDoc.event) !== String(event) ||
      String(registrationDoc.user) !== String(user)
    ) {
      return res.status(400).json({
        success: false,
        message: "Registration, pass, event and user must belong to the same booking chain.",
      });
    }

    if (registrationDoc.status !== "confirmed") {
      return res.status(400).json({
        success: false,
        message: "Only confirmed registrations can be checked in.",
      });
    }

    if (passDoc.status !== "active") {
      return res.status(400).json({
        success: false,
        message: `Pass is not active. Current status: ${passDoc.status}.`,
      });
    }

    const existing = await Checkin.findOne({
      pass,
      status: { $in: ["success", "manual"] },
    }).select("_id checkInTime gate");

    if (existing) {
      return res.status(409).json({
        success: false,
        message: "Attendee is already checked in.",
        data: {
          checkinId: existing._id,
          checkInTime: existing.checkInTime,
          gate: existing.gate,
        },
      });
    }

    const checkin = await Checkin.create({
      event,
      registration,
      pass,
      user,
      checkedInBy: req.user._id,
      status: "success",
      checkInTime: new Date(),
      gate: gate || "Main Gate",
      notes,
    });

    passDoc.status = "used";
    passDoc.usedAt = new Date();
    await passDoc.save();

    const populatedCheckin = await Checkin.findById(checkin._id)
      .populate({ path: "event", select: "title status startDate endDate" })
      .populate({ path: "registration", select: "registrationNumber status" })
      .populate({ path: "pass", select: "passNumber qrCode status" })
      .populate({ path: "user", select: "name email phone" })
      .populate({ path: "checkedInBy", select: "name email role" });

    return res.status(201).json({
      success: true,
      message: "Check-in marked successfully.",
      data: populatedCheckin,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to mark check-in.",
      error: error.message,
    });
  }
};

const getCheckinsByEvent = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Access denied. Authenticate first.",
      });
    }

    const { eventId } = req.params;
    const access = await canManageEventCheckins(eventId, req.user);
    if (!access.allowed) {
      return res.status(access.status).json({
        success: false,
        message: access.message,
      });
    }

    const page = Math.max(parseInt(req.query.page || "1", 10), 1);
    const limit = Math.max(parseInt(req.query.limit || "20", 10), 1);
    const sort = req.query.sort || "-checkInTime";

    const filter = { event: eventId };
    if (req.query.status) {
      filter.status = req.query.status;
    }

    const total = await Checkin.countDocuments(filter);
    const pages = total === 0 ? 0 : Math.ceil(total / limit);

    const data = await Checkin.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(limit)
      .populate({ path: "event", select: "title status startDate endDate" })
      .populate({ path: "registration", select: "registrationNumber status" })
      .populate({ path: "pass", select: "passNumber qrCode status" })
      .populate({ path: "user", select: "name email phone" })
      .populate({ path: "checkedInBy", select: "name email role" });

    return res.status(200).json({
      success: true,
      message: "Event check-ins loaded successfully.",
      count: data.length,
      total,
      page,
      pages,
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to load event check-ins.",
      error: error.message,
    });
  }
};

module.exports = {
  ...crud,
  verifyCheckin,
  markCheckin,
  getCheckinsByEvent,
};