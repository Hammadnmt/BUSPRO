const Trip = require("../../model/trip/tripModel");
const Route = require("../../model/Route/routeModel");
const getTimePlusMinutes = require("../../utils/getCustomTime");

const getTrips = async (req, res, next) => {
  try {
    const trips = await Trip.find().populate("Route").populate("Bus");
    if (!trips) {
      throw new Error("Trips not found");
    }
    res.json({
      status: "success",
      data: trips,
    });
  } catch (error) {
    next(error);
  }
};

const getTripByRoute = async (req, res, next) => {
  try {
    const { to, from, date } = req.query;
    const routedata = await Route.find({ source: from, destination: to });
    if (routedata.length == 0) {
      return res.status(404).json({
        status: false,
        message: "No Route available for this",
      });
    }
    const routeIds = routedata.map((route) => route._id);
    let tripdata;
    if (date !== new Date().getTime()) {
      tripdata = await Trip.find({
        Route: { $in: routeIds },
        travel_date: { $eq: date },
      })
        .populate("Bus")
        .populate("Route");
    } else {
      tripdata = await Trip.find({
        Route: { $in: routeIds },
        travel_date: { $eq: date },
        departure_time: { $gte: getTimePlusMinutes(30) },
      })
        .populate("Bus")
        .populate("Route");
    }
    res.status(200).json({
      status: true,
      data: tripdata.length > 0 ? tripdata : [],
    });
  } catch (error) {
    next(error);
  }
};

const getTripsBydate = async (req, res, next) => {
  try {
    const { date } = req.params;
    const trips = await Trip.find({
      travle_date: { $gte: new Date(date) },
    })
      .populate("Route")
      .populate("Bus");
    if (!trips) {
      throw new Error("Trips not found");
    }
    res.json({
      status: "success",
      data: trips,
    });
  } catch (error) {
    next(error);
  }
};

const getTrip = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const trip = await Trip.findById(req.params.id)
      .populate("Bus")
      .populate("Route");
    if (!trip) {
      throw new Error("Trip not found");
    }
    console.log(trip);
    res.status(200).json({
      status: true,
      data: trip,
    });
  } catch (error) {
    next(error);
  }
};

const createTrip = async (req, res, next) => {
  try {
    const { arrival_time, departure_time } = req.body;
    if (departure_time >= arrival_time) {
      throw new Error(
        "Departure Time cannot be same or greater than Arrival Time"
      );
    }
    const tripdata = await Trip.create(req.body);
    if (!tripdata) {
      throw new Error("Unable to create Trip");
    }
    console.log(tripdata);
    res.json({
      status: true,
      message: "Trip created Successfully",
    });
  } catch (error) {
    next(error);
  }
};

const deleteTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findByIdAndDelete(req.params.id);
    if (!trip) {
      throw new Error("Trip not found");
    }
    res.status(200).json({
      status: true,
      message: "Trip deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};

const updateTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!trip) {
      throw new Error("Trip not found");
    }
    res.status(200).json({
      status: true,
      data: trip,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getTrips,
  createTrip,
  getTrip,
  deleteTrip,
  updateTrip,
  getTripByRoute,
  getTripsBydate,
};
