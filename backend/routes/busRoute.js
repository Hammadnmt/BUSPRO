const express = require("express");
const router = express.Router();

const {
  createBus,
  getBus,
  getBuses,
  updateBus,
  deleteBus,
  getPaginatedBuses,
} = require("../controller/bus/busController");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.route("/create").post(authMiddleware, roleMiddleware, createBus);
router.route("/").get(authMiddleware, roleMiddleware, getBuses);
router.route("/bus").get(authMiddleware, roleMiddleware, getPaginatedBuses);
router
  .route("/:id")
  .get(authMiddleware, roleMiddleware, getBus)
  .patch(authMiddleware, roleMiddleware, updateBus)
  .delete(authMiddleware, roleMiddleware, deleteBus);

module.exports = router;
