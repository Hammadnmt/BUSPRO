const Trip = require("../../model/trip/tripModel");
const Route = require("../../model/Route/routeModel");

const getTrips = async (req, res, next) => {
  try {
    const trips = await Trip.find({ Route: "676bba28662fd56b349503f3" })
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

const getTripByRoute = async (req, res, next) => {
  try {
    const { to, from, date } = req.query;
    const [routedata] = await Route.find({ source: from, destination: to });
    if (routedata.length == 0) {
      throw new Error("No Route Exists for this Origin and Destination");
    }
    // res.json({
    //   routedata,
    // });
    // const id = routedata._id;
    // console.log(routedata);
    const tripdata = await Trip.find({ Route: routedata._id })
      .populate("Bus")
      .populate("Route");
    if (!tripdata) {
      throw new Error("No Trip Exists");
    }
    res.json({
      status: true,
      data: tripdata,
    });
  } catch (error) {
    next(error);
  }
};

const getTripsBydate = async (req, res, next) => {
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
module.exports = {
  getTrips,
  createTrip,
  getTrip,
  deleteTrip,
  updateTrip,
  getTripByRoute,
};
