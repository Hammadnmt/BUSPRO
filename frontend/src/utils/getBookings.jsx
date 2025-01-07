export function getActiveBookings(bookings) {
  const activeBooking = bookings?.filter(
    (booking) => booking?.status != "inactive"
  );
  // console.log(activeBooking);
  return activeBooking;
}

export function getInActiveBookings(bookings) {
  const InActiveBooking = bookings?.filter(
    (booking) => booking?.status == "inactive"
  );
  return InActiveBooking;
}
