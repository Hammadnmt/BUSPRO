const mongoose = require("mongoose");
const moment = require("moment");
function today() {
  const today = moment().utcOffset(5).format("YYYY-MM-DD");
  return today;
}
function toISO(date) {
  const isoDate = moment(date).startOf("day").utc(5).toISOString();
  return isoDate;
}

function customTime(mins) {
  const time = moment().add(mins, "minutes").utcOffset(5).format(); // Saturday at 1:37 PM
  console.log(time);
  return time;
}

function getTime(traveldate, time) {
  const isoTime = moment(traveldate + "T" + time, "YYYY-MM-DDTHH:mm")
    .utcOffset(5)
    .format("YYYY-MM-DDTHH:mm");
  return isoTime;
  // console.log(isoTime);
}
module.exports = {
  today,
  toISO,
  customTime,
  getTime,
};
