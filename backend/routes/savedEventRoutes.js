const express = require("express");
const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} = require("../controllers/savedEventController");
const { protect } = require("../middleware/authMiddleware");
const { validateObjectId } = require("../middleware/validateMiddleware");

const router = express.Router();

// Saved event CRUD endpoints
router.route("/").get(protect, getAll).post(protect, createOne);
router
  .route("/:id")
  .get(protect, validateObjectId("id"), getOne)
  .put(protect, validateObjectId("id"), updateOne)
  .delete(protect, validateObjectId("id"), deleteOne);

module.exports = router;