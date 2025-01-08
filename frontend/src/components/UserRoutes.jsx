import { Navigate, Outlet } from "react-router-dom";

const UserRoute = () => {
  // const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); // Retrieve user from localStorage

  if (!user) return <Navigate to="/" />;
  if (user.role === "Admin") return <Navigate to="/admin/dashboard" />;
  if (user.role === "User") return <Outlet />;

  // Default fallback (if role doesn't match)
  return <Navigate to="/" />;
};

export default UserRoute;
