import { Outlet } from "react-router";
import UserNavbar from "../components/UserNavbar";

export default function MainLayout() {
  return (
    <>
      <UserNavbar />
      <Outlet />
    </>
  );
}
