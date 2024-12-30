const mongoose = require("mongoose");
const seatSchema = new mongoose.Schema({
  seat_no: {
    type: Number,
    required: true,
  },
  isReserved: {
    type: Boolean,
    default: false,
  },
  reservedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    default: null, // Initially null, will be set when the seat is reserved
  },
});

export const Seat = mongoose.model("Seat", seatSchema);
