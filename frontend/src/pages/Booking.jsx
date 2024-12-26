import ReusableTable from "../components/Table";
import { useNavigate } from "react-router";
import {
  useGetBookingsQuery,
  useDeleteBookingMutation,
} from "../features/booking/bookingSlice";

function Booking() {
  const { data, isLoading, isFetching } = useGetBookingsQuery();
  const [deleteBooking] = useDeleteBookingMutation();
  const navigate = useNavigate();
  const columns = [
    { header: "Name", key: "user_name" },
    { header: "Bus", key: "bus_no" }, // Updated to bus_no based on Bus model
    { header: "Route", key: "route" }, // This can be updated to show source-destination pair
    { header: "Travel Date", key: "travel_date" },
    { header: "Seat Number", key: "seat_no" },
    { header: "Gender", key: "gender" },
    { header: "Status", key: "status" },
  ];


  console.log(data);

  const transformedData = data?.map((entry) => ({
    user_name: entry.user ? entry?.user?.name : "N/A",
    bus_no: entry.trip?.Bus?.bus_no || "N/A", // Accessing bus_no from Bus model
    route: `${entry.trip?.Route?.source || "N/A"} - ${entry.trip?.Route?.destination || "N/A"}`, // Source and destination from Route model
    travel_date: entry.trip?.travel_date,
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
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center ">
      <h1>Bookings</h1>
      <ReusableTable
        data={transformedData || []}
        columns={columns}
        isLoading={isLoading}
        isFetching={isFetching}
        onUpdate={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default Booking;
