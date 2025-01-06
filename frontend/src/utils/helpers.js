import { format } from "date-fns";

export const extractTime12HourFormat = (isoString) => {
  if (!isoString) return null;
  const formattedTime = format(new Date(isoString), "hh:mm a");
  return formattedTime;
};

// utils/helpers.js

export const convertTimeToTimestamp = (time) => {
  // Get today's date to pair with the time
  const today = new Date();
  const [hours, minutes] = time.split(":");

  // Set the time on today's date
  today.setHours(hours);
  today.setMinutes(minutes);
  today.setSeconds(0); // Ensure seconds are set to 0

  return today.getTime();
};

export const Capitalize = (text) => {
  if (!text) return "";
  return text.toUpperCase();
};
