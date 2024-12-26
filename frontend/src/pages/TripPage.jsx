import ReusableTable from "../components/Table";
import { useNavigate } from "react-router";
import {
  useGetTripsQuery,
  useDeleteTripMutation,
} from "../features/trip/tripSlice";

function Booking() {
  const { data, isLoading, isFetching } = useGetTripsQuery();
  const [deleteBooking] = useDeleteTripMutation();
  const navigate = useNavigate();
  const columns = [
    { header: "Bus number", key: "bus_no" },
    { header: "Source", key: "source" },
    { header: "Destination", key: "destination" },
    { header: "Departure", key: "departure_time" },
    { header: "Arrival", key: "arrival_time" },
    { header: "Status", key: "status" },
  ];

  //   console.log(data);

  const transformedData = data?.map((entry) => ({
    bus_no: entry.Bus?.bus_no || "N/A", // Accessing bus_no from Bus model
    source: entry.Route?.source || "N/A",
    destination: entry.Route?.destination || "N/A",
    travel_date: entry.travel_date || "N/A",
    departure_time: entry.departure_time || "N/A",
    arrival_time: entry.arrival_time || "N/A",
    status: entry.status || "N/A", // Status from Trip model
  }));
  // console.log(transformedData);
  const handleAdd = () => {
    navigate("/admin/trip/create");
  };
  const handleEdit = (id) => {
    navigate(`/admin/booking/${id}`);
  };

  const handleDelete = async (id) => {
    await deleteBooking(id).unwrap();
  };
  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center ">
      <h1>Trips</h1>
      <ReusableTable
        data={transformedData || []}
        columns={columns}
        isLoading={isLoading}
        isFetching={isFetching}
        onCreate={handleAdd}
        onUpdate={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default Booking;
