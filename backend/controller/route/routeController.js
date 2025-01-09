const Route = require("../../model/route/routeModel");

//get all Routes
const getAllRoutes = async (req, res, next) => {
  try {
    const routeData = await Route.find();
    if (routeData.length == 0) {
      res.status(200).json({
        status: true,
        data: [],
      });
      throw new Error("No Route Found");
    } else {
      res.status(201).json({
        status: true,
        data: routeData,
      });
    }
  } catch (error) {
    next(error);
  }
};

const getPaginatedRoutes = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1
  const limit = parseInt(req.query.limit) || 10; // Default to 10 items per pag
  const skip = (page - 1) * limit;
  try {
    const routes = await Route.find().skip(skip).limit(limit);
    const totalRoutes = await Route.countDocuments();
    const totalPages = Math.ceil(totalRoutes / limit);

    if (routes.length == 0) {
      res.status(200).json({
        status: true,
        data: [],
      });
      throw new Error("No Route Found");
    } else {
      res.status(201).json({
        status: true,
        data: { routes, totalPages },
      });
    }
  } catch (error) {
    next(error);
  }
};

//get Route
const getOneRoute = async (req, res, next) => {
  try {
    const routeData = await Route.findById(req.params.id);
    if (routeData == null) {
      throw new Error("No Route Found");
    } else {
      res.status(200).json({
        status: true,
        data: routeData,
      });
    }
  } catch (err) {
    next(err);
  }
};

const createRoute = async (req, res, next) => {
  try {
    const routedata = await Route.create(req.body);
    if (!routedata) {
      throw new Error("Unable to create route");
    }
    res.status(200).json({
      status: true,
      message: "Route created Successfully.",
    });
  } catch (error) {
    next(error);
  }
};
//update Routes
const updateRoute = async (req, res, next) => {
  try {
    const id = req.params.id;
    const routeData = await Route.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (routeData == null) {
      throw new Error("No Route Found");
    } else {
      res.status(200).json({
        status: true,
        message: "Route Updated Successfully",
      });
    }
  } catch (err) {
    next(err);
  }
};

//delete Route
const deleteRoute = async (req, res, next) => {
  try {
    const routeData = await Route.findByIdAndDelete(req.params.id);
    if (routeData == null) {
      throw new Error("No Route Found");
    } else {
      res.status(200).json({
        status: true,
        message: "Route deleted Successfully",
      });
    }
  } catch (err) {
    next(err);
  }
};

// exports
module.exports = {
  getAllRoutes,
  createRoute,
  getOneRoute,
  updateRoute,
  deleteRoute,
  getPaginatedRoutes,
};
