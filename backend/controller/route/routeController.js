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
    getOneRoute,
    updateRoute,
    deleteRoute,
};
