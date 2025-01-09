import ReusableTable from "../components/Table";
import { useNavigate } from "react-router";
import {
  useGetPaginatedBookingsQuery,
  useDeleteBookingMutation,
} from "../features/booking/bookingSlice";
import { useEffect, useState } from "react";
import Pagination from "../components/pagination";

function Booking() {
  const [Page, setPage] = useState(1);
  const navigate = useNavigate();

  const { data, isLoading, isFetching } = useGetPaginatedBookingsQuery({
    page: Page,
    limit: 10,
  });
  const [deleteBooking] = useDeleteBookingMutation();

  if (isLoading) {
    return <p>Loading</p>;
  }
  const { booking, totalPages } = data;
  const columns = [
    { header: "Name", key: "user_name" },
    { header: "Bus", key: "bus_no" },
    { header: "Route", key: "route" },
    { header: "Travel Date", key: "travel_date" },
    { header: "Seat Number", key: "seat_no" },
    { header: "Gender", key: "gender" },
    { header: "Status", key: "status" },
  ];

  const transformedData = booking?.map((entry) => ({
    _id: entry._id,
    user_name: entry.user ? entry?.user?.name : "N/A",
    bus_no: entry.trip?.Bus?.bus_no || "N/A", // Accessing bus_no from Bus model
    route: `${entry.trip?.Route?.source || "N/A"} - ${
      entry.trip?.Route?.destination || "N/A"
    }`, // Source and destination from Route model
    travel_date: entry.trip?.travel_date.split("T")[0],
    seat_no: entry.booked_seats[0]?.seat_no || "N/A",
    gender: entry.booked_seats[0]?.gender || "N/A",
    status: entry.trip?.status || "N/A", // Status from Trip model
  }));
  // console.log(transformedData);
  const handleEdit = (id) => {
    navigate(`/admin/booking/${id}`);
  };

  const handleDelete = async (id) => {
    await deleteBooking(id).unwrap();
  };
  return (
    <div className="container-fluid bg-light d-flex flex-column justify-content-center align-items-center ">
      <h1>Bookings</h1>
      <ReusableTable
        data={transformedData || []}
        columns={columns}
        isLoading={isLoading}
        isFetching={isFetching}
        onUpdate={handleEdit}
        onDelete={handleDelete}
      />
      <Pagination
        currentPage={Page}
        totalPages={totalPages}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
}

export default Booking;
