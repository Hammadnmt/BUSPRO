const mongoose = require("mongoose");

const RouteSchema = new mongoose.Schema(
  {
    source: {
      type: String,
      required: [true, "Source location is required"],
    },
    destination: {
      type: String,
      required: [true, "Destination location is required"],
    },
    distance: {
      type: Number,
      required: [true, "Distance is required"],
    },
    duration: {
      type: Number,
      required: [true, "Duration is required"],
    },
    fare: {
      type: Number,
      required: [true, "Fare is required"],
    },
  },
  {
    timestamps: true,
  }
);

const Route = mongoose.models.Route || mongoose.model("Route", RouteSchema);
module.exports = Route;
