const express = require("express");
const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} = require("../controllers/notificationController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles, USER_ROLES } = require("../middleware/roleMiddleware");
const { validateObjectId } = require("../middleware/validateMiddleware");

const router = express.Router();

// Notification CRUD endpoints
router
  .route("/")
  .get(protect, getAll)
  .post(
    protect,
    authorizeRoles(USER_ROLES.ORGANIZER, USER_ROLES.ADMIN),
    createOne
  );
router
  .route("/:id")
  .get(protect, validateObjectId("id"), getOne)
  .put(protect, validateObjectId("id"), updateOne)
  .delete(
    protect,
    authorizeRoles(USER_ROLES.ORGANIZER, USER_ROLES.ADMIN),
    validateObjectId("id"),
    deleteOne
  );

module.exports = router;