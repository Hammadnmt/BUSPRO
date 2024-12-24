const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const authrouter = require("./routes/authRoute");
const triprouter = require("./routes/tripRoute");
const busRouter = require("./routes/busRoute");
const bookingrouter = require("./routes/bookingRoute");
const userrouter = require("./routes/userRoute");
const morgen = require("morgan");
const cookieParser = require("cookie-parser");
const validateJsonBody = require("./middleware/validJson");
const errorHandler = require("./middleware/errorMiddleware");
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
mongoose
  .connect(process.env.DB_HOST)
  .then((result) => {
    console.log(`Db connected`);
  })
  .catch((err) => {
    console.log(err);
  });

app.use(cors(corsOptions));
app.use(express.json());
app.use(validateJsonBody);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgen("dev"));

app.use("/api/auth", authrouter);
app.use("/api/user", userrouter);
app.use("/api/bus", busRouter);
app.use("/api/trip", triprouter);
app.use("/api/booking", bookingrouter);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});
module.exports = app;
