const mongoose = require("mongoose");
const nodecron = require("node-cron");
const Booking = require("../model/booking/bookingModell");
const { toISO, today, customTime } = require("../utils/dateTimeHelpers");

function db() {
  mongoose
    .connect(process.env.DB_CLOUD)
    .then((result) => {
      console.log(`Db connected`);
      const task = nodecron.schedule(
        "*/1 * * * *", // Runs every minute for testing
        async () => {
          console.log("Running Cron at:", new Date().toLocaleString("en-US", { timeZone: "Asia/Karachi" }));

          try {
            // Update bookings where travel_date has passed or is today
            const result = await Booking.updateMany(
              {
                travel_date: { $lte: toISO(today()) },
                "trip.departure_time": { $lt: customTime(30) },
                status: { $eq: "active" },
              },
              { $set: { status: "inactive" } }
            );

            console.log(`Cron Success: Updated ${result.modifiedCount} bookings.`);
          } catch (error) {
            console.error("Error while executing cron job:", error);
          }
        },
        {
          timezone: "Asia/Karachi", // Set correct timezone
        }
      );

      // Start the cron job
      task.start();
      console.log("Cron Task Scheduled and Running...");
    })
    .catch((err) => {
      console.log(err);
    });
}
module.exports = db;
