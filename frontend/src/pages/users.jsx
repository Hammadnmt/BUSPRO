/* eslint-disable no-unused-vars */
import ReusableTable from "../components/Table"; // Adjust the import path as needed
import {
  useGetAllusersQuery,
  useDeleteUserMutation,
} from "../features/user/userSlice";
import { useNavigate } from "react-router";
import "../App.css";

function Products() {
  const { data, isLoading, isSuccess, isFetching, isError, error } =
    useGetAllusersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const navigate = useNavigate();

  const columns = [
    { header: "Name", key: "name" },
    { header: "Email", key: "email" },
    { header: "Phone", key: "phone_number" },
    { header: "Role", key: "role" },
  ];

  const handleEdit = (id) => {
    navigate(`/admin/user/${id}`);
  };

  const handleDelete = async (id) => {
    await deleteUser(id).unwrap();
  };

  return (
    <div className="container-fluid d-flex flex-column justify-content-center align-items-center ">
      <h1>Users</h1>
      <ReusableTable
        data={data || []}
        columns={columns}
        isLoading={isLoading}
        isFetching={isFetching}
        onUpdate={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}

export default Products;
