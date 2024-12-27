const express = require("express");
const router = express.Router();

const {
  getAllRoutes,
  createRoute,
  getOneRoute,
  updateRoute,
  deleteRoute,
} = require("../controller/route/routeController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.route("/").get(getAllRoutes);
router.route("/create").post(authMiddleware, roleMiddleware, createRoute);
router
  .route("/:id")
  .get(authMiddleware, roleMiddleware, getOneRoute)
  .put(authMiddleware, roleMiddleware, updateRoute)
  .delete(authMiddleware, roleMiddleware, deleteRoute);

module.exports = router;
