const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
  getPaginatedUsers,
} = require("../controller/user/userController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.route("/").get(authMiddleware, roleMiddleware, getAllUsers);

router.route("/user").get(authMiddleware, roleMiddleware, getPaginatedUsers);
router
  .route("/:id")
  .get(authMiddleware, getOneUser)
  .put(authMiddleware, roleMiddleware, updateUser)
  .delete(authMiddleware, roleMiddleware, deleteUser);

module.exports = router;
