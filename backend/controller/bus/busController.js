const Bus = require("../../model/bus/BusModel");

const createBus = async (req, res, next) => {
  try {
    const { busNumber, source, destination, departure_time } = req.body;
    console.log(req.body);
    const alreadyExists = await Bus.findOne({
      bus_no: busNumber,
      source: source,
      destination: destination,
      departure_time: departure_time,
    });
    if (alreadyExists) {
      throw new Error("Bus Already Exists");
    }
    await Bus.create({
      bus_no: busNumber,
      source: source,
      destination: destination,
      departure_time: departure_time,
    });
    res.json({
      message: "Bus Created Successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBus,
};
