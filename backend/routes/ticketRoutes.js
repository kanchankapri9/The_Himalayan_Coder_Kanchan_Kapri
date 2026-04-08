const express = require("express");
const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} = require("../controllers/ticketController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles, USER_ROLES } = require("../middleware/roleMiddleware");
const { validateObjectId, requireBodyFields } = require("../middleware/validateMiddleware");

const router = express.Router();

// Ticket CRUD endpoints
router
  .route("/")
  .get(getAll)
  .post(
    protect,
    authorizeRoles(USER_ROLES.ORGANIZER, USER_ROLES.ADMIN),
    requireBodyFields(["event", "name", "price", "totalQuantity"]),
    createOne
  );

router
  .route("/:id")
  .get(validateObjectId("id"), getOne)
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