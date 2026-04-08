const Event = require("../models/Event");

// Ensure event create requests always bind organizer to the logged-in organizer.
const attachOrganizerFromAuth = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Access denied. Authenticate first.",
    });
  }

  if (req.user.role === "organizer") {
    req.body.organizer = req.user._id;
  }

  next();
};

// Allow event update/delete only for admin or the event owner organizer.
const canManageEvent = async (req, res, next) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Access denied. Authenticate first.",
      });
    }

    if (req.user.role === "admin") {
      return next();
    }

    const { id } = req.params;
    const event = await Event.findById(id).select("organizer");

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found.",
      });
    }

    if (String(event.organizer) !== String(req.user._id)) {
      return res.status(403).json({
        success: false,
        message: "Access denied. You can manage only your own events.",
      });
    }

    return next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to validate event ownership.",
      error: error.message,
    });
  }
};

module.exports = {
  attachOrganizerFromAuth,
  canManageEvent,
};
