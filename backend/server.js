const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT || 3000;
const db = require("./config/connection");
const authRouter = require("./routes/authRoute");
const tripRouter = require("./routes/tripRoute");
const busRouter = require("./routes/busRoute");
const bookingRouter = require("./routes/bookingRoute");
const userRouter = require("./routes/userRoute");
const routeRouter = require("./routes/routeRoute");
const promoRouter = require("./routes/promoRoute");
const morgen = require("morgan");
const cookieParser = require("cookie-parser");
const validateJsonBody = require("./middleware/validJson");
const errorHandler = require("./middleware/errorMiddleware");
const cors = require("cors");

const corsOptions = {
  origin: "https://buspro-bgjy.vercel.app/",
  credentials: true,
};
db();
app.use(cors(corsOptions));
app.use(express.json());
app.use(validateJsonBody);
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgen("dev"));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/route", routeRouter);
app.use("/api/bus", busRouter);
app.use("/api/trip", tripRouter);
app.use("/api/promo", promoRouter);
app.use("/api/booking", bookingRouter);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server on http://localhost:${PORT}`);
});
module.exports = app;
