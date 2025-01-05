import { Navigate, Outlet } from "react-router";
const ProtectedRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  // console.log(user);
  return user ? (
    user.role == "Admin" ? (
      <Outlet />
    ) : (
      <Navigate to="/home" />
    )
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
