/* eslint-disable no-unused-vars */
import ReusableTable from "../components/Table"; // Adjust the import path as needed
import {
  useGetPaginatedRoutesQuery,
  useDeleteRouteMutation,
} from "../features/route/routeSlice";
import { useNavigate } from "react-router";
import "../App.css";
import Pagination from "../components/pagination";
import { useState } from "react";

function RoutePage() {
  const [Page, setPage] = useState(1);
  const navigate = useNavigate();
  const { data, isLoading, isSuccess, isFetching, isError, error } =
    useGetPaginatedRoutesQuery({
      page: Page,
      limit: 10,
    });
  const [deleteRoute] = useDeleteRouteMutation();
  if (isLoading) {
    return <p>Loading</p>;
  }
  const { routes, totalPages } = data;
  const columns = [
    { header: "Source", key: "source" },
    { header: "Destination", key: "destination" },
    { header: "Distance: Km", key: "distance" },
    { header: "Duration", key: "duration" },
    { header: "Fare: Rs", key: "fare" },
  ];

  const handleAdd = () => {
    navigate("/admin/route/create");
  };

  const handleEdit = (id) => {
    navigate(`/admin/route/${id}`);
  };

  const handleDelete = async (id) => {
    await deleteRoute(id).unwrap();
  };

  return (
    <div className="container-fluid bg-light d-flex flex-column justify-content-center align-items-center ">
      <h1>Routes</h1>
      <ReusableTable
        data={routes || []}
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

export default RoutePage;
