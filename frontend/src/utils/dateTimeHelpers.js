import moment from "moment";

export function today() {
  const today = moment().utcOffset(5).format("YYYY-MM-DD");
  return today;
}
export function toISO(date) {
  const isoDate = moment(date).startOf("day").utc(5).toISOString();
  return isoDate;
}

export function customTime(mins) {
  const time = moment().add(mins, "minutes").utcOffset(5).format(); // Saturday at 1:37 PM
  console.log(time);
  return time;
}

export function getTime(traveldate, time) {
  const isoTime = moment(traveldate + "T" + time, "YYYY-MM-DDTHH:mm")
    .utcOffset(5)
    .format("YYYY-MM-DDTHH:mm");
  return isoTime;
}
