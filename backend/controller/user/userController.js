const User = require("../../model/user/userModel");

//get all users
const getAllUsers = async (req, res, next) => {
  try {
    const userdata = await User.find();
    if (userdata.length == 0) {
      res.status(200).json({
        status: true,
        data: [],
      });
      throw new Error("No User Found");
    } else {
      res.status(201).json({
        status: true,
        data: userdata,
      });
    }
  } catch (error) {
    next(error);
  }
};

const getPaginatedUsers = async (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  try {
    const users = await User.find().skip(skip).limit(limit);
    const totalUsers = await User.countDocuments();
    const totalPages = Math.ceil(totalUsers / limit);
    if (users.length == 0) {
      res.status(200).json({
        status: true,
        data: [],
      });
      throw new Error("No User Found");
    } else {
      res.status(201).json({
        status: true,
        data: { users, totalPages },
      });
    }
  } catch (error) {
    next(error);
  }
};

//get user
const getOneUser = async (req, res, next) => {
  try {
    const userdata = await User.findById(req.params.id);
    if (userdata == null) {
      throw new Error("No User Found");
    } else {
      res.status(200).json({
        status: true,
        data: userdata,
      });
    }
  } catch (err) {
    next(err);
  }
};

//update users
const updateUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const userdata = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (userdata == null) {
      throw new Error("No User Found");
    } else {
      res.status(200).json({
        status: true,
        message: "User Updated Successfully",
      });
    }
  } catch (err) {
    next(err);
  }
};

//delete user
const deleteUser = async (req, res, next) => {
  try {
    const userdata = await User.findByIdAndDelete(req.params.id);
    if (userdata == null) {
      throw new Error("No User Found");
    } else {
      res.status(200).json({
        status: true,
        message: "User deleted Successfully",
      });
    }
  } catch (err) {
    next(err);
  }
};

// exports
module.exports = {
  getAllUsers,
  getOneUser,
  deleteUser,
  updateUser,
  getPaginatedUsers,
};
