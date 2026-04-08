const express = require("express");
const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} = require("../controllers/analyticsController");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

const router = express.Router();

// Analytics CRUD endpoints
router
  .route("/")
  .get(protect, authorizeRoles("admin"), getAll)
  .post(protect, authorizeRoles("admin"), createOne);
router
  .route("/:id")
  .get(protect, authorizeRoles("admin"), getOne)
  .put(protect, authorizeRoles("admin"), updateOne)
  .delete(protect, authorizeRoles("admin"), deleteOne);

module.exports = router;