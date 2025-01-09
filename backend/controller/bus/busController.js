const Bus = require("../../model/bus/BusModel");

const createBus = async (req, res, next) => {
  try {
    const { busNumber, total_seats } = req.body;
    const busdata = await Bus.create({
      bus_no: busNumber,
      total_seats,
    });
    if (!busdata) {
      throw new Error("Bus Not Created");
    }
    res.json({
      message: "Bus Created Successfully",
    });
  } catch (error) {
    next(error);
  }
};

const getBuses = async (req, res, next) => {
  try {
    const buses = await Bus.find();
    if (!buses) {
      throw new Error("No Bus Found");
    }
    res.json({
      status: true,
      data: buses,
    });
  } catch (error) {
    next(error);
  }
};

const getPaginatedBuses = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = parseInt(req.query.limit) || 10; // Default to 10 items per pag
  const skip = (page - 1) * limit;
  try {
    const buses = await Bus.find().skip(skip).limit(limit);
    const totalBuses = await Bus.countDocuments();
    const totalPages = Math.ceil(totalBuses / limit);
    if (!buses) {
      throw new Error("No Bus Found");
    }
    res.json({
      status: true,
      data: { buses, totalPages },
    });
  } catch (error) {
    next(error);
  }
};

const updateBus = async (req, res, next) => {
  try {
    const { busNumber, total_seats } = req.body;
    const updatedBus = await Bus.findByIdAndUpdate(
      req.params.id,
      { busNumber, total_seats },
      {
        new: true,
      }
    );
    if (!updatedBus) {
      throw new Error("No Bus Found");
    }
    res.json({
      status: true,
      HttpStatusCode: 200,
      data: updatedBus,
    });
  } catch (error) {
    next(error);
  }
};

const getBus = async (req, res, next) => {
  try {
    const bus = await Bus.findById(req.params.id);
    if (!bus) {
      throw new Error("No Bus Found");
    }
    res.json({
      status: true,
      data: bus,
    });
  } catch (error) {
    next(error);
  }
};

const deleteBus = async (req, res, next) => {
  try {
    const { departure_time } = req.body;
    const deletedBus = await Bus.findOneAndDelete({ departure_time });
    if (!deletedBus) {
      throw new Error("No Bus Found");
    }
    res.json({
      status: 200,
      status: true,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBus,
  getBus,
  updateBus,
  deleteBus,
  getBuses,
  getPaginatedBuses,
};
