const express = require("express");
const {
	getAll,
	getOne,
	createOne,
	updateOne,
	deleteOne,
} = require("../controllers/eventController");
const { uploadSingle } = require("../middleware/uploadMiddleware");
const { protect } = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");
const {
	attachOrganizerFromAuth,
	canManageEvent,
} = require("../middleware/eventOwnershipMiddleware");

const router = express.Router();

// GET /api/events -> list all events (supports pagination/search via query params)
// POST /api/events -> create new event
router
	.route("/")
	.get(getAll)
	.post(
		protect,
		authorizeRoles("organizer", "admin"),
		attachOrganizerFromAuth,
		uploadSingle("featuredImage"),
		createOne
	);

// GET /api/events/:id -> get one event by id
// PUT /api/events/:id -> update event by id
// DELETE /api/events/:id -> remove event by id
router
	.route("/:id")
	.get(getOne)
	.put(
		protect,
		authorizeRoles("organizer", "admin"),
		canManageEvent,
		uploadSingle("featuredImage"),
		updateOne
	)
	.delete(protect, authorizeRoles("organizer", "admin"), canManageEvent, deleteOne);

module.exports = router;
