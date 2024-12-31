const express = require("express");
const router = express.Router();

const {
  getAllUsers,
  getOneUser,
  updateUser,
  deleteUser,
} = require("../controller/user/userController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.route("/").get(authMiddleware, roleMiddleware, getAllUsers);
router.route("/:id").get(authMiddleware, getOneUser);
router.route("/:id").put(authMiddleware, roleMiddleware, updateUser);
router.route("/:id").delete(authMiddleware, roleMiddleware, deleteUser);

module.exports = router;
