/* eslint-disable no-unused-vars */
import ReusableTable from "../components/Table"; // Adjust the import path as needed
import {
  useGetAllroutesQuery,
  useDeleteRouteMutation,
} from "../features/route/routeSlice";
import { useNavigate } from "react-router";
import "../App.css";

function RoutePage() {
  const { data, isLoading, isSuccess, isFetching, isError, error } =
    useGetAllroutesQuery();
  const [deleteRoute] = useDeleteRouteMutation();
  const navigate = useNavigate();

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
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center ">
      <h1>Routes</h1>
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

export default RoutePage;
