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
const { authorizeRoles, USER_ROLES } = require("../middleware/roleMiddleware");
const {
	attachOrganizerFromAuth,
	canManageEvent,
} = require("../middleware/eventOwnershipMiddleware");
const { validateObjectId, validateEventPayload } = require("../middleware/validateMiddleware");
const { enforceEventDomainRules } = require("../middleware/domainValidationMiddleware");

const router = express.Router();

// GET /api/events -> list all events (supports pagination/search via query params)
// POST /api/events -> create new event
router
	.route("/")
	.get(getAll)
	.post(
		protect,
		authorizeRoles(USER_ROLES.ORGANIZER, USER_ROLES.ADMIN),
		attachOrganizerFromAuth,
		validateEventPayload(),
		enforceEventDomainRules,
		uploadSingle("featuredImage"),
		createOne
	);

// GET /api/events/:id -> get one event by id
// PUT /api/events/:id -> update event by id
// DELETE /api/events/:id -> remove event by id
router
	.route("/:id")
	.get(validateObjectId("id"), getOne)
	.put(
		protect,
		authorizeRoles(USER_ROLES.ORGANIZER, USER_ROLES.ADMIN),
		validateObjectId("id"),
		canManageEvent,
		validateEventPayload({ partial: true }),
		enforceEventDomainRules,
		uploadSingle("featuredImage"),
		updateOne
	)
	.delete(
		protect,
		authorizeRoles(USER_ROLES.ORGANIZER, USER_ROLES.ADMIN),
		validateObjectId("id"),
		canManageEvent,
		deleteOne
	);

module.exports = router;
