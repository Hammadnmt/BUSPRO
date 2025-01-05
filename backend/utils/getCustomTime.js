const moment = require("moment");

const getLocalTimePlusMinutes = (minutes) => {
  // Get the current time in Pakistan timezone
  const currentTime = moment.tz("Asia/Karachi");
  // Add the specified number of minutes
  const updatedTime = currentTime.add(minutes, "minutes");
  // Return the time in ISO string format
  return updatedTime.toISOString();
};
module.exports = getLocalTimePlusMinutes;
