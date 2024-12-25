const express = require("express");
const router = express.Router();
const {
  getTrips,
  getTrip,
  createTrip,
  deleteTrip,
  updateTrip,
} = require("../controller/trip/tripController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.route("/").get(getTrips);
router.route("/create").post(authMiddleware, roleMiddleware, createTrip);
router.route("/:id").patch(authMiddleware, roleMiddleware, updateTrip).delete(authMiddleware, roleMiddleware, deleteTrip).get(getTrip);

module.exports = router;
