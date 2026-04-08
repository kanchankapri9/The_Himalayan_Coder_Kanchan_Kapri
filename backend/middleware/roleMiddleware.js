const { USER_ROLES } = require("../constants/enums");

// Restrict route access based on logged-in user's role.
// Usage: authorizeRoles("admin") or authorizeRoles("organizer", "admin")
const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Access denied. Authenticate first.",
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Required role: ${allowedRoles.join(", ")}.`,
      });
    }

    next();
  };
};

module.exports = { authorizeRoles, USER_ROLES };
