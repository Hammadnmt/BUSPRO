const jwt = require("jsonwebtoken");

const tokenVerify = (authToken) => {
  const decoded = jwt.verify(authToken, "abc$123%xyz^098");
  if (!decoded.user) {
    throw new Error("Invalid token payload");
  }
  return decoded.user;
};
module.exports = tokenVerify;
