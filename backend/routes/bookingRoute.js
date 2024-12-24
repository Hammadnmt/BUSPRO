const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  createBooking,
  getBookings,
  deleteBooking,
} = require("../controller/booking/bookingController");

router.route("/").get(authMiddleware, getBookings);
router.route("/create").post(authMiddleware, createBooking);
router
  .route("/:id")
  .delete(authMiddleware, roleMiddleware, deleteBooking)
  .patch();

  module.exports = router;
