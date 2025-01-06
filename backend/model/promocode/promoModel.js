const mongoose = require("mongoose");

const promoSchema = mongoose.Schema({
  promoCode: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "expired"],
    default: "active",
    lowercase: true,
  },
});
const PromoCode = mongoose.model("Promo", promoSchema);
module.exports = PromoCode;
