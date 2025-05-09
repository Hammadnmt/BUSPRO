const tokenVerify = require("../utils/vrfyToken");
const admin = require("../firebaseAdmin");
const validateToken = async (req, res, next) => {
  try {
    // Retrieve the authentication token from cookies
    let authToken = req.cookies?.authToken; // Corrected the header name
    const tokenId = req.header.authorization.split("Bearer ")[1];
    admin
      .auth()
      .verifyIdToken(tokenId)
      .then((decodedToken) => {})
      .catch((error) => {
        res.status(401).json({
          message: error.message,
        });
      });
    console.log("req in auth middleware", decodedToken);
    if (!authToken) {
      throw new Error("User not authorized or Token Expired");
    } else {
      // Verifying the user
      req.user = tokenVerify(authToken);

      next();
    }
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};

module.exports = validateToken;
