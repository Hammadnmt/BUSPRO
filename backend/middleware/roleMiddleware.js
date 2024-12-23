const asynchandler = require("express-async-handler");

const roleMiddleware = asynchandler(async (req, res, next) => {
  try {
    let role = req.user.role;
    console.log(role)
    if (role != "Admin") {
      throw new Error("Permission Denied");
    } else {
      next();
    }
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
});
module.exports = roleMiddleware;
