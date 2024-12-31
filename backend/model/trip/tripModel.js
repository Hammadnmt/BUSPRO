const mongoose = require("mongoose");

const TripSchema = new mongoose.Schema(
  {
    Bus: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bus",
      required: [true, "Bus reference is required"],
    },
    Route: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Route",
      required: [true, "Route reference is required"],
    },
    travel_date: {
      type: Date,
      required: [true, "Travel date is required"],
      validate: {
        validator: function (value) {
          return value >= new Date(value);
        },
        message: "Travel date must be today or a future date",
      },
    },
    description: {
      type: String,
      required: [true, "Description"],
      trim: true,
    },
    departure_time: {
      type: Date,
      required: [true, "Departure time is required"],
      unique: true,
    },
    arrival_time: {
      type: Date,
      required: [true, "Arrival time is required"],
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Inactive",
    },
  },
  {
    timestamps: true,
  }
);
const Trip = mongoose.model("Trip", TripSchema);
module.exports = Trip;
