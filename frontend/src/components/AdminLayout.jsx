import { Outlet } from "react-router";
import Navigation from "./Navbar";
export default function AdminLayout() {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}
