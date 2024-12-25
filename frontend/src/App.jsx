import ProtectedRoute from "./components/ProtectedRoutes";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./components/Dashboard";
import Booking from "./pages/Booking";
import Users from "./pages/users";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NotFound from "./pages/404";
import { ToastContainer } from "react-toastify";
import { Routes, Route, BrowserRouter } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import TravelSearchForm from "./components/SearchForm";

export default function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="" element={<ProtectedRoute />}>
              <Route index path="dashboard" element={<Dashboard />} />
              <Route path="create" element={<TravelSearchForm />} />
              <Route path="user" element={<Users />} />
              <Route path="booking" element={<Booking />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter >
    </>
  );
}
