/* eslint-disable no-unused-vars */
import ReusableTable from "../components/Table"; // Adjust the import path as needed
import {
  useGetPaginatedUsersQuery,
  useDeleteUserMutation,
} from "../features/user/userSlice";
import { useNavigate } from "react-router";
import "../App.css";
import { useState } from "react";
import Pagination from "../components/pagination";

function Users() {
  const [Page, setPage] = useState(1);
  const navigate = useNavigate();
  const { data, isLoading, isFetching } = useGetPaginatedUsersQuery({
    page: Page,
    limit: 10,
  });
  const [deleteUser] = useDeleteUserMutation();

  if (isLoading) {
    return <p>Loading</p>;
  }
  const { users, totalPages } = data;

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
    <div className="container-fluid bg-light d-flex flex-column justify-content-center align-items-center ">
      <h1>Users</h1>
      <ReusableTable
        data={users || []}
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

export default Users;
