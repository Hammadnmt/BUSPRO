const express = require("express");
const router = express.Router();

const { login, signup, logout, handleUser } = require("../controller/auth/authController");
// const userSchema = require("../validator/usrValidator");

router.route("/login").post(login);
router.route("/handleuser").post(handleUser);
router.route("/signup").post(signup);
router.route("/logout").post(logout);

module.exports = router;
