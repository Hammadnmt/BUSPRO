/* eslint-disable no-unused-vars */
import ReusableTable from "../components/Table"; // Adjust the import path as needed
import {
  useGetBusesQuery,
  useDeleteBusMutation,
} from "../features/bus/busSlice";
import { useNavigate } from "react-router";
import "../App.css";

function BusPage() {
  const { data, isLoading, isSuccess, isFetching, isError, error } =
    useGetBusesQuery();
  const [deleteBus] = useDeleteBusMutation();
  const navigate = useNavigate();

  const columns = [
    { header: "Bus number", key: "bus_no" },
    { header: "Total Seats", key: "total_seats" },
  ];
  const handleAdd = () => {
    navigate("/admin/bus/create");
  };
  const handleEdit = (id) => {
    navigate(`/admin/bus/${id}`);
  };

  const handleDelete = async (id) => {
    await deleteBus(id).unwrap();
  };

  return (
    <div className="container-fluid bg-light d-flex flex-column justify-content-center align-items-center ">
      <h1>Buses</h1>
      <ReusableTable
        data={data || []}
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

export default BusPage;
