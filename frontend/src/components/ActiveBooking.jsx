import React from "react";
import { useGetBookingByUserIdQuery } from "../features/booking/bookingSlice";
import { getUser } from "../utils/getUser.js";
import { getActiveBookings } from "../utils/getBookings.jsx";
import Booking from "./Booking.jsx";

export default function ActiveBooking() {
  const { data, isLoading } = useGetBookingByUserIdQuery(getUser());
  if (isLoading) {
    return <p>Loading...</p>;
  }
  const bookingData = getActiveBookings(data);
  return (
    <>
      {bookingData?.map((booking) => (
        <Booking key={booking._id} data={booking} isActive={true} />
      ))}
    </>
  );
}
