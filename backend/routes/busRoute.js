const express = require("express");
const router = express.Router();

const {
  createBus,
  getBus,
  getBuses,
  updateBus,
  deleteBus,
} = require("../controller/bus/busController");

router.route("/create").post(createBus);
router.route("/").get(getBuses);
router.route("/:id").get(getBus).patch(updateBus).delete(deleteBus);

module.exports = router;
