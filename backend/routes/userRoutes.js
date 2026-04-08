const express = require("express");
const {
	getAll,
	getOne,
	createOne,
	updateOne,
	deleteOne,
} = require("../controllers/userController");
const { validateObjectId } = require("../middleware/validateMiddleware");

const router = express.Router();

// GET /api/users -> list all users
// POST /api/users -> create a new user record
router.route("/").get(getAll).post(createOne);

// GET /api/users/:id -> get one user
// PUT /api/users/:id -> update one user
// DELETE /api/users/:id -> delete one user
router
	.route("/:id")
	.get(validateObjectId("id"), getOne)
	.put(validateObjectId("id"), updateOne)
	.delete(validateObjectId("id"), deleteOne);

module.exports = router;
