const jwt = require("jsonwebtoken");

const genToken = (data) => {
  const accessToken = jwt.sign(
    {
      user: {
        id: data.id,
        email: data.email,
        role: data.role,
      },
    },
    process.env.JWT_SECRET,
    { expiresIn: "15m" }
  );
  return accessToken;
};
module.exports = genToken;
