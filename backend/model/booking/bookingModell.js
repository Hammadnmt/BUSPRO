const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },
    trip: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Trip",
      required: [true, "Trip reference is required"],
    },
    travel_date: {
      type: Date,
      required: [true, "Travel date is required"],
      validate: {
        validator: function (value) {
          return value >= new Date();
        },
        message: "Travel date must be today or a future date",
      },
    },
    booked_seats: [
      {
        seat_no: {
          type: Number,
          required: [true, "Seat number is required"],
        },
        gender: {
          type: String,
          lowercase: true,
          enum: ["male", "female", "other"],
          required: [true, "Gender is required"],
        },
      },
    ],
    status: {
      type: String,
      lowercase: true,
      enum: ["paid", "unpaid"],
      default: "unpaid",
    },
  },
  {
    timestamps: true,
  }
);

const Booking = mongoose.model("Booking", BookingSchema);
module.exports = Booking;
