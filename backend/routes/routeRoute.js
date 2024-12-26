const express = require("express");
const router = express.Router();

const {
  getAllRoutes,
  getOneRoute,
  updateRoute,
  deleteRoute,
} = require("../controller/route/routeController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.route("/").get(getAllRoutes);
router.route("/:id").get(authMiddleware, roleMiddleware, getOneRoute);
router.route("/:id").put(authMiddleware, roleMiddleware, updateRoute);
router.route("/:id").delete(authMiddleware, roleMiddleware, deleteRoute);

module.exports = router;
