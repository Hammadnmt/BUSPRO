export function getActiveBookings(bookings = []) {
  if (bookings) {
    const activeBooking = bookings?.filter(
      (booking) => booking?.status != "inactive"
    );
    return activeBooking;
  }
  return [];
  // console.log(activeBooking);
}

export function getInActiveBookings(bookings = []) {
  if (bookings) {
    const InActiveBooking = bookings?.filter(
      (booking) => booking?.status == "inactive"
    );
    return InActiveBooking;
  }
  return [];
}
