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
    process.env.ACCESS_SECRET_TOKEN,
    { expiresIn: "15m" }
  );
  return accessToken;
};
module.exports = genToken;
