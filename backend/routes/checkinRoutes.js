const express = require("express");
const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
  verifyCheckin,
  markCheckin,
  getCheckinsByEvent,
} = require("../controllers/checkinController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles, USER_ROLES } = require("../middleware/roleMiddleware");
const { validateObjectId } = require("../middleware/validateMiddleware");

const router = express.Router();

router
  .route("/verify")
  .post(
    protect,
    authorizeRoles(USER_ROLES.ORGANIZER, USER_ROLES.ADMIN),
    verifyCheckin
  );

router
  .route("/mark")
  .post(
    protect,
    authorizeRoles(USER_ROLES.ORGANIZER, USER_ROLES.ADMIN),
    markCheckin
  );

router
  .route("/event/:eventId")
  .get(
    protect,
    authorizeRoles(USER_ROLES.ORGANIZER, USER_ROLES.ADMIN),
    validateObjectId("eventId"),
    getCheckinsByEvent
  );

// Check-in CRUD endpoints
router
  .route("/")
  .get(protect, authorizeRoles(USER_ROLES.ORGANIZER, USER_ROLES.ADMIN), getAll)
  .post(
    protect,
    authorizeRoles(USER_ROLES.ORGANIZER, USER_ROLES.ADMIN),
    createOne
  );
router
  .route("/:id")
  .get(protect, validateObjectId("id"), getOne)
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