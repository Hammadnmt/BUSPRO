import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { lazy, Suspense } from "react";
import ControlledTabsExample from "./components/UserInformation";
import UserRoute from "./components/UserRoutes";

// Lazy-loaded components
const AdminLayout = lazy(() => import("./components/AdminLayout"));
const CreateBus = lazy(() => import("./components/Buses/CreateBus"));
const UpdateBus = lazy(() => import("./components/Buses/UpdateBus"));
const ContactForm = lazy(() => import("./components/ContactForm"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const Login = lazy(() => import("./components/Login"));
const ProtectedRoute = lazy(() => import("./components/ProtectedRoutes"));
const CreateRoute = lazy(() => import("./components/Routes/CreateRoute"));
const UpdateRoute = lazy(() => import("./components/Routes/UpdateRoute"));
const Signup = lazy(() => import("./components/Signup"));
const CreateTrip = lazy(() => import("./components/Trip/CreateTrip"));
const UpdateTrip = lazy(() => import("./components/Trip/UpdateTrip"));
const NotFound = lazy(() => import("./pages/404"));
const Booking = lazy(() => import("./pages/Booking"));
const BusPage = lazy(() => import("./pages/Buses"));
const Home = lazy(() => import("./pages/Home"));
const BookingReview = lazy(() => import("./components/TripReview"));
const RoutePage = lazy(() => import("./pages/Routes"));
const TripPage = lazy(() => import("./pages/TripPage"));
const Users = lazy(() => import("./pages/Users"));
const BookingConfirm = lazy(() => import("./components/BookingConfirm"));
const MainLayout = lazy(() => import("./components/MainLayout"));
const FallbackScreen = lazy(() => import("./components/FallbackScreen"));

export default function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Suspense fallback={<FallbackScreen />}>
          <Routes>
            <Route element={<UserRoute />}>
              <Route path="" element={<MainLayout />}>
                <Route path="/profile" element={<ControlledTabsExample />} />
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/review" element={<BookingReview />} />
                <Route path="/book" element={<ContactForm />} />
                <Route path="/confirm" element={<BookingConfirm />} />
              </Route>
            </Route>

            {/* Protected Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index path="dashboard" element={<Dashboard />} />
                <Route path="user" element={<Users />} />
                <Route path="bus" element={<BusPage />} />
                <Route path="bus/create" element={<CreateBus />} />
                <Route path="bus/:id" element={<UpdateBus />} />
                <Route path="route" element={<RoutePage />} />
                <Route path="route/create" element={<CreateRoute />} />
                <Route path="route/:id" element={<UpdateRoute />} />
                <Route path="trip" element={<TripPage />} />
                <Route path="trip/create" element={<CreateTrip />} />
                <Route path="trip/:id" element={<UpdateTrip />} />
                <Route path="booking" element={<Booking />} />
              </Route>
            </Route>

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}
