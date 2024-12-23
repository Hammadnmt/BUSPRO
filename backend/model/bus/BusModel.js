const mongoose = require("mongoose");

const BusSchema = new mongoose.Schema(
  {
    bus_no: {
      type: String,
      required: [true, "Bus number is required"],
      unique: true,
    },
    source: {
      type: String,
      required: [true, "Source location is required"],
    },
    destination: {
      type: String,
      required: [true, "Destination location is required"],
    },
    departure_time: {
      type: Date,
      required: [true, "Departure time is required"],
    },
    total_seats: {
      type: Number,
      required: [true, "Total seats is required"],
      default: 20,
    },
    booked_seats: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

BusSchema.virtual("availableSeats").get(function () {
  return this.total_seats - this.booked_seats;
});
BusSchema.pre("save", async function (next) {
  if (this.booked_seats > this.total_seats) {
    return next(new Error("Booked seats cannot be greater than total seats"));
  }
  next();
});
/// Check if the new Bus has same source, destination and departure time, if yes then throw an error. Tomoroow
const Bus = mongoose.model("Bus", BusSchema);
module.exports = Bus;
