import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoutes";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./components/Dashboard";
import Users from "./pages/users";
import BusPage from "./pages/Buses";
import UpdateBus from "./components/Buses/updateBus";
import CreateBus from "./components/Buses/CreateBus";
import RoutePage from "./pages/routes";
import TripPage from "./pages/TripPage";
import Booking from "./pages/Booking";
import NotFound from "./pages/404";
import { ToastContainer } from "react-toastify";
import { Routes, Route, BrowserRouter } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Trip from "./components/Trip";
import Home from "./pages/Home";

export default function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/trip" element={<Trip />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="" element={<ProtectedRoute />}>
              <Route index path="dashboard" element={<Dashboard />} />
              <Route path="user" element={<Users />} />
              <Route path="bus" element={<BusPage />} />
              <Route path="/admin/bus/:id" element={<UpdateBus />} />
              <Route path="/admin/bus/create" element={<CreateBus />} />
              <Route path="route" element={<RoutePage />} />
              <Route path="trip" element={<TripPage />} />
              <Route path="booking" element={<Booking />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
