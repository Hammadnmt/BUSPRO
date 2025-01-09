const express = require("express");
const router = express.Router();

const {
  getAllRoutes,
  createRoute,
  getOneRoute,
  updateRoute,
  deleteRoute,
  getPaginatedRoutes,
} = require("../controller/route/routeController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.route("/").get(getAllRoutes);
router.route("/route").get(authMiddleware, roleMiddleware, getPaginatedRoutes);

router.route("/create").post(authMiddleware, roleMiddleware, createRoute);
router
  .route("/:id")
  .get(authMiddleware, roleMiddleware, getOneRoute)
  .put(authMiddleware, roleMiddleware, updateRoute)
  .delete(authMiddleware, roleMiddleware, deleteRoute);

module.exports = router;
