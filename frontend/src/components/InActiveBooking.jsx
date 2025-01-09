// import React from "react";
import { useGetBookingByUserIdQuery } from "../features/booking/bookingSlice";
// import { extractTime12HourFormat } from "../utils/helpers.js";
import { getUser } from "../utils/getUser.js";
import { getInActiveBookings } from "../utils/getBookings.jsx";
import Booking from "./Booking.jsx";

export default function InActiveBooking() {
  const { data, isLoading } = useGetBookingByUserIdQuery(getUser());
  if (isLoading) {
    return <p>Loading...</p>;
  }
  const bookingData = getInActiveBookings(data);

  return (
    <>
      <div className="mx-auto">
        {bookingData?.map((booking) => (
          <Booking key={booking._id} data={booking} />
        ))}
      </div>
    </>
  );
}
