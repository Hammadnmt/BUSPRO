const express = require("express");
const router = express.Router();

const {
  createPromoCode,
  getPromoCode,
} = require("../controller/promo/promoController");

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

router.route("/create").post(authMiddleware, roleMiddleware, createPromoCode);
router.route("/:id").get(authMiddleware, getPromoCode);

module.exports = router;
