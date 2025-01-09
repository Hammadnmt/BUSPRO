import ReusableTable from "../components/Table";
import { useNavigate } from "react-router";
import {
  useGetPaginatedTripsQuery,
  useDeleteTripMutation,
} from "../features/trip/tripSlice";
import { extractTime12HourFormat } from "../utils/helpers";
import { useState } from "react";
import Pagination from "../components/pagination";

function TripPage() {
  const [Page, setPage] = useState(1);
  const navigate = useNavigate();
  const { data, isLoading, isFetching } = useGetPaginatedTripsQuery({
    page: Page,
    limit: 10,
  });
  const [deleteTrip] = useDeleteTripMutation();
  if (isLoading) {
    return <p>Loading</p>;
  }
  const { trips, totalPages } = data;

  const columns = [
    { header: "Bus number", key: "bus_no" },
    { header: "Source", key: "source" },
    { header: "Destination", key: "destination" },
    { header: "Departure", key: "departure_time" },
    { header: "Arrival", key: "arrival_time" },
    { header: "Date", key: "travel_date" },
    { header: "Status", key: "status" },
  ];

  const transformedData = trips?.map((entry) => ({
    _id: entry._id,
    ID: entry._id,
    bus_no: entry.Bus?.bus_no || "N/A",
    source: entry.Route?.source || "N/A",
    destination: entry.Route?.destination || "N/A",
    travel_date: entry.travel_date.split("T")[0] || "N/A",
    departure_time: extractTime12HourFormat(entry.departure_time) || "N/A",
    arrival_time: extractTime12HourFormat(entry.arrival_time) || "N/A",
    status: entry.status || "N/A",
  }));
  const handleAdd = () => {
    navigate("/admin/trip/create");
  };
  const handleEdit = (id) => {
    navigate(`/admin/trip/${id}`);
  };

  const handleDelete = async (id) => {
    await deleteTrip(id).unwrap();
  };
  return (
    <div className="container-fluid bg-light d-flex flex-column justify-content-center align-items-center ">
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
      <Pagination
        currentPage={Page}
        totalPages={totalPages}
        onPageChange={(newPage) => setPage(newPage)}
      />
    </div>
  );
}

export default TripPage;
