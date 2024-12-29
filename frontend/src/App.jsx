import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoutes";
import AdminLayout from "./components/AdminLayout";
import Dashboard from "./components/Dashboard";
import Users from "./pages/users";
import BusPage from "./pages/Buses";
import CreateBus from "./components/Buses/CreateBus";
import UpdateBus from "./components/Buses/updateBus";
import RoutePage from "./pages/routes";
import CreateRoute from "./components/Routes/CreateRoute";
import UpdateRoute from "./components/Routes/updateRoute";
import TripPage from "./pages/TripPage";
import CreateTrip from "./components/Trip/CreateTrip";
import UpdateTrip from "./components/Trip/UpdateTrip";
import Booking from "./pages/Booking";
import NotFound from "./pages/404";
import { ToastContainer } from "react-toastify";
import { Routes, Route, BrowserRouter } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Trip from "./components/Trip";
import Home from "./pages/Home";
import "./App.css";

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
              <Route path="/admin/bus/create" element={<CreateBus />} />
              <Route path="/admin/bus/:id" element={<UpdateBus />} />
              <Route path="route" element={<RoutePage />} />
              <Route path="/admin/route/create" element={<CreateRoute />} />
              <Route path="/admin/route/:id" element={<UpdateRoute />} />
              <Route path="trip" element={<TripPage />} />
              <Route path="/admin/trip/create" element={<CreateTrip />} />
              <Route path="/admin/trip/:id" element={<UpdateTrip />} />
              <Route path="booking" element={<Booking />} />
            </Route>
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes> 
      </BrowserRouter>
    </>
  );
}
