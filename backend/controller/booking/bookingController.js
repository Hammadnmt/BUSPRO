const User = require("../../model/user/userModel");
const Trip = require("../../model/trip/tripModel");
const Booking = require("../../model/booking/bookingModell");
const Payment = require("../../model/payment/paymentModel");

const createBooking = async (req, res, next) => {
  try {
    console.log(req.body);
    const { user, trip, travel_date, booked_seats, amount, payment_method } =
      req.body;
    const userdata = await User.findById(user);
    if (!userdata) return res.status(404).json({ error: "User not found" });

    const tripdata = await Trip.findById(trip);
    if (!tripdata) return res.status(404).json({ error: "Trip not found" });

    // Check for already booked seats
    const existingBookings = await Booking.find({
      trip,
      travel_date,
      "booked_seats.seat_no": { $in: booked_seats.seat_no },
    });

    if (existingBookings.length) {
      const alreadyBookedSeats = existingBookings
        .flatMap((b) => b.booked_seats.seat_no)
        .filter((seat) => booked_seats.seat_no.includes(seat));

      return res.status(400).json({
        error: `Seats already booked: ${alreadyBookedSeats.join(", ")}`,
      });
    }

    // Create booking
    const booking = await Booking.create({
      user,
      trip,
      travel_date,
      booked_seats,
    });
    if (!booking) {
      throw new Error("Booking failed");
    } else {
      const payment = await Payment.create({
        booking: booking._id,
        amount,
        payment_method,
      });
      if (!payment) {
        throw new Error("Booking failed");
      } else {
        res.status(201).json({
          status: true,
          message: "Booking created successfully",
        });
      }
    }
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
    const booking = await Booking.find({ user: req.params.id })
      .populate("user")
      .populate("trip");
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
    const booking = await Booking.find({ trip: req.params.id })
      .populate("user")
      .populate({
        path: "trip",
        populate: [
          { path: "Bus", model: "Bus" },
          { path: "Route", model: "Route" },
        ],
      });
    if (booking.length == 0) {
      res.status(200).json({
        status: true,
        data: [],
      });
    } else {
      res.status(200).json({
        status: true,
        data: booking,
      });
    }
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
