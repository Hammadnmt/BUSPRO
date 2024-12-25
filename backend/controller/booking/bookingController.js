const User = require("../../model/user/userModel");
const Trip = require("../../model/trip/tripModel");
const Booking = require("../../model/booking/bookingModell");

// Create a new booking
const createBooking = async (req, res, next) => {
  try {
    const { user, trip, travel_date, booked_seats } = req.body;
    const userdata = await User.findById(user);
    if (!userdata) {
      throw new Error("User not found");
    }
    const tripdata = await Trip.findById(trip);
    if (!tripdata) {
      throw new Error("Trip not found");
    }
    const booking = await Booking.create({
      user,
      trip,
      travel_date,
      booked_seats,
    });
    if (!booking) {
      throw new Error("Booking failed");
    }
    res.status(201).json({
      status: "success",
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

//get booking
const getBookings = async (req, res, next) => {
  try {
    const booking = await Booking.find()
      .populate("user")
      .populate({
        path: "trip",
        populate: [
          { path: "Bus", model: "Bus" },
          { path: "Route", model: "Route" },
        ],
      });
    res.status(200).json({
      status: "success",
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

const deleteBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndDelete({ user: req.params.id });
    if (!booking) {
      throw new Error("Booking not found");
    }
    res.status(200).json({
      status: "success",
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

const updateBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id);
    if (!booking) {
      throw new Error("Booking not found");
    }
    res.status(200).json({
      status: "success",
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

const getBookingByUserId = async (req, res, next) => {
  try {
    const booking = await Booking.find({ user: req.params.id }).populate("user").populate("trip");
    if (!booking) {
      throw new Error("Booking not found for this user");
    }
    res.status(200).json({
      status: "success",
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};

const getBookingByTripId = async (req, res, next) => {
  try {
    const booking = await Booking.find({ trip: req.params.id }).populate("user").populate("trip");
    if (!booking) {
      throw new Error("Booking not found for this trip");
    }
    res.status(200).json({
      status: "success",
      data: booking,
    });
  } catch (error) {
    next(error);
  }
};



module.exports = {
  createBooking,
  getBookings,
  getBookingByUserId,
  getBookingByTripId,
  updateBooking,
  deleteBooking,
};
