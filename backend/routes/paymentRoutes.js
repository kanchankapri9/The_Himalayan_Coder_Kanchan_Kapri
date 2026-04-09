const express = require("express");
const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
  getMyPayments,
  getPaymentsByEvent,
  markPaymentComplete,
  initiateRefund,
  getEventRevenueStats,
} = require("../controllers/paymentController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles, USER_ROLES } = require("../middleware/roleMiddleware");
const { validateObjectId } = require("../middleware/validateMiddleware");

const router = express.Router();

// Attendee routes
router
  .route("/my")
  .get(
    protect,
    authorizeRoles(USER_ROLES.ATTENDEE),
    getMyPayments
  );

// Organizer routes - Event-scoped
router
  .route("/event/:eventId")
  .get(
    protect,
    authorizeRoles(USER_ROLES.ORGANIZER, USER_ROLES.ADMIN),
    validateObjectId("eventId"),
    getPaymentsByEvent
  );

router
  .route("/event/:eventId/summary")
  .get(
    protect,
    authorizeRoles(USER_ROLES.ORGANIZER, USER_ROLES.ADMIN),
    validateObjectId("eventId"),
    getEventRevenueStats
  );

// Payment action routes
router
  .route("/:id/mark-complete")
  .patch(
    protect,
    authorizeRoles(USER_ROLES.ORGANIZER, USER_ROLES.ADMIN),
    validateObjectId("id"),
    markPaymentComplete
  );

router
  .route("/:id/refund")
  .patch(
    protect,
    authorizeRoles(USER_ROLES.ORGANIZER, USER_ROLES.ADMIN),
    validateObjectId("id"),
    initiateRefund
  );

// Generic Payment CRUD endpoints (admin only)
router
  .route("/")
  .get(
    protect,
    authorizeRoles(USER_ROLES.ORGANIZER, USER_ROLES.ADMIN),
    getAll
  )
  .post(
    protect,
    authorizeRoles(USER_ROLES.ATTENDEE, USER_ROLES.ORGANIZER, USER_ROLES.ADMIN),
    createOne
  );

router
  .route("/:id")
  .get(
    protect,
    authorizeRoles(USER_ROLES.ORGANIZER, USER_ROLES.ADMIN),
    validateObjectId("id"),
    getOne
  )
  .put(
    protect,
    authorizeRoles(USER_ROLES.ORGANIZER, USER_ROLES.ADMIN),
    validateObjectId("id"),
    updateOne
  )
  .delete(
    protect,
    authorizeRoles(USER_ROLES.ORGANIZER, USER_ROLES.ADMIN),
    validateObjectId("id"),
    deleteOne
  );

module.exports = router;