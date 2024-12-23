const express = require("express");
const router = express.Router();

const { createBus } = require("../controller/bus/busController");

router.route("/create").post(createBus);

module.exports = router;
// router.route("/signup").post(signup);
// router.route("/logout").post(logout);
// const userSchema = require("../validator/usrValidator");
