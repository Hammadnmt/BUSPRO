const asynchandler = require("express-async-handler");
const tokenVerify = require("../utils/vrfyToken");

const validateToken = (req, res, next) => {
  try {
    // Retrieve the authentication token from cookies
    let authToken = req.cookies?.authToken; // Corrected the header name
    console.log("req in auth middleware");

    if (!authToken) {
      throw new Error("User not authorized or Token Expired");
    } else {
      // Verifying the user
      req.user = tokenVerify(authToken);
      next();
    }
  } catch (error) {
    // respoding with unauthorzed
    res.status(401).json({
      message: error.message,
    });
  }
};

module.exports = validateToken;
