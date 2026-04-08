const express = require("express");
const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} = require("../controllers/ticketController");

const router = express.Router();

// Ticket CRUD endpoints
router.route("/").get(getAll).post(createOne);
router.route("/:id").get(getOne).put(updateOne).delete(deleteOne);

module.exports = router;