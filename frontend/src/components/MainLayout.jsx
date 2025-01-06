import { Outlet } from "react-router";
import UserNavbar from "../components/UserNavbar";
import Footer from "./Footer";

export default function MainLayout() {
  return (
    <>
      <UserNavbar />
      <Outlet />
      <Footer />
    </>
  );
}
