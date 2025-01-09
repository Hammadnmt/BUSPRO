/* eslint-disable no-unused-vars */
import ReusableTable from "../components/Table"; // Adjust the import path as needed
import {
  useGetPaginatedBusesQuery,
  useDeleteBusMutation,
} from "../features/bus/busSlice";
import { useNavigate } from "react-router";
import "../App.css";
import { useState } from "react";
import Pagination from "../components/pagination";

function BusPage() {
  const [Page, setPage] = useState(1);
  const navigate = useNavigate();
  const { data, isLoading, isSuccess, isFetching, isError, error } =
    useGetPaginatedBusesQuery({ page: Page, limit: 10 });
  const [deleteBus] = useDeleteBusMutation();
  
  if (isLoading) {
    return <p>Loading</p>;
  }
  const { buses, totalPages } = data;

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
        data={buses || []}
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

export default BusPage;
