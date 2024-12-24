const express = require("express");
const router = express.Router();
const {
  getTrips,
  getTrip,
  createTrip,
  deleteTrip,
  updateTrip,
} = require("../controller/trip/tripController");

router.route("/").get(getTrips);
router.route("/create").post(createTrip);
router.route("/:id").patch(updateTrip).delete(deleteTrip).get(getTrip);

module.exports = router;
