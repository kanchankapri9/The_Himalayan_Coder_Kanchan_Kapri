const express = require("express");
const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
  getMyRegistrations,
  getRegistrationsByEvent,
  approveRegistration,
  rejectRegistration,
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

router
  .route("/my")
  .get(protect, getMyRegistrations);

router
  .route("/event/:eventId")
  .get(
    protect,
    authorizeRoles(USER_ROLES.ORGANIZER, USER_ROLES.ADMIN),
    validateObjectId("eventId"),
    getRegistrationsByEvent
  );

router
  .route("/:id/approve")
  .patch(
    protect,
    authorizeRoles(USER_ROLES.ORGANIZER, USER_ROLES.ADMIN),
    validateObjectId("id"),
    approveRegistration
  );

router
  .route("/:id/reject")
  .patch(
    protect,
    authorizeRoles(USER_ROLES.ORGANIZER, USER_ROLES.ADMIN),
    validateObjectId("id"),
    rejectRegistration
  );

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