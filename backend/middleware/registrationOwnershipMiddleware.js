const Registration = require("../models/Registration");

// Ensure every registration is tied to the currently logged-in user.
const attachRegistrationUser = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Access denied. Authenticate first.",
    });
  }

  req.body.user = req.user._id;
  next();
};

// Allow access to a registration for admin or its owner user.
const canAccessRegistration = async (req, res, next) => {
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
    const registration = await Registration.findById(id).select("user");

    if (!registration) {
      return res.status(404).json({
        success: false,
        message: "Registration not found.",
      });
    }

    if (String(registration.user) !== String(req.user._id)) {
      return res.status(403).json({
        success: false,
        message: "Access denied. You can access only your own registrations.",
      });
    }

    return next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to validate registration access.",
      error: error.message,
    });
  }
};

module.exports = {
  attachRegistrationUser,
  canAccessRegistration,
};
