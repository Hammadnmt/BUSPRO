// /* eslint-disable no-unused-vars */
import { useNavigate } from "react-router";
import { useLogoutUserMutation } from "../features/auth/authSlice";
import { Button } from "react-bootstrap";

import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

function Navigation() {
  const navigate = useNavigate();
  const [logoutUser] = useLogoutUserMutation();
  async function logoutButton() {
    try {
      await logoutUser();
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="">
      <Navbar bg="dark" data-bs-theme="dark" className="">
        <Nav >
          <Nav.Link href="/admin/dashboard" className="text-decoration-none">
            Dashboard
          </Nav.Link>
          <Nav.Link href="/admin/user">Users</Nav.Link>
          <Nav.Link href="/admin/booking">Bookings</Nav.Link>
        </Nav>

        <Button
          className="ms-auto me-3"
          variant="secondary"
          onClick={logoutButton}
        >
          Logout
        </Button>
      </Navbar>
    </div>
  );
}

export default Navigation;
