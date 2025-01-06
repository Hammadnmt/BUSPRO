import React from "react";
import { useNavigate } from "react-router";
import { useLogoutUserMutation } from "../features/auth/authSlice";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router"; // Import Link from react-router
import { Bus } from "lucide-react"; // Bus icon from lucide-react

function Navigation() {
  const navigate = useNavigate();
  const [logoutUser, { isSuccess }] = useLogoutUserMutation();
  const [expanded, setExpanded] = React.useState(false);

  async function logoutButton() {
    try {
      await logoutUser();
    } catch (error) {
      console.log(error);
    }
  }

  React.useEffect(() => {
    if (isSuccess) {
      navigate("/login");
    }
  }, [isSuccess, navigate]);

  return (
    <Navbar
      expand="md"
      className="bg-white shadow-sm sticky-top"
      expanded={expanded}
      onToggle={() => setExpanded(!expanded)}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <Bus size={32} style={{ color: "#364F6B" }} className="me-2" />
          <span
            style={{
              color: "#364F6B",
              fontWeight: "bold",
              fontSize: "1.25rem",
            }}
          >
            BusPro
          </span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link
              as={Link}
              to="/admin/dashboard"
              style={{ color: "#364F6B" }}
              className="me-3"
            >
              Dashboard
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/admin/user"
              style={{ color: "#364F6B" }}
              className="me-3"
            >
              Users
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/admin/bus"
              style={{ color: "#364F6B" }}
              className="me-3"
            >
              Buses
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/admin/route"
              style={{ color: "#364F6B" }}
              className="me-3"
            >
              Routes
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/admin/trip"
              style={{ color: "#364F6B" }}
              className="me-3"
            >
              Trips
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/admin/booking"
              style={{ color: "#364F6B" }}
              className="me-3"
            >
              Bookings
            </Nav.Link>
            <Button variant="outline-primary" onClick={logoutButton}>
              Logout
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
