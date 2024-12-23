const jwt = require("jsonwebtoken");

const tokenVerify = (authToken) => {
  const decoded = jwt.verify(authToken, process.env.ACCESS_SECRET_TOKEN);
  if (!decoded.user) {
    throw new Error("Invalid token payload");
  }
  return decoded.user;
};
module.exports = tokenVerify;
