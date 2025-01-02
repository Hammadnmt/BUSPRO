const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: [true, "Booking reference is required"],
    },
    amount: {
      type: Number,
      required: [true, "Amount is required"],
    },
    status: {
      type: String,
      lowercase: true,
      enum: ["success", "failed", "pending"],
      default: "pending",
    },
    payment_method: {
      type: String,
      lowercase: true,
      enum: ["debit card", "jazzcash"],
      required: [true, "Payment mode is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Payment = mongoose.model("Payment", PaymentSchema);
module.exports = Payment;
