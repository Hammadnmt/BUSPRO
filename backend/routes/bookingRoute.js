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
  getBookingByUserIdRouteId,
  getPaginatedBookings,
} = require("../controller/booking/bookingController");

router.route("/").get(authMiddleware, getBookings);
router
  .route("/booking/")
  .get(authMiddleware, roleMiddleware, getPaginatedBookings);

router.route("/create").post(authMiddleware, createBooking);
router
  .route("/:id")
  .delete(authMiddleware, roleMiddleware, deleteBooking)
  .patch(authMiddleware, roleMiddleware, updateBooking);

router.route("/user/:id").get(authMiddleware, getBookingByUserId);
router.route("/user/").get(authMiddleware, getBookingByUserIdRouteId);
router.route("/trip/:id").get(getBookingByTripId);
module.exports = router;
