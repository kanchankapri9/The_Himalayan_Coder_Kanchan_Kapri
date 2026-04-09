const express = require("express");
const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
  getMySavedEvents,
  deleteByEventId,
} = require("../controllers/savedEventController");
const { protect } = require("../middleware/authMiddleware");
const { validateObjectId } = require("../middleware/validateMiddleware");

const router = express.Router();

router.route("/my").get(protect, getMySavedEvents);
router.route("/event/:eventId").delete(protect, validateObjectId("eventId"), deleteByEventId);

// Saved event CRUD endpoints
router.route("/").get(protect, getAll).post(protect, createOne);
router
  .route("/:id")
  .get(protect, validateObjectId("id"), getOne)
  .put(protect, validateObjectId("id"), updateOne)
  .delete(protect, validateObjectId("id"), deleteOne);

module.exports = router;