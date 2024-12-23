const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    bus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bus",
    },
    // travel_time: {
    //   type: Date,
    //   required: [true, "Travel time is required"],
    // },
    gender: {
      type: String,
      required: [true, "Gender is required"],
    },
    seat_no: {
      type: Number,
      required: [true, "Seat number is required"],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["Active", "Past", "Pending"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", BookingSchema);
module.exports = Booking;
