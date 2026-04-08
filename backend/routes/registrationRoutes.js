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
const { authorizeRoles } = require("../middleware/roleMiddleware");
const {
  attachRegistrationUser,
  canAccessRegistration,
} = require("../middleware/registrationOwnershipMiddleware");

const router = express.Router();

// Registration CRUD endpoints
router
  .route("/")
  .get(protect, authorizeRoles("organizer", "admin"), getAll)
  .post(protect, attachRegistrationUser, uploadSingle("attendeePhoto"), createOne);
router
  .route("/:id")
  .get(protect, canAccessRegistration, getOne)
  .put(protect, canAccessRegistration, uploadSingle("attendeePhoto"), updateOne)
  .delete(protect, canAccessRegistration, deleteOne);

module.exports = router;