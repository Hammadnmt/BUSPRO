import { Navigate, Outlet } from "react-router";
const UserRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  // console.log(user);
  return user ? (
    user.role == "User" ? (
      <Outlet />
    ) : (
      <Navigate to="/admin/dashboard" />
    )
  ) : (
    <Navigate to="/login" />
  );
};

export default UserRoute;
