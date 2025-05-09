const jwt = require("jsonwebtoken");

const genToken = ({ uId, email, role }) => {
  const accessToken = jwt.sign(
    {
      user: {
        uid: uId,
        email: email,
        role: role,
      },
    },
    process.env.JWT_SCRT,
    { expiresIn: "2d" }
  );
  return accessToken;
};
module.exports = genToken;
