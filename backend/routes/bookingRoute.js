const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  createBooking,
  getBookings,
  deleteBooking,
  updateBooking,
  getBookingByUserId,
  getBookingByTripId,
} = require("../controller/booking/bookingController");

router.route("/").get(authMiddleware, getBookings);
router.route("/create").post(authMiddleware, createBooking);
router
  .route("/:id")
  .delete(authMiddleware, roleMiddleware, deleteBooking)
  .patch(authMiddleware, roleMiddleware, updateBooking);

router.route("/user/:id").get(authMiddleware, getBookingByUserId)
router.route("/trip/:id").get(authMiddleware, roleMiddleware, getBookingByTripId)
module.exports = router;
