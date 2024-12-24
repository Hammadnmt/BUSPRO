const Trip = require("../../model/trip/tripModel");

const getTrips = async (req, res, next) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (error) {
    next(error);
  }
};

const getTrip = async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id);
    if (!trip) {
      throw new Error("Trip not found");
    }
    res.status(200).json({
      status: "success",
      data: trip,
    });
  } catch (error) {
    next(error);
  }
};

const createTrip = async (req, res) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (error) {
    next(error);
  }
};

const deleteTrip = async (req, res) => {
  try {
    const trip = await Trip.findByIdAndDelete(req.params.id);
    if (!trip) {
      throw new Error("Trip not found");
    }
    res.status(200).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    next(error);
  }
};
const updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findByIdAndUpdate(req.params.id);
    if (!trip) {
      throw new Error("Trip not found");
    }
    res.status(200).json({
      status: "success",
      data: trip,
    });
  } catch (error) {
    next(error);
  }
};
module.exports = { getTrips, createTrip, getTrip, deleteTrip, updateTrip };
