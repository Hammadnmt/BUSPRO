const Trip = require("../../model/trip/tripModel");
const Route = require("../../model/Route/routeModel");

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

// const getTripByRoute = async (req, res, next) => {
//   try {
//     const { to, from, date } = req.body;
//     if (!date || isNaN(new Date(date))) {
//       throw new Error("Invalid date format");
//     }

//     const routedata = await Route.findOne({ source: from, destination: to });
//     if (routedata.length == 0) {
//       throw new Error("No Route Exists for this Origin and Destination");
//     }
//     const tripdata = await Trip.find({
//       Route: routedata._id,
//       travle_date: { $gte: new Date(date) },

//     })
//       .populate("Bus")
//       .populate("Route");
//     if (tripdata.length == 0) {
//       throw new Error("No Trip Exists");
//     }
//     console.log(tripdata);
//     res.json({
//       status: true,
//       data: tripdata,
//     });
//   } catch (error) {
//     next(error);
//   }
// };
const getTripByRoute = async (req, res, next) => {
  try {
    const { to, from, date } = req.query;
    const routedata = await Route.find({ source: from, destination: to });
    const routeIds = routedata.map((route) => route._id);
    const tripdata = await Trip.find({
      Route: { $in: routeIds },
      travel_date: { $gte: date },
      // status: "active",
    })
      .populate("Bus")
      .populate("Route");

    console.log(tripdata);
    // If no trips are found, throw an error
    if (!tripdata || tripdata.length === 0) {
      throw new Error("No trips exist for the given route and date.");
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
    const trip = await Trip.findById(req.params.id)
      .populate("Bus")
      .populate("Route");
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

const createTrip = async (req, res, next) => {
  try {
    const tripdata = await Trip.create(req.body);
    if (!tripdata) {
      throw new Error("Unable to create Trip");
    }
    res.status(200).json({
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
