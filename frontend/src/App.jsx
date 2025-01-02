import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AdminLayout from "./components/AdminLayout";
import CreateBus from "./components/Buses/CreateBus";
import UpdateBus from "./components/Buses/updateBus";
import ContactForm from "./components/ContactForm";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import ProtectedRoute from "./components/ProtectedRoutes";
import CreateRoute from "./components/Routes/CreateRoute";
import UpdateRoute from "./components/Routes/updateRoute";
import Signup from "./components/Signup";

import CreateTrip from "./components/Trip/CreateTrip";
import UpdateTrip from "./components/Trip/UpdateTrip";
import NotFound from "./pages/404";
import Booking from "./pages/Booking";
import BusPage from "./pages/Buses";
import Home from "./pages/Home";

import RoutePage from "./pages/routes";
import TripPage from "./pages/TripPage";
import Users from "./pages/users";
import BookingReview from "./components/TripReview";    

export default function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route index path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/review" element={<BookingReview />} />
          <Route path="/book" element={<ContactForm />} />
          <Route path="" element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
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
