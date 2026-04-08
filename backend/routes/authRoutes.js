const express = require("express");
const { register, login, getMe } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const { uploadSingle } = require("../middleware/uploadMiddleware");
const { requireBodyFields } = require("../middleware/validateMiddleware");

const router = express.Router();

// POST /api/auth/register -> create account
router.post(
	"/register",
	uploadSingle("avatar"),
	requireBodyFields(["name", "email", "password"]),
	register
);

// POST /api/auth/login -> sign in with email and password
router.post("/login", login);

// GET /api/auth/me -> fetch profile of logged-in user
router.get("/me", protect, getMe);

module.exports = router;