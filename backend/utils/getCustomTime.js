const getTimePlusMinutes = (minutes) => {
  const currentTime = new Date();
  currentTime.setMinutes(currentTime.getMinutes() + minutes);
  return currentTime;
};

module.exports = getTimePlusMinutes;
