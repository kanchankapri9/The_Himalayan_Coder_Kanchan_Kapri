const express = require("express");
const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} = require("../controllers/registrationController");
const { uploadSingle } = require("../middleware/uploadMiddleware");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles, USER_ROLES } = require("../middleware/roleMiddleware");
const {
  attachRegistrationUser,
  canAccessRegistration,
} = require("../middleware/registrationOwnershipMiddleware");
const {
  validateObjectId,
  validateRegistrationPayload,
} = require("../middleware/validateMiddleware");
const { enforceRegistrationDomainRules } = require("../middleware/domainValidationMiddleware");

const router = express.Router();

// Registration CRUD endpoints
router
  .route("/")
  .get(protect, authorizeRoles(USER_ROLES.ORGANIZER, USER_ROLES.ADMIN), getAll)
  .post(
    protect,
    attachRegistrationUser,
    validateRegistrationPayload(),
    enforceRegistrationDomainRules,
    uploadSingle("attendeePhoto"),
    createOne
  );
router
  .route("/:id")
  .get(protect, validateObjectId("id"), canAccessRegistration, getOne)
  .put(
    protect,
    validateObjectId("id"),
    canAccessRegistration,
    validateRegistrationPayload({ partial: true }),
    enforceRegistrationDomainRules,
    uploadSingle("attendeePhoto"),
    updateOne
  )
  .delete(protect, validateObjectId("id"), canAccessRegistration, deleteOne);

module.exports = router;